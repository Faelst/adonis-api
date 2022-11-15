"use strict";

const ace = require("@adonisjs/ace");

module.exports = (cli, runner) => {
  runner.before(async () => {
    use("Adonis/Src/Server").listen(process.env.HOST, process.env.PORT);

    /*
    |--------------------------------------------------------------------------
    | Run migrations
    |--------------------------------------------------------------------------
    |
    | Migrate the database before starting the tests.
    |
    */
    await ace.call("migration:run", {}, { silent: true });
  });

  runner.after(async () => {
    /*
    |--------------------------------------------------------------------------
    | Shutdown server
    |--------------------------------------------------------------------------
    |
    | Shutdown the HTTP server when all tests have been executed.
    |
    */
    use("Adonis/Src/Server").getInstance().close();

    /*
    |--------------------------------------------------------------------------
    | Rollback migrations
    |--------------------------------------------------------------------------
    |
    | Once all tests have been completed, we should reset the database to it's
    | original state
    |
    */
    await ace.call("migration:reset", {}, { silent: true });
  });
};
