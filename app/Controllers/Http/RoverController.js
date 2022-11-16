"use strict";

const Rover = require("../../Services/Rover");
const Validations = require("./Helpers/Validations");
const SplitInstructions = require("./Helpers/SplitInstructions");

const { validateAll } = use("Validator");
const Event = use("Event");

class RoverController {
  constructor() {
    this.validations = new Validations();
    this.splitInstructions = new SplitInstructions();
  }

  async move({ request, response }) {
    const validate = await validateAll(request.all(), {
      coordinates: "required",
      instructions: "required",
    });

    if (validate.fails()) {
      return response.status(400).json({
        message: "Invalid request",
        errors: validate.messages(),
      });
    }

    const { coordinates, instructions: instructionsString } = request.all();

    if (!coordinates.x || !coordinates.y || !coordinates.direction) {
      return response.status(400).send({ error: "Invalid coordinates" });
    }

    if (!instructionsString) {
      return response.status(400).send({ error: "Invalid instructions" });
    }

    if (!this.validations.isValidInstruction(instructionsString)) {
      return response.status(400).send({ error: "Invalid instructions" });
    }

    const instructions = new SplitInstructions(instructionsString).get();

    if (!this.validations.isValidPosition(coordinates)) {
      return response.status(400).send({ error: "Invalid coordinates" });
    }

    const rover = new Rover(coordinates);

    const result = rover.sendCommands(instructions);

    // FIRULINHA QUE TRABALHA COM O NODE EVENT EMIT
    Event.fire("new:rover", result);

    return response.status(200).send({
      result,
      formattedResult: `${result.x} ${result.y} ${result.direction}`,
    });
  }

  registerCommand({ request, response }) {
    const { result } = request.all();

    console.log(result);
  }
}

module.exports = RoverController;