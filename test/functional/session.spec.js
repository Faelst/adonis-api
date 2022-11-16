const { test, trait } = use("Test/Suite")("Controller/Session");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use("App/Models/User");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

trait("Test/ApiClient");

test("Should return JWT Token when session created", async ({ client }) => {
  const fakeUser = {
    username: "any_username",
    email: "any_email@mail.com",
    password: "any_password",
  };

  await Factory.model("App/Models/User").create(fakeUser);

  const response = await client
    .post("/sessions")
    .send({
      email: fakeUser.email,
      password: fakeUser.password,
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    type: "bearer",
    token: response.body.token,
  });
});
