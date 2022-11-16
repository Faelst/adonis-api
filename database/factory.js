"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/User", (faker, i, data = {}) => {
  return Object.assign(
    {
      username: faker.username(),
      email: faker.email(),
      password: "secret",
    },
    data
  );
});

Factory.blueprint("App/Models/RoverLogs", (faker, i, data = {}) => {
  return Object.assign(
    {
      rover_x: 1,
      rover_y: 1,
      rover_direction: "N",
      rover_commands: "ML",
      rover_final_x: 0,
      rover_final_y: 1,
      rover_final_direction: "W",
    },
    data
  );
});
