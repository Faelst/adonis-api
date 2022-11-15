"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("register", "AuthController.register");
Route.post("authenticate", "AuthController.authenticate");
Route.post("sessions", "SessionController.store");
