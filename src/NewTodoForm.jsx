import { useEffect, useState } from "react";

export function NewTodoForm({ onSubmit, editingTodo, cancelEdit }) {
  const [newItem, setNewItem] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (editingTodo) {
      setNewItem(editingTodo.title);
      const [date, time] = editingTodo.dueDate?.split(" ") || [];
      setDueDate(date || "");
      setDueTime(time || "");
      setPriority(editingTodo.priority || "Low");
    }
  }, [editingTodo]);

  useEffect(() => {
    if (!editingTodo) {
      setNewItem("");
      setDueDate("");
      setDueTime("");
      setPriority("Low");
    }
  }, [editingTodo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;

    const fullDueDate = dueDate && dueTime ? `${dueDate} ${dueTime}` : dueDate;

    onSubmit(newItem, fullDueDate, priority);
    setNewItem("");
    setDueDate("");
    setDueTime("");
    setPriority("Low");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <div className="form-row">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="dueTime">Due Time</label>
        <input
          type="time"
          id="dueTime"
          value={dueTime}
          onChange={e => setDueTime(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Mid">Mid</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button className="btn">{editingTodo ? "Update" : "Add"}</button>
      {editingTodo && (
        <button type="button" className="btn btn-danger" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
