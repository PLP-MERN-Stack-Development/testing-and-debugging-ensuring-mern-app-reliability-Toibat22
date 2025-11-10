import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:5000/api/bugs"; // Make sure backend runs on port 5000

  // Fetch all bugs
  const fetchBugs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBugs(data);
    } catch (err) {
      console.error("Failed to fetch bugs:", err);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // Add new bug
  const handleAddBug = async (e) => {
    e.preventDefault();

    const newBug = {
      title,
      description,
      status: "open", // match backend enum
      reporter: "Anonymous", // required by backend
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBug),
      });

      if (!res.ok) throw new Error("Failed to add bug");

      const addedBug = await res.json();
      setBugs((prev) => [...prev, addedBug]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding bug:", err);
      alert("Failed to add bug. Check console for details.");
    }
  };

  // Update bug status
  const handleUpdateStatus = async (id) => {
    try {
      const bug = bugs.find((b) => b._id === id);
      const newStatus =
        bug.status === "open"
          ? "in-progress"
          : bug.status === "in-progress"
          ? "resolved"
          : "resolved";

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update bug");

      const updatedBug = await res.json();
      setBugs((prev) => prev.map((b) => (b._id === id ? updatedBug : b)));
    } catch (err) {
      console.error("Error updating bug:", err);
    }
  };

  // Delete bug
  const handleDeleteBug = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete bug");

      setBugs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting bug:", err);
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Bug Tracker</h1>

        {/* Add Bug Form */}
        <form onSubmit={handleAddBug} style={{ marginBottom: "2rem" }}>
          <input
            type="text"
            placeholder="Bug Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginRight: "1rem" }}
          />
          <input
            type="text"
            placeholder="Bug Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ marginRight: "1rem" }}
          />
          <button type="submit">Add Bug</button>
        </form>

        {/* Bug List */}
        <h2>All Bugs</h2>
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id} style={{ marginBottom: "0.5rem" }}>
              <strong>{bug.title}</strong> - {bug.description} [{bug.status}]
              <button
                onClick={() => handleUpdateStatus(bug._id)}
                style={{ marginLeft: "1rem" }}
              >
                Update Status
              </button>
              <button
                onClick={() => handleDeleteBug(bug._id)}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
}

export default App;
