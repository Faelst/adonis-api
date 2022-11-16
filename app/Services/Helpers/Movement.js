const InvalidParams = require("../../Utils/Errors/Invalid-Params");

class Movement {
  move({ x, y }, direction) {
    switch (direction) {
      case "N":
        y++;
        break;
      case "S":
        y--;
        break;
      case "E":
        x++;
        break;
      case "W":
        x--;
        break;
      default:
        throw new InvalidParams("Invalid direction");
    }

    return { x, y, direction };
  }
}

module.exports = Movement;
