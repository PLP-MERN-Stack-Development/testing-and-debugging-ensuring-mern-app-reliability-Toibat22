import { useState } from "react";
import Button from "./button";

function BugForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "UI",
    status: "open", // default status
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBug = {
      ...formData,
      id: Date.now(),
    };
    onSubmit(newBug);
    setFormData({
      title: "",
      description: "",
      category: "UI",
      status: "open",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Bug title"
        value={formData.title}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Bug description"
        value={formData.description}
        onChange={handleChange}
      />

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="UI">UI</option>
        <option value="Backend">Backend</option>
        <option value="API">API</option>
      </select>

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <Button type="submit">Add Bug</Button>
    </form>
  );
}

export default BugForm;
