// components/Todo.js

import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../utils/supabaseService';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const todos = await getTodos();
    setTodos(todos);
  }

  async function handleCreate() {
    await createTodo(task);
    fetchTodos();
    setTask('');
  }

  async function handleUpdate(id, is_complete) {
    await updateTodo(id, !is_complete);
    fetchTodos();
  }

  async function handleDelete(id) {
    await deleteTodo(id);
    fetchTodos();
  }

  return (
    <div>
      <input 
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleCreate}>Create</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <input 
            type="checkbox" 
            checked={todo.is_complete} 
            onChange={() => handleUpdate(todo.id, todo.is_complete)}
          />
          {todo.task}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
