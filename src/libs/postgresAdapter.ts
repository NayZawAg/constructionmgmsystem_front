/* eslint @typescript-eslint/no-unused-vars: 0 */
import dayjs from 'dayjs';
import type { Adapter } from 'next-auth/adapters';
import { Client } from 'pg';

export type AuthUser = {
  name: string;
  email: string;
  image: string;
  userType: number;
};

export type AuthSession = {
  user: AuthUser;
  expires: Date;
  accessToken: string;
};

export default function PostgresAdapter(
  client: import('pg-pool')<Client>,
): Adapter {
  const current = new Date();
  const current_datetime = dayjs();
  return {
    async createUser(user) {
      // console.log("createUser");
      try {
        // const sql = `select * from users where email = $1 and user_type IN ($2, $3) and employee_id IS NOT NULL and active = $4`;
        const sql = `select u.* from users u join employees a on u.employee_id = a.id
        where email = $1 and u.user_type IN ($2, $3) and u.employee_id IS NOT NULL and u.active = $4 and a.service_division NOT IN ($5, $6)`;
        const result = await client.query(sql, [user.email, 0, 1, true, 1, 2]);
        console.log('RESULT', result);

        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }

      // try {
      //   const sql = `
      // 	INSERT INTO users (name, email, email_verified, image, created_at, updated_at)
      // 	VALUES ($1, $2, $3, $4, $5, $6)
      // 	RETURNING id, name, email, email_verified, image, created_at, updated_at`;
      //   const result = await client.query(sql, [user.name, user.email, user.emailVerified, user.image, "2022-12-16", "2022-12-16"]);
      //   return result.rows[0];
      // } catch (err) {
      //   console.log(err);
      //   return;
      // }
    },
    async getUser(id) {
      // console.log("getUser");
      try {
        const sql = `select * from users where id = $1`;
        const result = await client.query(sql, [id]);
        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByEmail(email) {
      // console.log("getUserByEmail");
      try {
        const sql = `select * from users where email = $1 and user_type IN ($2, $3) and employee_id IS NOT NULL and active = $4`;
        const result = await client.query(sql, ['email', 0, 1, true]); // customize
        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      // console.log("getUserByAccount1");
      try {
        const sql = `
          select u.* from users u join employees e on u.employee_id = e.id join accounts a on u.id = a.user_id
          where u.user_type IN ($1, $2) and a.provider = $3 and a.provider_account_id = $4 and e.service_division NOT IN ($5, $6)`;

        const result = await client.query(sql, [
          0,
          1,
          provider,
          providerAccountId,
          1,
          2,
        ]);
        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async updateUser(user) {
      // console.log("updateUser")
      try {
        const sql = `select * from users where email = $1 and user_type IN ($2, $3) and employee_id IS NOT NULL and active = $4`;
        const result = await client.query(sql, [user.email, 0, 1, true]);
        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async linkAccount(account) {
      // console.log("linkAccount");
      if ((account && !account.userId) || account.userId == undefined) return;

      try {
        // return;
        const sql = `
        insert into accounts 
        (
          user_id, 
          provider, 
          type, 
          provider_account_id, 
          access_token,
          expires_at,
					created_at,
					updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8)`;

        const params = [
          account.userId,
          account.provider,
          account.type,
          account.providerAccountId,
          account.access_token,
          // new Date(account.expires_at).getTime(),
          account.expires_at,
          dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
          dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
        ];

        await client.query(sql, params);
        return account;
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      // console.log("createSession");
      if (!userId || userId == undefined)
        return { sessionToken, userId, expires };

      const expires_datetime = dayjs(expires);
      try {
        const sql = `insert into sessions (user_id, expires, session_token, created_at, updated_at) values ($1, $2, $3, $4, $5)`;
        await client.query(sql, [
          userId,
          expires_datetime.format('YYYY-MM-DD HH:mm:ss').toString(),
          sessionToken,
          current_datetime.format('YYYY-MM-DD HH:mm:ss').toString(),
          current_datetime.format('YYYY-MM-DD HH:mm:ss').toString(),
        ]);
      } catch (err) {
        console.log(err);
      }
      return { sessionToken, userId, expires };
    },
    async getSessionAndUser(sessionToken) {
      // console.log("getSessionAndUser");
      let session = null;
      let user = null;
      if (!sessionToken || sessionToken == undefined)
        return {
          session,
          user,
        };

      try {
        const result = await client.query(
          'select * from sessions where session_token = $1',
          [sessionToken],
        );
        if (result && result.rows && result.rows[0]) {
          session = result.rows[0];

          const resultUser = await client.query(
            'select * from users where id = $1',
            [session.user_id],
          );
          if (resultUser && resultUser.rows && resultUser.rows[0]) {
            user = resultUser.rows[0];
          }
        }
      } catch (err) {
        console.log(err);
      }
      return {
        session,
        user,
      };
    },
    async updateSession({ sessionToken }) {
      // console.log("updateSession")
      try {
        const sql = `select * from sessions where session_token = $1`;
        const result = await client.query(sql, [sessionToken]);
        if (result && result.rows && result.rows[0]) {
          return result.rows[0];
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
        return;
      }
    },
    async deleteSession(sessionToken) {
      // console.log("deleteSession");
      try {
        const sql = `delete from sessions where session_token = $1`;
        await client.query(sql, [sessionToken]);
      } catch (err) {
        console.log(err);
        return;
      }
    },
  };
}
