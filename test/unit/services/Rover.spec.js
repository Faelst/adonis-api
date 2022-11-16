const Rover = require("../../../app/services/Rover");
const Movement = require("../../../app/services/Helpers/Movement");
const Tuner = require("../../../app/services/Helpers/Turner");

const sinon = require("sinon");

const { test } = use("Test/Suite")("Services/Rover");

makeSut = () => {
  const validCoordinates = {
    x: 0,
    y: 0,
    direction: "N",
  };

  const sut = new Rover(validCoordinates);

  return {
    sut,
  };
};

test("Should return same inicial position when sendCommands and instructions is empty", async ({
  assert,
}) => {
  const { sut } = makeSut();

  const result = sut.sendCommands([]);

  assert.deepEqual(result, { x: 0, y: 0, direction: "N" });
});

test("Should throw an error when sendCommands and instructions is invalid", async ({
  assert,
}) => {
  const { sut } = makeSut();

  const instructions = ["A"];

  assert.throws(() => sut.sendCommands(instructions), "Invalid instruction");
});

test("Should return 'E' when sendCommands and instructions is 'R'", async ({
  assert,
}) => {
  sinon.stub(Tuner.prototype, "right").returns("E");

  const { sut } = makeSut();

  const instructions = ["R"];

  const result = sut.sendCommands(instructions);

  assert.deepEqual(result, { x: 0, y: 0, direction: "E" });

  Tuner.prototype.right.restore();
});

test("Should return 'W' when sendCommands and instructions is 'L'", async ({
  assert,
}) => {
  sinon.stub(Tuner.prototype, "left").returns("W");

  const { sut } = makeSut();

  const instructions = ["L"];

  const result = sut.sendCommands(instructions);

  assert.deepEqual(result, { x: 0, y: 0, direction: "W" });

  Tuner.prototype.left.restore();
});

test("Should return '1 0 N' when sendCommands and instructions is 'M'", async ({
  assert,
}) => {
  sinon
    .stub(Movement.prototype, "move")
    .returns({ x: 1, y: 0, direction: "N" });

  const { sut } = makeSut();

  const instructions = ["M"];

  const result = sut.sendCommands(instructions);

  assert.deepEqual(result, { x: 1, y: 0, direction: "N" });

  Movement.prototype.move.restore();
});

test("Should return '1 1 N' when sendCommands and instructions is 'M'", async ({
  assert,
}) => {
  sinon
    .stub(Movement.prototype, "move")
    .returns({ x: 1, y: 1, direction: "N" });

  const { sut } = makeSut();

  const instructions = ["M"];

  const result = sut.sendCommands(instructions);

  assert.deepEqual(result, { x: 1, y: 1, direction: "N" });

  Movement.prototype.move.restore();
});
