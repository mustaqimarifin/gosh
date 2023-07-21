import db from "./connect";
import JSONB from "json-buffer";

export const fetch = async <T>(key: string, data: () => T, expires: number) => {
  const existing = await db.get(key);
  if (existing !== null) return existing;
  return set(key, data, expires);
};

export const get = async <T>(key: string): Promise<T> => {
  const data: string = await db.get(key);
  if (data === null) return null;
  return JSONB.parse(data);
};

export const set = async <T>(
  key: string,
  data: () => T,
  expires?: number,
): Promise<T> => {
  const value = await data();
  await db.set(key, JSONB.stringify(data), "EX", expires);
  return value;
};

export const del = async (key: string) => {
  await db.del(key);
};
