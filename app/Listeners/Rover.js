"use strict";

const Rover = (exports = module.exports = {});

Rover.registerRoverLog = async ({ result, coordinates, instructions }) => {
  const RoverLogs = use("App/Models/RoverLogs");

  await RoverLogs.create({
    rover_x: coordinates.x,
    rover_y: coordinates.y,
    rover_direction: coordinates.direction,

    rover_commands: instructions,

    rover_final_x: result.x,
    rover_final_y: result.y,
    rover_final_direction: result.direction,
  });

  console.log("Rover Log Registered");
};
