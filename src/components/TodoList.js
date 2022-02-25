import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'

const TodoCard = styled.div`
  width: 300px;
  height: 100px;
  margin: 0 auto;
`

function TodoList() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos')
    .then(resp => {
        setTodos(resp.data);
    })
    .catch(e => {
        console.log(e)
    })
  }, [])

  return (
    <>

      <h1>
        All Todo
      </h1>
        {todos.map((val, key) => {
          return(
              <TodoCard key = {key}>
                {val.title}
              </TodoCard>
          )
        })}
    </>
  );
}

export default TodoList