"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request, auth }) {
    const { email, password } = request.all();
    const user = await User.create({ email, password });
    const token = await auth.generate(user);

    return token;
  }

  async authenticate({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = AuthController;
