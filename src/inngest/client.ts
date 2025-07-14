import {Inngest} from "inngest";

export const inngest = new Inngest({ 
    id: "advisora-v2",
    eventKey: process.env.INNGEST_EVENT_KEY!,
    signingKey: process.env.INNGEST_SIGNING_KEY,
});
console.log("DEBUG ENV:", process.env.INNGEST_ENV);