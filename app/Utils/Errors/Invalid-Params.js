class InvalidParams extends Error {
  constructor(message) {
    super(`Invalid params: ${message}`);
    this.name = "InvalidParams";
  }
}

module.exports = InvalidParams;
