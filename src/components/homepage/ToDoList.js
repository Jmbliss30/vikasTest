import React, { useState, useEffect } from 'react';
//import Comments from './comments';
import Todo from './Todo';
import Comments from './comments';

const ToDoList = ({
  setTodos,
  setFilteredTodos,
  todos,
  todo,
  filteredTodos,
  value,
  filter,
}) => {
  //console.log('Todos-->', todos);

  return (
    <div className='todo-container'>
      <ul className='todo-list'>
        {filteredTodos?.map((todo, index) => (
          <div key={index}>
            <Todo
              key={todo.task}
              setFilteredTodos={setFilteredTodos}
              setTodos={setTodos}
              todos={todos}
              text={todo.task}
              id={todo._id}
              todo={todo}
              filteredTodos={filteredTodos}
              value={value}
              filter={filter}
            />
            <>
              Created At:{' '}
              {new Date(todo.createdAt).toLocaleTimeString('en-us', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {/* {new Date(todo.createdAt).toLocaleTimeString('en-us', {
                hour: '2-digit',
                minute: '2-digit',
              })} */}
            </>
          </div>
        ))}
      </ul>
      {/* <ul className='todo-list'>
        {filteredTodos.map?((comment) => (
          <Comments />
        ))}
      </ul> */}
    </div>
  );
};
export default ToDoList;
