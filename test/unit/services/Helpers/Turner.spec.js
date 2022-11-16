const InvalidParams = require("../../../../app/Utils/Errors/Invalid-Params");
const Turner = require("../../../../app/Services/Helpers/Turner");

const { test } = use("Test/Suite")("Utils/Turner");

const makeSut = () => {
  const sut = new Turner();

  return {
    sut,
  };
};

test('Should return "W" when turn LEFT and direction is "N"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "N";

  const result = sut.left(direction);
  assert.equal(result, "W");
});

test('Should return "S" when turn LEFT and direction is "W"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "W";

  const result = sut.left(direction);
  assert.equal(result, "S");
});

test('Should return "E" when turn LEFT and direction is "S"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "S";

  const result = sut.left(direction);
  assert.equal(result, "E");
});

test('Should return "N" when turn LEFT and direction is "E"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "E";

  const result = sut.left(direction);
  assert.equal(result, "N");
});

test("Should throw an error when turn LEFT and direction is invalid", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "INVALID_DIRECTION";

  assert.throws(() => sut.left(direction), InvalidParams);
});

test('Should return "E" when turn RIGHT and direction is "N"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "N";

  const result = sut.right(direction);
  assert.equal(result, "E");
});

test('Should return "S" when turn RIGHT and direction is "E"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "E";

  const result = sut.right(direction);
  assert.equal(result, "S");
});

test('Should return "W" when turn RIGHT and direction is "S"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "S";

  const result = sut.right(direction);
  assert.equal(result, "W");
});

test('Should return "N" when turn RIGHT and direction is "W"', async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "W";

  const result = sut.right(direction);
  assert.equal(result, "N");
});

test("Should throw an error when turn RIGHT and direction is invalid", async ({
  assert,
}) => {
  const { sut } = makeSut();
  const direction = "INVALID_DIRECTION";

  assert.throw(() => sut.right(direction), InvalidParams);
});
