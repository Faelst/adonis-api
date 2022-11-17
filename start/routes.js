"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "AuthController.showLogin");
Route.post("authenticate", "AuthController.authenticate");

Route.get("/logs", "RoverController.showLogs");

Route.post("register", "AuthController.register");

// Rover routes
Route.group(() => {
  Route.get("rover/logs", "RoverController.getLogs");

  Route.post("rover/send-commands", "RoverController.move");
}).middleware(["auth"]);
