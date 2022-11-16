"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("register", "AuthController.register");
Route.post("authenticate", "AuthController.authenticate");
Route.post("sessions", "SessionController.store");

// Rover routes

Route.group(() => {
  Route.get("rover/logs", "RoverController.getLogs");

  Route.post("rover/send-commands", "RoverController.move");
}).middleware(["auth"]);
