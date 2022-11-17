const { test, trait } = use("Test/Suite")("Controller/Authenticate");

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
    .post("/authenticate")
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

test("Should return Redirect for logs when session created", async ({
  client,
}) => {
  const fakeUser = {
    username: "any_username_1",
    email: "any_email_1@mail.com",
    password: "any_password",
  };

  await Factory.model("App/Models/User").create(fakeUser);

  const response = await client
    .post("/authenticate")
    .send({
      email: fakeUser.email,
      password: fakeUser.password,
    })
    .header("user-agent", "Mozilla")
    .end();

  response.assertStatus(200);
  response.assertRedirect("/logs");
});
