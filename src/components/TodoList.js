import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'

function TodoList() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos')
    .then(resp => {
        console.log(resp.data)
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
    </>
  );
}

export default TodoList;