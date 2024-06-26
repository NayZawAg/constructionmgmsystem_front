/* eslint @typescript-eslint/no-unused-vars: 0 */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    GOOGLE_ID: string
    GOOGLE_SECRET: string
    DATABASE_URL: string
    SECRET: string
  }
}
