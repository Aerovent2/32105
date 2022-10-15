import knex from "knex";
import sqliteConfig from "./sqliteConfig";
const Knex= knex(sqliteConfig)

console.log(Knex)