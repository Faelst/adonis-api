const Movement = require("./Helpers/Movement");
const Tuner = require("./Helpers/Turner");
const InvalidParams = require("../Utils/Errors/Invalid-Params");

class Rover {
  constructor(inicialPosition) {
    this.x = inicialPosition.x;
    this.y = inicialPosition.y;
    this.direction = inicialPosition.direction;

    this.tuner = new Tuner();
    this.movement = new Movement();
  }

  sendCommands(instructions) {
    instructions.forEach((instruction) => {
      switch (instruction) {
        case "L": {
          this.direction = this.tuner.left(this.direction);
          break;
        }
        case "R": {
          this.direction = this.tuner.right(this.direction);
          break;
        }
        case "M": {
          const { x, y, direction } = this.movement.move(
            { x: this.x, y: this.y },
            this.direction
          );

          this.x = x;
          this.y = y;
          this.direction = direction;

          break;
        }
        default: {
          throw new InvalidParams("Invalid instruction");
        }
      }
    });

    return {
      x: this.x,
      y: this.y,
      direction: this.direction,
    };
  }
}

module.exports = Rover;
