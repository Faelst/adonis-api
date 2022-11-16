const SplitInstructions = require("../../../../app/Controllers/Http/Helpers/SplitInstructions");

const { test } = use("Test/Suite")("Utils/SplitInstructions");

const makeSut = () => {
  const sut = new SplitInstructions("LMR");

  return {
    sut,
  };
};

test("Should return ['L', 'M', 'R'] when instructions is 'L M R'", async ({
  assert,
}) => {
  const { sut } = makeSut();

  const result = sut.get();
  assert.deepEqual(result, ["L", "M", "R"]);
});
