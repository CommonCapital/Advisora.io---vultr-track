import {Inngest} from "inngest";

export const inngest = new Inngest({ 
    id: "advisora",
    eventKey: process.env.INNGEST_SIGNING_KEY,
});