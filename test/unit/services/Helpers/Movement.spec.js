const Movement = require("../../../../app/services/Helpers/Movement");
const InvalidParams = require("../../../../app/Utils/Errors/Invalid-Params");

const { test } = use("Test/Suite")("Utils/Movement");

const makeSut = () => {
  const sut = new Movement();

  return {
    sut,
  };
};

test("Should return { x: 0, y: 1, direction: 'N' } when move and direction is 'N'", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };
  const direction = "N";

  const result = sut.move(position, direction);
  assert.deepEqual(result, { x: 0, y: 1, direction: "N" });
});

test("Should return { x: 0, y: -1, direction: 'S' } when move and direction is 'S'", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };
  const direction = "S";

  const result = sut.move(position, direction);
  assert.deepEqual(result, { x: 0, y: -1, direction: "S" });
});

test("Should return { x: 1, y: 0, direction: 'E' } when move and direction is 'E'", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };
  const direction = "E";

  const result = sut.move(position, direction);
  assert.deepEqual(result, { x: 1, y: 0, direction: "E" });
});

test("Should return { x: -1, y: 0, direction: 'W' } when move and direction is 'W'", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };
  const direction = "W";

  const result = sut.move(position, direction);
  assert.deepEqual(result, { x: -1, y: 0, direction: "W" });
});

test("Should throw an error when move and direction is invalid", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };
  const direction = "INVALID_DIRECTION";

  assert.throws(() => sut.move(position, direction), InvalidParams);
});
