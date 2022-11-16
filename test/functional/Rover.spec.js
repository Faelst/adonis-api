const sinon = require("sinon");
const Validations = require("../../app/Controllers/Http/Helpers/Validations");
const Rover = require("../../app/Services/Rover");

const { test, trait } = use("Test/Suite")("Controller/Rover");
const RoverLogs = use("App/Models/RoverLogs");
const Event = use("Event");
const Factory = use("Factory");

trait("Test/ApiClient");

test("Should return 400 when request body is not valid", async ({ client }) => {
  const invalidBody = {};

  const response = await client
    .post("/rover/send-commands")
    .send(invalidBody)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    message: "Invalid request",
    errors: [
      {
        message: "required validation failed on coordinates",
        field: "coordinates",
        validation: "required",
      },
      {
        message: "required validation failed on instructions",
        field: "instructions",
        validation: "required",
      },
    ],
  });
});

test("Should return 400 when request body are not valid", async ({
  client,
}) => {
  const invalidBodies = [
    {
      coordinates: {
        x: 1,
        y: 1,
      },
      instructions: "ANY_INSTRUCTIONS",
    },
    {
      coordinates: {
        x: 1,
        coordinates: "N",
      },
      instructions: "ANY_INSTRUCTIONS",
    },
    {
      coordinates: {
        y: 1,
        coordinates: "N",
      },
      instructions: "ANY_INSTRUCTIONS",
    },
  ];

  for (const invalidBody of invalidBodies) {
    const response = await client
      .post("/rover/send-commands")
      .send(invalidBody)
      .end();

    response.assertStatus(400);
    response.assertJSONSubset({
      error: "Invalid coordinates",
    });
  }
});

test("Should return 400 when isValidInstruction is true", async ({
  client,
}) => {
  sinon.stub(Validations.prototype, "isInvalidInstruction").returns(true);

  const invalidBody = {
    coordinates: {
      x: 1,
      y: 1,
      direction: "N",
    },
    instructions: "INVALID_INSTRUCTIONS",
  };

  const response = await client
    .post("/rover/send-commands")
    .send(invalidBody)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: "Invalid instructions",
  });

  Validations.prototype.isInvalidInstruction.restore();
});

test("Should return 400 when isValidPosition is false", async ({ client }) => {
  sinon.stub(Validations.prototype, "isInvalidInstruction").returns(false);
  sinon.stub(Validations.prototype, "isValidPosition").returns(false);

  const invalidBody = {
    coordinates: {
      x: 1,
      y: 1,
      direction: "N",
    },
    instructions: "ML",
  };

  const response = await client
    .post("/rover/send-commands")
    .send(invalidBody)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset({
    error: "Invalid Position",
  });

  Validations.prototype.isValidPosition.restore();
  Validations.prototype.isInvalidInstruction.restore();
});

test("Should return 200 and EMIT EVENT when request body is valid", async ({
  client,
}) => {
  sinon.stub(Validations.prototype, "isInvalidInstruction").returns(false);
  sinon.stub(Validations.prototype, "isValidPosition").returns(true);
  sinon.stub(Rover.prototype, "sendCommands").returns({
    x: "VALID_X",
    y: "VALID_Y",
    direction: "VALID_DIRECTION",
  });
  const eventMock = sinon.stub(Event, "fire");

  const validBody = {
    coordinates: {
      x: "VALID_X",
      y: "VALID_Y",
      direction: "VALID_DIRECTION",
    },
    instructions: "VALID_INSTRUCTIONS",
  };

  const response = await client
    .post("/rover/send-commands")
    .send(validBody)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    result: {
      x: "VALID_X",
      y: "VALID_Y",
      direction: "VALID_DIRECTION",
    },
    formattedResult: "VALID_X VALID_Y VALID_DIRECTION",
  });

  sinon.assert.calledOnce(eventMock);

  Validations.prototype.isValidPosition.restore();
  Validations.prototype.isInvalidInstruction.restore();
  Rover.prototype.sendCommands.restore();
  Event.fire.restore();
});
