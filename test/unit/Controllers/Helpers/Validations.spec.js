const Validations = require("../../../../app/Controllers/Http/Helpers/Validations");

const { test } = use("Test/Suite")("Utils/Validations");

const makeSut = () => {
  const sut = new Validations();

  return {
    sut,
  };
};

test("Should return TRUE when position is valid", async ({ assert }) => {
  const { sut } = makeSut();
  const position = { x: 0, y: 0 };

  const result = sut.isValidPosition(position);
  assert.isTrue(result);
});

test("Should return FALSE when position is invalid", async ({ assert }) => {
  const { sut } = makeSut();
  const position = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: -1 },
  ];

  position.forEach((p) => {
    const result = sut.isValidPosition(p);
    assert.isFalse(result);
  });
});

test("Should return FALSE when instructions is invalid", async ({ assert }) => {
  const { sut } = makeSut();
  const instructions = ["A", "B", "C"];

  instructions.forEach((instruction) => {
    const result = sut.isInvalidInstruction(instruction);
    assert.isFalse(result);
  });
});

test("Should return TRUE when instructions is valid", async ({ assert }) => {
  const { sut } = makeSut();
  const instructions = ["L", "R", "M"];

  instructions.forEach((instruction) => {
    const result = sut.isInvalidInstruction(instruction);
    assert.isTrue(result);
  });
});
