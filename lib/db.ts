import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// declare global {
//   var prisma: PrismaClient | undefined;
// }
//
// const db =
//   global.prisma ||
//   new PrismaClient({
//     log: ["query", "info", "warn", "error"], // Enable logging for all actions
//   });
// if (process.env.NODE_ENV !== "production") global.prisma = db;
//
export default db;
