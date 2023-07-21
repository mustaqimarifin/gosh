import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL ?? "127.0.0.1:6379");

export default redis;
