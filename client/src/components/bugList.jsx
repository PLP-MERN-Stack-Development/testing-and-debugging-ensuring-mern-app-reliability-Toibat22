import BugItem from "./bugItem";

function BugList({ bugs }) {
  if (bugs.length === 0) return <p>No bugs found!</p>;

  return (
    <div>
      {bugs.map((bug) => (
        <BugItem key={bug.title + bug.category} bug={bug} />
      ))}
    </div>
  );
}

export default BugList;
