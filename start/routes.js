"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", "Documents.login");
Route.get("/logs", "Documents.logs");

Route.post("register", "AuthController.register");
Route.post("authenticate", "AuthController.authenticate");

// Rover routes
Route.group(() => {
  Route.get("rover/logs", "RoverController.getLogs");

  Route.post("rover/send-commands", "RoverController.move");
}).middleware(["auth"]);
