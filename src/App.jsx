import "././App.css";
import { useState, useEffect } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [editingTodo, setEditingTodo] = useState(null)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  // load todos from local storage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addOrUpdateTodo(title, dueDate, priority) {
    if (editingTodo) {
      // update existing list
      setTodos(current =>
        current.map(todo =>
          todo.id === editingTodo.id
            ? { ...todo, title, dueDate, priority }
            : todo
        )
      );
      setEditingTodo(null);
    } else {
      // add new task
      setTodos(current => [
        ...current,
        { id: crypto.randomUUID(), title, completed: false, dueDate, priority }
      ]);
    }
  }

  function toggleTodo(id, completed) {
    // toggle task status
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function handleDeleteWithUndo(id) {
    const deletedTodo = todos.find(todo => todo.id === id);
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));

    const undoToast = () => {
      setTodos(currentTodos => [...currentTodos, deletedTodo]);
      toast.dismiss(); // dismiss current toast
      toast.success("Task restored");
    };

    // show toast notification with undo option
    toast(
      <div>
        Task deleted
        <button onClick={undoToast} style={{ marginLeft: "10px", color: "blue", background: "none", border: "none", cursor: "pointer" }}>
          Undo
        </button>
      </div>,
      {
        autoClose: 5000,
      }
    );
  }

  return (
    <>
      <h1 className="header">Todo List</h1>
      <NewTodoForm 
        onSubmit={addOrUpdateTodo} 
        editingTodo={editingTodo} 
        cancelEdit={() => setEditingTodo(null)} 
      />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={handleDeleteWithUndo}
        setEditingTodo={setEditingTodo}
      />
      <ToastContainer position="bottom-left" />
    </>
  )
}
