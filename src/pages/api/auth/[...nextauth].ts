/* eslint @typescript-eslint/no-unused-vars: 0 */
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import Pool from 'pg-pool';
import { cooperatorLogin } from '@/api/auth';
import PostgresAdapter from '@/libs/postgresAdapter';
import { jwtEncode } from '@/utils/jwtUtils';

const pool = new Pool({
  host: process.env['DB_HOST'],
  database: process.env['DB_NAME'],
  user: process.env['DB_USER'],
  password: process.env['DB_PASSWORD'],
  port: 5432,
});

export const sessionExpires = 30 * 24 * 60 * 60; // 30 days

const findUserByEmail = async (email: string, user_type: number) => {
  // console.log("findUserByEmail");
  let sql = '';
  let queryValue = [];
  if (user_type == 0 || user_type == 1) {
    sql = `select * from users where email = $1 and user_type IN ($2, $3) and employee_id IS NOT NULL and active = $4`;
    queryValue = [email, 0, 1, true];
  } else if (user_type == 2) {
    sql = `select * from users where email = $1 and user_type = $2 and cooperator_id IS NOT NULL and active = $3`;
    queryValue = [email, 2, true];
  } else {
    sql = `select * from users where email = $1 and active = $2`;
    queryValue = [email, true];
  }
  try {
    const result = await pool.query(sql, queryValue);
    if (result && result.rows && result.rows[0]) {
      return result.rows[0];
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

const isExistedUserByEmail = async (email: string, user_type: number) => {
  // console.log("isExistedUserByEmail");
  return await findUserByEmail(email, user_type);
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: 'credentials',
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        login_id: { label: 'ID', type: 'text', placeholder: 'ID' },
        password: { label: 'パスワード', type: 'password' },
        login_type: { label: 'ログインタイプ', type: 'text' },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const requestBody = {
          login_id: credentials?.login_id,
          password: credentials?.password,
          login_type: credentials?.login_type,
        };

        let user = null;
        await cooperatorLogin(requestBody)
          .then((res) => {
            user = res.data;
          })
          .catch(() => {
            user = null;
          });

        // Return null if user data could not be retrieved
        return user;
      },
    }),
  ],
  adapter: PostgresAdapter(pool),

  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: sessionExpires, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex")
    // }
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    maxAge: sessionExpires, // 30 days
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/login', // Displays signin buttons
    // signOut: '/login', // Displays form with sign out button
    error: '/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: '/dashboard' // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user }) {
      // console.log("signIn callback")
      const isExistedEmail = await isExistedUserByEmail(
        String(user.email),
        user.user_type,
      );
      if (isExistedEmail) {
        // console.log("existed")
        return true;
      } else {
        // console.log("not existed")
        // Return false to display a default error message
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token, user }) {
      // console.log("session callback")
      if (user) {
        session.accessToken = user.access_token;
        session.refreshToken = user.refresh_token;
        session.expires = user.expires;
        session.user.uuid = user.uuid;
        session.user.userType = user.user_type;
      } else {
        // get user by email

        const userData = await findUserByEmail(String(session.user.email), 99);
        // Send properties to the client, like an access_token and user id from a provider.
        session.user.uuid = userData.uuid;
        session.user.userType = userData.user_type;

        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expires = token.expires;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      // console.log("jwt callback")
      // set accessToken
      if (user) {
        // jwt encoded
        const jwtEncoded = await jwtEncode(String(user.uuid));
        token.accessToken = jwtEncoded;
      }

      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && account.provider == 'google') {
        // token.accessToken = account.access_token
        token.refreshToken = account.refresh_token;
      }

      if (account && account.provider == 'credentials' && user) {
        // token.accessToken = user.access_token
        token.refreshToken = user.refresh_token;
        token.expires = user.expires;
        token.uuid = user.uuid;
        token.userType = user.user_type;
      }

      return token;
    },
    // authorized({ req, token }) {
    //   if(token) return true // If there is a token, the user is authenticated
    // }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  // events: {
  //   signIn: async ({ user, account, profile, isNewUser }) => {
  //     console.log("signin event")
  //   },
  //   signOut: async ({ token, session }) => {
  //     console.log("signout event")
  //   },
  //   createUser: async ({ user }) => {
  //     console.log("create user")
  //   }
  // },

  // Enable debug messages in the console if you are having problems
  debug: false,
});
