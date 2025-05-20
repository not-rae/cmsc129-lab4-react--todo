import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo, setEditingTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map(todo => (
        <TodoItem
          {...todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={setEditingTodo}
        />
      ))}
    </ul>
  );
}

