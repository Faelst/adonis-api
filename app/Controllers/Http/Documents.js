"use strict";
const dayjs = require("dayjs");

const RoverLogsModel = use("App/Models/RoverLogs");

class Documents {
  login({ view }) {
    return view.render("login");
  }

  async logs({ view }) {
    const data = await RoverLogsModel.query().fetch();

    const logs = data.toJSON().map((log) => ({
      ...log,
      inicialPosition: `${log.rover_x} ${log.rover_y} ${log.rover_direction}`,
      commands: log.rover_commands,
      finalPosition: `${log.rover_final_x} ${log.rover_final_y} ${log.rover_final_direction}`,
      createDate: dayjs(log.created_at).format("DD/MM/YYYY HH:mm:ss"),
    }));
    console.log(data.toJSON());
    return view.render("logs", { logs: logs });
  }
}

module.exports = Documents;
