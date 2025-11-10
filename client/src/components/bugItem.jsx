function BugItem({ bug }) {
  return (
    <div className="bug-item">
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <span>{bug.category}</span> | <span>{bug.status}</span>
    </div>
  );
}

export default BugItem;
