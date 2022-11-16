class Validations {
  isValidPosition(position) {
    const { x, y } = position;

    if (x < 0 || y < 0) {
      return false;
    }

    return true;
  }

  isInvalidInstruction(instruction) {
    const validInstructions = ["L", "R", "M"];

    return validInstructions.includes(instruction);
  }
}

module.exports = Validations;
