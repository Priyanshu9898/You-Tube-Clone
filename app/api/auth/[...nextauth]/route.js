import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/PrismaDB.js";
import bcrypt from "bcrypt";

export const authOptions = {

    providers: [

        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),

        // ...add more providers here
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "Enter Your Name" },
                email: { label: "Email", type: "text", placeholder: "Enter Your Email" },
                password: { label: "Password", type: "Enter Your Password" },
            },
            async authorize(credentials, req) {
                if(!credentials.email || !credentials.password){
                    throw new Error("Missing Fields");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });


                if(!user || !user?.hashedPassword){
                    throw new Error("User not found");
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
                

                if(!passwordMatch){
                    throw new Error("Password does not match");
                }


                return user;

            }
        }),

    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    bebug: process.env.NODE_ENV
}


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};