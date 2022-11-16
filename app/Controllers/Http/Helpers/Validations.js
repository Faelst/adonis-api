class Validations {
  isValidPosition(position) {
    const { x, y } = position;

    if (x < 0 || y < 0) {
      return false;
    }

    return true;
  }

  isValidInstruction(instruction) {
    const validInstructions = ["L", "R", "M"];

    if (validInstructions.includes(instruction)) {
      return false;
    }

    return true;
  }
}

module.exports = Validations;
