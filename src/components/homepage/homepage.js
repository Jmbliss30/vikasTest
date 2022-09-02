import React, { useState, useEffect } from 'react';
import ToDoList from './ToDoList';
import './homepage.css';
import Form from './form';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';

const Homepage = ({ setLoginUser }) => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [useCompleted] = useState('');
  const [isMount, setIsMount] = useState(false);
  const navigate = useNavigate();
  const [count, setCount] = useState(-1);
  const [value, setValue] = useState();
  const [filter, setFilter] = useState('');

  // const saveLocalTodos = () => {
  //   if (localStorage.getItem('todos') === null) {
  //     localStorage.setItem('todos', JSON.stringify([]));
  //   } else {
  //     localStorage.setItem('todos', JSON.stringify(todos));
  //   }
  // };

  ///Events

  // useEffect(() => {
  //   filterHandler();

  // }), [todos, status];

  // const filterHandler = () => {
  //   switch(status) {
  //     case 'completed':
  //     setFilteredTodos(todos.filter(todo => todo.completed === true))
  //     break;

  //     case 'Pending':
  //       setFilteredTodos(todos.filter(todo => todo.completed === false))
  //       break;

  //     default:
  //       setFilteredTodos(todos)
  //   }
  // }

  // useEffect(() => {
  //   saveLocalTodos();
  // });
  const reqObj = {
    user: { email: JSON.parse(localStorage.getItem('user')).email },
  };

  const callApi = () => {
    fetch('http://localhost:9002/todos', {
      method: 'POST',
      body: JSON.stringify(reqObj),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA -----------> ', data);
        setTodos(data);
        setFilteredTodos(data);
      });
  };
  useEffect(() => {
    // if (!isMount) {
    callApi();

    // setIsMount(true);
    // }
  }, []);

  return (
    <div>
      <h1>To-DO List</h1>
      <>User: {JSON.parse(localStorage.getItem('user')).email}</>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setTodo={setTodo}
        setFilteredTodos={setFilteredTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        value={value}
        setFilter={setFilter}
        filter={filter}
      />

      <ToDoList
        setFilteredTodos={setFilteredTodos}
        filteredTodos={filteredTodos ?? []}
        setTodos={setTodos}
        todos={todos}
        todo={todo}
        value={value}
        filter={filter}
      />

      <div
        className='button'
        onClick={() => {
          localStorage.setItem('user', '');
          console.log('item-->', localStorage.getItem('user'));

          if (!localStorage.getItem('user')) {
            navigate('/login');
          }
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Homepage;
