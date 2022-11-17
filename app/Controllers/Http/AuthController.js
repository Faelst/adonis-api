"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request, auth }) {
    const { username, email, password } = request.all();

    const user = await User.create({ username, email, password });

    const token = await auth.generate(user);

    await User.query().where("id", user.id).update({ token: token.token });

    return token;
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.query().where("email", email).first();

    await User.query().where("id", user.id).update({ token: token.token });

    return response.redirect("/logs", token);
  }

  showLogin({ view }) {
    return view.render("login");
  }
}

module.exports = AuthController;
