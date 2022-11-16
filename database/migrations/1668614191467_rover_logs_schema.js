"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoverLogsSchema extends Schema {
  up() {
    this.create("rover_logs", (table) => {
      table.increments();

      //Rover Position
      table.integer("rover_x").notNullable();
      table.integer("rover_y").notNullable();
      table.string("rover_direction", 1).notNullable();

      //Rover Commands
      table.string("rover_commands", 255).notNullable();

      //Rover Final Position
      table.integer("rover_final_x").notNullable();
      table.integer("rover_final_y").notNullable();
      table.string("rover_final_direction", 1).notNullable();

      // soft columns
      table.timestamps("created_at", true);
    });
  }

  down() {
    this.drop("rover_logs");
  }
}

module.exports = RoverLogsSchema;
