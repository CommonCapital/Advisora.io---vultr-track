import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polar, checkout, portal,  } from "@polar-sh/better-auth";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
import { polarClient } from "./polar";


export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    authenticatedUsersOnly: true,
                    successUrl: "/upgrade",

                }),
                portal(),
            ]
        }),
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,

        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    emailAndPassword: {
        enabled: true,
    },
     database: drizzleAdapter(db, {
        
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            ...schema,
        },
    }),
});