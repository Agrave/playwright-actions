import { test, expect, Page } from "@playwright/test";
import knex, { Knex } from "knex";

let db: Knex;

test.beforeAll(() => {
  db = knex({
    client: "postgresql",
    connection:
      "postgresql://artem:11111111@localhost:5432/tpadmin?currentSchema=public",
    searchPath: process.env.DB_SCHEMA
      ? [process.env.DB_SCHEMA, "public"]
      : undefined,
  });
});

test.afterAll(() => {
  db.destroy();
});

test("check db connection", async () => {
  const customers = await db("customers").select();
  expect(customers.length).toBe(2);
});

test("Verify env variables", async () => {
  const BASE_USER = process.env.BASE_USER;
  console.log(BASE_USER);
  expect(BASE_USER).toBe("automation-super-admin@truepill.com");
});

test("just another test", () => {
  expect(1).toBe(1);
});
