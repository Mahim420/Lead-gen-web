import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        console.log("1. Credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("2. Email or password missing");
          return null;
        }

        const db = await connectToDatabase();

        const email = credentials.email.trim().toLowerCase();

        const user = await db.collection("userCollections").findOne({
          email: email,
        });

        console.log("3. User from MongoDB:", user);

        if (!user) {
          console.log("4. USER NOT FOUND");
          return null;
        }

        if (user.password !== credentials.password) {
          console.log("5. PASSWORD NOT MATCH");
          return null;
        }

        console.log("6. LOGIN SUCCESS");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
