"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    await Factory.model("App/Models/User").create({
      username: "test",
      email: "user@test.com",
      password: "12345",
    });
  }
}

module.exports = UserSeeder;
