"use strict";
const dayjs = require("dayjs");

const RoverLogsModel = use("App/Models/RoverLogs");

class Documents {
  login({ view }) {
    return view.render("login");
  }
}

module.exports = Documents;
