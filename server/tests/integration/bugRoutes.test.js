import request from "supertest";
import mongoose from "mongoose";
import app from "../../server.js"; // adjust path if needed

let createdBugId;

describe("Bug Routes API", () => {
  // Connect to test DB before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Disconnect DB after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a new bug", async () => {
    const response = await request(app)
      .post("/api/bugs")
      .send({
        title: "Test Bug",
        description: "Bug for testing",
        status: "open",
        reporter: "Tester" // ✅ required field
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    createdBugId = response.body.id; // store for later tests
  });

  test("should fetch all bugs", async () => {
    const response = await request(app).get("/api/bugs");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0); // should return at least the one we just created
  });

  test("should update a bug", async () => {
    const response = await request(app)
      .put(`/api/bugs/${createdBugId}`)
      .send({ status: "resolved" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("resolved");
  });

  test("should delete a bug", async () => {
    const response = await request(app).delete(`/api/bugs/${createdBugId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Bug deleted successfully");
  });
});
