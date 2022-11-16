const InvalidParams = require("../../Utils/Errors/Invalid-Params");

class Turner {
  left(direction) {
    switch (direction) {
      case "N":
        return "W";
      case "W":
        return "S";
      case "S":
        return "E";
      case "E":
        return "N";
      default:
        throw new InvalidParams("Invalid direction");
    }
  }

  right(direction) {
    switch (direction) {
      case "N":
        return "E";
      case "E":
        return "S";
      case "S":
        return "W";
      case "W":
        return "N";
      default:
        throw new InvalidParams("Invalid direction");
    }
  }
}

module.exports = Turner;
