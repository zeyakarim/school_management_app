import prisma from "@/config/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user }) {
            const existingUser = await prisma.admin.findUnique({
                where: { email: user.email },
            });

            if (!existingUser) {
                await prisma.admin.create({
                    data: {
                        email: user.email,
                        full_name: user.name,
                        username: user.name.replace(/\s+/g, "").toLowerCase(), // Google users don’t need a username
                        password: null, // Google users don’t have passwords
                    },
                });
            }

            return true;
        },

        async session({ session }) {
            const dbUser = await prisma.admin.findUnique({
                where: { email: session.user.email },
            });

            session.user.id = dbUser?.id;
            return session;
        },
    },
};

// Correct export for Next.js API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
