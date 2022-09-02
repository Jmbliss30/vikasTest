import React, { useEffect, useState } from 'react';
//import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Comments from './comments';
import { FaTerminal } from 'react-icons/fa';

//import

const Form = ({
  setInputText,
  todos,
  setTodos,
  setFilteredTodos,
  inputText,
  setStatus,
  todo,
  setTodo,
  filterHandler,
  setFilter,
  filter,
}) => {
  const inputTextHandler = (event) => {
    setInputText(event.target.value);
  };
  const reqObj = {
    user: { email: JSON.parse(localStorage.getItem('user')).email },
  };
  const submitTodoHandler = async (e) => {
    console.log('inputText -------> ', inputText.length);
    e.preventDefault();
    const trimmedTodo = inputText.trim();
    console.log('inputText after trim -------> ', trimmedTodo.length);
    if (trimmedTodo === '') {
      alert('Cannot enter blank task!');
    } else {
      const todo = {
        task: inputText,
        completed: false,
        email: JSON.parse(localStorage.getItem('user')).email,
      };

      const res = await fetch('http://localhost:9002/create', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'content-type': 'application/json' },
      });

      const todoResult = await res.json();
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

      // if (inputText.trim()) {
      //   setTodos([...todos, todoResult]);
      // }
      document.getElementById('todoInput').value = '';
      setInputText('');
    }
  };

  // const statusHandler= (e) => {
  //     console.log(e.target.value)
  //     if (e.target.value === 'Completed') {
  //         setFilteredTodos(todos.filter((todo) => todo.completed))
  //     } else if (e.target.value === 'Pending') {
  //         setFilteredTodos(todos.filter((todo) => !todo.completed))
  //     } else {
  //         setFilteredTodos(todos)
  //     }
  // }
  const handleFilterTodos = async (value) => {
    // const fetchData = await fetch(`http://localhost:9002/todosp`, {
    //   method: 'GET',
    //   headers: { 'content-type': 'application/json' },
    // });
    // let data = await fetchData.json();
    //let ll = true;

    const filterData = (data) => {
      if (value === 'all') {
        setFilteredTodos(data);
      } else if (value === 'completed') {
        const filterData = data.filter((todo) => todo.completed === true);
        setFilteredTodos(filterData);
      } else {
        const filterData = data.filter((todo) => todo.completed === false);
        setFilteredTodos(filterData);
      }
    };

    fetch('http://localhost:9002/todos', {
      method: 'POST',
      body: JSON.stringify(reqObj),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        filterData(data);
      });
    // console.log('fetchData', fetchData)
    // const response = await fetchData.json()
    // console.log('response', response)
    // return success(response)
    // app.get('/todosp', async (req, res, next) => {
    //   try {
    //     const todos = await Todo.find({ completed: true });
    //     console.log('res', res);
    //     //   return success(res, todos)
    //   } catch (err) {
    //     next({ status: 400, message: 'nope,nothappening!' });
    //   }
    // });
  };

  return (
    <form method='POST' onSubmit={submitTodoHandler}>
      <input
        placeholder='Enter task..'
        id='todoInput'
        onChange={inputTextHandler}
        type='text'
        className='todo-input'
        required
      />

      <input className='todo-button' type='submit' value='+'></input>
      <div className='select'>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
            handleFilterTodos(e.target.value);
          }}
          name='todos'
          className='filter-todo'
        >
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='pending'>Pending</option>
        </select>
      </div>
    </form>
  );
};

export default Form;
