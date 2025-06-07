import NextAuth from "next-auth";
// import {MongoDBAdapter} from "@auth/mongodb-adapter"
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import User from "./model/User";
import bcrypt from "bcryptjs";
// import clientPromise from "./lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  // session: {
  //   strategy: "database"
  // },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        await dbConnect();

        try {
          const { email, password } = credentials;

          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            console.log("No user found");
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(
            password as string,
            user.password,
          );
          if (!isPasswordMatch) {
            console.log("Invalid credentials");
            return null;
          }
          
          return {
            id: String(user._id),
            username: user.username,
            email: user.email,
          }
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token._id = user.id
        token.username = user.username
        token.email = user.email
      }
      return token
    },
    async session({session, token, user}) {
      if (token) {
        session.user.id = token._id as string
        session.user.username = token.username as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
});
