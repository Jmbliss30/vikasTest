import React, { useEffect, useState } from 'react';
//import 'font-awesome/css/font-awesome.min.css';

import { facheck } from '@fortawesome/react-fontawesome';
import { FaCheck, FaTrash, FaRecycle } from 'react-icons/fa';

import Comments from './comments';

const Todo = ({
  text,
  todos,
  todo,
  setFilteredTodos,
  id,
  setTodos,
  app,
  value,
  filter,
}) => {
  const reqObj = {
    user: { email: JSON.parse(localStorage.getItem('user')).email },
  };
  const [initialtext, setinitialtext] = useState(text);
  //console.log('TODO --------> ', todo);
  const deleteHandler = async (id) => {
    const deleted = await fetch(`http://localhost:9002/todos/${id}`, {
      method: 'DELETE',
    });

    const response = await deleted.json();
    if (
      filter === 'all' ||
      filter === null ||
      filter === undefined ||
      filter === ''
    ) {
      fetch('http://localhost:9002/todos', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    } else if (filter === 'completed') {
      fetch('http://localhost:9002/todosp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          //debugger;
          setFilteredTodos(data);
        });
    } else {
      fetch('http://localhost:9002/todosapp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    }
  };

  // useEffect(() => {}, [todos, todo]);

  const completeHandler = async (id, status) => {
    const updated = await fetch(`http://localhost:9002/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        completed: status ? false : true,
      }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await updated.json();
    if (
      filter === 'all' ||
      filter === null ||
      filter === undefined ||
      filter === ''
    ) {
      fetch('http://localhost:9002/todos', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    } else if (filter === 'completed') {
      fetch('http://localhost:9002/todosp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          //debugger;
          setFilteredTodos(data);
        });
    } else {
      fetch('http://localhost:9002/todosapp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    }
  };

  const updateHandler = async (id, todo) => {
    todo.task = initialtext;
    const updated = await fetch(`http://localhost:9002/todosupdate/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: { 'content-type': 'application/json' },
    });
    console.log('updated todo --->', updated);
    const response = await updated.json();
    if (
      filter === 'all' ||
      filter === null ||
      filter === undefined ||
      filter === ''
    ) {
      fetch('http://localhost:9002/todos', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    } else if (filter === 'completed') {
      fetch('http://localhost:9002/todosp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          //debugger;
          setFilteredTodos(data);
        });
    } else {
      fetch('http://localhost:9002/todosapp', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: { 'content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredTodos(data);
        });
    }
  };

  return (
    <div className='todo'>
      <input
        onChange={(e) => setinitialtext(e.target.value)}
        defaultValue={text}
        className={`todo-item ${todo.completed ? 'completed' : ''}`}
      ></input>
      <button onClick={() => updateHandler(id, todo)} className='complete-btn'>
        {/* <FontAwesomeIcon icon='fa-solid fa-angle-right' /> */}
        {/* <i className='fa-solid fa-angle-right'></i> */}
        <FaRecycle />
      </button>
      <button
        onClick={() => completeHandler(id, todo.completed)}
        className='complete-btn'
      >
        {/* <FontAwesomeIcon icon='fa-solid fa-angle-right' /> */}
        {/* <i className='fa-solid fa-angle-right'></i> */}
        <FaCheck />
      </button>
      <button
        onClick={() => deleteHandler(id)}
        className='trash-btn'
        id='delete'
      >
        {/* <i className='FaTrash'></i> */} <FaTrash />
      </button>
      <div>
        <Comments
          id={todo._id}
          setTodos={setTodos}
          setFilteredTodos={setFilteredTodos}
          value={value}
          filter={filter}
        />
      </div>
      <div>
        {todo.comments.length > 0 &&
          todo.comments.map((c, i) => {
            return <div>{c.comment}</div>;
          })}
      </div>
    </div>
  );
};

export default Todo;
