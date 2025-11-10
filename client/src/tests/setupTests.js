import "@testing-library/jest-dom";
import { server } from "../mocks/server";

// Start MSW before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close MSW after all tests
afterAll(() => server.close());
