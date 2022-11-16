class SplitInstructions {
  constructor(instructions) {
    this.instructions = instructions;
  }

  get() {
    return this.instructions.split("");
  }
}

module.exports = SplitInstructions;
