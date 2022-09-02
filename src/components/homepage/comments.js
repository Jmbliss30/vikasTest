import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

const Comments = ({ id, setTodos, setFilteredTodos, filter }) => {
  const [inputText, setInputText] = useState('');
  const [comment, setComment] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const reqObj = {
    user: { email: JSON.parse(localStorage.getItem('user')).email },
  };

  const inputTextHandlerTwo = (e) => {
    setInputText(e.target.value);
  };

  const commentDeleteHandler = async () => {
    const deleted = await fetch(`http://localhost:9002/comments/${id}`, {
      method: 'DELETE',
    });

    const response = await deleted.json();
    // fetch('http://localhost:9002/todos')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('DATA -----------> ', data);
    //     setTodos(data);
    //     setFilteredTodos(data);
    //   });
    console.log('filter ==>', filter);

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

    console.log(response);
  };

  const submitCommentHandler = async (e) => {
    const comment = {
      task: inputText,
      todoId: id,
    };

    // console.log('this is it -------------->', );
    const response = await fetch('http://localhost:9002/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: { 'content-type': 'application/json' },
    });
    console.log('this is it -------------->', comment);
    // //const commentResponse = await response.json();
    // const CommentResult = await response.json();

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

    // fetch('http://localhost:9002/todos')
    //   .then((res) => res.json())
    //   .then((data) => {

    // });

    // fetch('http://localhost:9002/todos')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('DATA -----------> ', data);
    //     setTodos(data);
    //     setFilteredTodos(data);
    //   });

    // if (inputText.trim()) {
    //   setTodos([...todos, todoResult]);
    // }
    // document.getElementById('').value = '';
    // setInputText('');
  };

  // useEffect(() => {
  //   localStorage.setItem('comments', JSON.stringify(comment));
  // }, [comment]);

  return (
    <div>
      <input
        onChange={inputTextHandlerTwo}
        placeholder='//Enter Comments'
        type='text'
        className='todo-input'
      ></input>
      <button
        onClick={() => {
          submitCommentHandler();
        }}
        className='todo-button'
        type='submit'
      >
        <i>+</i>
      </button>

      <button
        onClick={() => commentDeleteHandler()}
        className='todo-button'
        type='submit'
      >
        <i>-</i>
      </button>
    </div>
  );
};

export default Comments;
