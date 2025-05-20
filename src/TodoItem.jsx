export function TodoItem({ completed, id, title, dueDate, priority, toggleTodo, deleteTodo, editTodo }) {
  return (
    <li className="todo-item">
      <div className="todo-main">
        <label className="todo-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
          />
          <span className="todo-title">
            {title}
            {priority && (
              <span className={`priority-tag ${priority.toLowerCase()}`}>
                {priority}
              </span>
            )}
          </span>
        </label>
        {dueDate && <div className="due-date">Due: {dueDate}</div>}
      </div>

      <div className="todo-actions">
        <button
          className="btn"
          onClick={() => editTodo({ id, title, dueDate, priority })}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            const confirmDelete = window.confirm("Are you sure you want to delete this task?");
            if (confirmDelete) deleteTodo(id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
