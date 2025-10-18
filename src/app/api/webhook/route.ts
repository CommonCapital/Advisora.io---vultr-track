import {
    MessageNewEvent,
    CallEndedEvent,
    CallRecordingReadyEvent,
    CallSessionParticipantLeftEvent,
    CallSessionStartedEvent,
    CallTranscriptionReadyEvent
} from "@stream-io/node-sdk";
import { GeneratdAvatarUri } from "@/lib/avatar";
import {and, eq, not} from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import {streamVideo} from "@/lib/stream-video";
import { inngest } from "@/inngest/client";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { streamChat } from "@/lib/stream-chat";



const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY!
});


function verifySignatureWithSDK(body: string, signature: string): boolean{
    return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
    console.log("Webhook received");
    const signature = req.headers.get("x-signature");
    const apiKEY = req.headers.get("x-api-key");

    if (!signature || !apiKEY) {
        return NextResponse.json(
            { error: "Missing signature or API Key"},
            {status: 400}
        );
    } 


    const body = await req.text();

    if (!verifySignatureWithSDK(body, signature)) {
        return NextResponse.json({error: "Invalid signature"}, {status: 401});
    }


    let payload: unknown;
    try {
        payload = JSON.parse(body) as Record<string, unknown>
;
    } catch (error) {
        return NextResponse.json({error: "Invalid payload"}, {status: 400})
    };

    const eventType = (payload as Record<string, unknown>)?.type;

    if (eventType === "call.session_started") {
const event = payload as CallSessionStartedEvent;
const meetingId = event.call.custom?.meetingId;

if (!meetingId) {
    return NextResponse.json({error: "Missing meetingId"}, {status: 400});
}


const [existingMeeting] = await db.select().from(meetings).where(and(eq(meetings.id, meetingId), not(eq(meetings.status, "completed")), not(eq(meetings.status, "active")), not(eq(meetings.status, "cancelled")), not(eq(meetings.status, "processing")),
 ));
    if (!existingMeeting) {
        return NextResponse.json({error: "Meeting not found"}, {status: 404});

        
    }
    await db.update(meetings).set({status: "active", startedAt: new Date()}).where(eq(meetings.id, existingMeeting.id));
   

    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
        return NextResponse.json({error: "Agent not found"}, {status: 404})
    };

    const call = streamVideo.video.call("default", meetingId);
    {/**Adding new features */}
   
    console.log(" Connecting OpenAI...")
    const openaiTestClient = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY!
});

try {
  const models = await openaiTestClient.models.list();
  console.log("✅ OpenAI Key is VALID. Available models:");
  console.log(models.data.map(m => m.id));
} catch (err) {
  console.error("❌ Invalid OpenAI API key or access denied:");
  console.error(err);
}


const instructions =
  typeof existingAgent.instructions === "string"
    ? existingAgent.instructions
    : "You are a rational and critical Venture Capitalist analyst. You should review the pitch and coldy, mathematically evaluate the startup.";

   

    
     const realtimeClient = await streamVideo.video.connectOpenAi({
        call,
        model: "gpt-4o-realtime-preview",
        openAiApiKey: process.env.OPEN_AI_API_KEY!,
        agentUserId: existingAgent.id,
    });  
    

    



    try {
        await realtimeClient.updateSession({
        instructions: instructions,
    
    });
console.log("🧠 Injecting Instructions:");
const channel = streamChat.channel("messaging", meetingId);
  await channel.watch();
console.log(existingAgent.instructions);
 await channel.sendMessage({
    text: `🧠 [System Instructions]\n${instructions}`,
    user: {
      id: existingAgent.id,
      name: existingAgent.name,
    }
});
 await call.startTranscription();
    await call.startRecording();
    await call.listTranscriptions();
} catch (error) {
        console.error("Failed to inject instructions:", error);

        const channel = streamChat.channel("messaging", meetingId);
  await channel.watch();

  await channel.sendMessage({
    text: `🧠 [System Instructions]\n${instructions}`,
    user: {
      id: existingAgent.id,
      name: existingAgent.name,
    }
  });
  console.log("✅ Sent instructions as a message fallback.");
    }
    
    
    
console.log("✅ connectOpenAi() completed.");

} else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];


    if (!meetingId) {
        return NextResponse.json({error: "Missing meetingID"}, {status: 400});
    }

    const call = streamVideo.video.call("default", meetingId);
    await call.end();
} else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
        return NextResponse.json({error: "Missing meetingId"}, {status: 400});


    }

console.log("🔐 ENV DEBUG:", {
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
});
    await db.update(meetings).set({status: "processing", endedAt: new Date()}).where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
    console.log("Meeting status updated to processing");
} else if (eventType === "call.transcription_ready") {
    console.log("Transcription is ready");
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

   

    const [updatedMeeting] = await db.update(meetings).set({transcriptUrl: event.call_transcription.url}).where(eq(meetings.id, meetingId)).returning();
     console.log("Transcript is passed")
      if (!updatedMeeting) {
        console.error("No Transcript")
        return NextResponse.json({error: "Meeting not found"}, {status: 404});
        
      }
     console.log("🔁 Sending to Inngest:", {
  event: "meetings/processing",
  meetingId: updatedMeeting.id,
  transcriptUrl: updatedMeeting.transcriptUrl,
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY
});
try {
    
  
      await inngest.send({
        name: "meetings/processing",
       data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl
       },
       
       
      },
    ); 
      console.log(" Inngest function trigerred successfully with INNGEST_SIGNING_KEY and INNGEST_EVENT_KEY:", process.env.INNGEST_SIGNING_KEY, process.env.INNGEST_EVENT_KEY  );
} catch (error) {
    console.error("Failed to trigger Inngest function with INNGEST_SIGNING_KEY and INNGEST_EVENT_KEY: ", process.env.INNGEST_SIGNING_KEY, process.env.INNGEST_EVENT_KEY)
}
    

} else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db.update(meetings).set({recordingUrl: event.call_recording.url}).where(eq(meetings.id, meetingId))
} else if (eventType === "message.new") {
    const event = payload as MessageNewEvent;

    const userId = event.user?.id;
    const channelId = event.channel_id;
    const text = event.message?.text;

    if (!userId || !channelId || !text) {
        return NextResponse.json(
            {error: "Missing userId, channelId or text"},
            {status: 400}
        );
    }

    const [existingMeeting] = await db.select().from(meetings).where(and(eq(meetings.id, channelId), eq(meetings.status, "completed")));

    if (!existingMeeting) {
        return NextResponse.json({error: "Meeting not found"}, {status: 404})
    }


    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
        return NextResponse.json({error: "Agent not found"}, {status:404});
    }

    if (userId !== existingAgent.id) {
        const instructions = `
        You are an AI assistant that helps the user to revisit a recently completed meeting.
        Below is a data report of the meeting. Use it to answer his/her questions:
        ${existingMeeting.summary}

        The following data are your uploaded trained data:
        ${existingAgent.instructions}

        The client may ask questions about the meeting, request clarifications, or ask for follow-up actions.
      Always base your responses on the meeting summary above.
      
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.
      
      Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.

        `

        const channel = streamChat.channel("messaging", channelId);
        await channel.watch()


        const previousMessages = channel.state.messages.slice(-5).filter((msg) => msg.text && msg.text.trim() !== "").map<ChatCompletionMessageParam>((message) => ({
            role: message.user?.id === existingAgent.id ? "assistant" : "user",
            content: message.text || "",
        }));
        try {
   const chatCompletion = await openai.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages: [
            { role: "system", content: instructions, ...previousMessages },
            { role: "user", content: text },
        ],
       
        temperature: 1,
        top_p: 1,
        stream: true,
    });
   let fullResponse = "";

    for await (const chunk of chatCompletion) {
        const token = chunk.choices?.[0]?.delta?.content || "";
        fullResponse += token;
    }

    const avatarUrl = GeneratdAvatarUri({
        seed: existingAgent.name,
        variant: "initials",
    });

    await streamChat.upsertUser({
        id: existingAgent.id,
        name: existingAgent.name,
        image: avatarUrl,
    });

    await channel.sendMessage({
        text: fullResponse,
        user: {
            id: existingAgent.id,
            name: existingAgent.name,
            image: avatarUrl,
        }
    });

    return NextResponse.json({ status: "Success" });

} catch (error) {
    console.error("Groq Streaming Error:", error);
    return NextResponse.json({ error: "Error from GROQ" }, { status: 500 });
}
        
        
    }
}
   

    return NextResponse.json({status: "Success"})
}