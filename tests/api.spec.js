const { test, expect } = require('@playwright/test');

const baseUrl = "https://reqres.in/api/users";

test.describe("CRUD operations", () => {

  test("GET list of users", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users?page=2");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data).toHaveLength(6);

    body.data.forEach(user => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("first_name");
      expect(user).toHaveProperty("last_name");
      expect(user).toHaveProperty("avatar");
    });
  });

  test("POST should create a new user", async ({ request }) => {
    const newUser = {
      name: "Zhenia Olifirenko",
      job: "FrontEnd"
    };

    const response = await request.post(baseUrl, {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty("name", newUser.name);
    expect(body).toHaveProperty("job", newUser.job);
  });

  test('PUT should update user', async ({ request }) => {
    const userId = 2;
    const updatedUser = {
      name: "Zhenia Olifirenko",
      job: "CI"
    };

    const response = await request.put(`${baseUrl}/${userId}`, {
      data: updatedUser
    });

    console.log('Response Status:', response.status());
    console.log('Response Body:', await response.text());

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('name', updatedUser.name);
    expect(body).toHaveProperty('job', updatedUser.job);
    expect(body).toHaveProperty('updatedAt');
  });

  test("DELETE should delete user", async ({ request }) => {
    const userId = 2;

    const deleteResponse = await request.delete(`${baseUrl}/${userId}`);
    expect(deleteResponse.status()).toBe(204);
  });

});