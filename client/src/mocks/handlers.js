
//  NEW (for MSW v2+)
import { http, HttpResponse } from "msw";

export const handlers = [
  // Mock POST /api/bugs - create a bug
  http.post("http://localhost:5000/api/bugs", async ({ request }) => {
    const { title, description, status, reporter } = await request.json();

    return HttpResponse.json(
      {
        id: "mocked-id-123",
        title,
        description,
        status,
        reporter,
      },
      { status: 201 }
    );
  }),

  // Mock GET /api/bugs - fetch all bugs
  http.get("http://localhost:5000/api/bugs", () => {
    return HttpResponse.json(
      [
        {
          id: "mocked-id-123",
          title: "Test Bug",
          description: "Bug for testing",
          status: "open",
          reporter: "Tester",
        },
      ],
      { status: 200 }
    );
  }),
];
