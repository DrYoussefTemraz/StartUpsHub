import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // check the user exist in database or not 
    async signIn(
      { user: { name, email, image },
        profile: { id, login, bio }
      }) {
      const existingUser = await client.withConfig({
        // set the cdn to false to avoid the cashing and undefined id 
        useCdn: false,
      }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });
      if (!existingUser) {
        // create user in database

        await writeClient.create(
          {
            _type: "author",
            id,
            name,
            username: login,
            email,
            image,
            bio,
          }
        )
      }
      return true;
    },
    // create the jwt token
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.withConfig(
          {
            useCdn: false,
          }
        ).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });
        token.id = user?._id;
      }
      return token;
    },
    // set the user in the session - expost the token new id into the sessions used in the pages
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  }
})