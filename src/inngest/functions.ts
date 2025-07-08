import { db } from "@/db";
import { agents, meetings, user } from "@/db/schema";
import {inngest} from "@/inngest/client";
import { StreamTranscriptItem } from "@/modules/meetings/types";
import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";
import {createAgent, openai, TextMessage} from "@inngest/agent-kit";

const dataReport = createAgent({
    name: "Data Report",
    system: `You are a professional McKinsey-style consultant generating a post-call data report for a client.

Use the following template and populate it as fully as possible using the transcript and input below.

If a section lacks information, you may omit or leave it blank.

Return in clean markdown:

🧾 Advisora™ AI-Generated Consulting Report
Client: ${user.name}
Meeting ID: ${meetings.id}
Date: ${meetings.endedAt}
Prepared by: Advisora Agent ${agents.name}

🔍 1. Executive Summary
Objective:
[What was the client's problem or objective?]
Key Recommendations:
• [Top 3 actionable strategies]
Meeting Outcome:
[What was decided or aligned during the meeting?]

🧠 2. Core Inquiry Recap
Main Questions Asked:
• [...]
• [...]
• [...]

💹 3. SWOT Analysis
Strengths | Weaknesses
[2 bullets] | [2 bullets]
Opportunities | Threats
[2 bullets] | [2 bullets]

📈 4. Strategic Recommendations
• Strategy:
• Operations:
• Talent:

🛣️ 5. 30-60-90 Day Roadmap
Timeframe | Action | Responsibility
30 Days | [...] | [...]
60 Days | [...] | [...]
90 Days | [...] | [...]

📊 6. Industry Benchmarks
Metric | Client | Industry Avg
[...] | [...] | [...]

📼 7. Meeting Highlights
00:05 – [...]
00:17 – [...]
00:49 – [...]

🗂️ 8. Attachments (use dummy file names if needed)
• MENA Strategy Deck.pdf
• Cost Breakdown.xlsx

📬 9. Feedback & Next Meeting
Feedback: [Short feedback prompt]
Next Meeting: [Proposed date/time]`.trim(), 
model: openai({ model: "gpt-3.5-turbo", apiKey:process.env.OPEN_AI_API_KEY}),
});


export const meetingsProcessing = inngest.createFunction(
    {id: "meetings/processing"},
    {event: "meetings/processing"},
    async ({event, step}) => {
        console.log("Processing meeting:", event.data.meetingId)
        const response = await step.run("fetch-transcript", async() => {
            return fetch(event.data.transcriptUrl).then((res) => res.text())
        });
        const transcript = await step.run("parse-transcript", async() => {
            return JSONL.parse<StreamTranscriptItem>(response);
        });


        const transcriptWithSpeakers = await step.run("add-speakers", async() => {
            const speakerIds = [
                ...new Set(transcript.map((item) => item.speaker_id))
            ];


            const userSpeakers = await db.select().from(user).where(inArray(user.id, speakerIds)).then((users) => users.map((user) => ({
                ...user,
            }))
            
        );


        const agentSpeakers = await db.select().from(agents).where(inArray(agents.id, speakerIds)).then((agents) => 
        agents.map((agent) => ({
            ...agent,
        })));

        const speakers = [...userSpeakers, ...agentSpeakers];

        return transcript.map((item) => {
            const speaker = speakers.find(
                (speaker) => speaker.id === item.speaker_id
            );

            if (!speaker) {
                return {
                    ...item,
                    user: {
                        name: "Unknown",
                    },
                };
            }

            return {
                ...item,
                user: {
                    name: speaker.name,
                }
            }

        })
    
    });


    const {output} = await dataReport.run(
        
        "Generate the data report for the following transcript:" + JSON.stringify(transcriptWithSpeakers)
    );

    await step.run("save-summary", async () => {
        await db.update(meetings).set({
             summary: (output[0] as TextMessage).content as string,
             status: "completed"
        }).where(eq(meetings.id, event.data.meetingId))
    })

    }

)