import {Inngest} from "inngest";

export const inngest = new Inngest({ 
    id: "advisora",
    eventKey: process.env.INNGEST_EVENT_KEY!,
});
console.log("DEBUG ENV:", process.env.INNGEST_ENV);