import request from "supertest";
import mongoose from "mongoose";
import app from "../../server.js";
import Post from "../../src/models/Post.js";

let createdPostId;

describe("Posts API", () => {
  // Connect to DB before all tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST); // use a test DB
  });

  // Clean up after all tests
  afterAll(async () => {
    await Post.deleteMany(); // clean test data
    await mongoose.connection.close();
  });

  test("should create a new post", async () => {
    const response = await request(app)
      .post("/api/posts")
      .send({ title: "Test Post", content: "Testing", author: "Tester" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    createdPostId = response.body.id; // store ID for other tests
  });

  test("should fetch all posts", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("should update a post", async () => {
    const response = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .send({ title: "Updated Title" });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
  });

  test("should delete a post", async () => {
    const response = await request(app).delete(`/api/posts/${createdPostId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Post deleted successfully");
  });
});
