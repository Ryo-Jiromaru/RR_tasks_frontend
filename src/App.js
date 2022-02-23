import React from 'react'
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import Top from './components/Top'
import UserSignUp from './components/UserSignUp';
import TodoList from './components/TodoList';

const Main = styled.body`
`

function App() {

  // const axiosPost = axios.create({
  //   xsrfHeaderName: 'X-CSRF-Token',
  //   withCredentials: true
  // })

  return (
    <>
      <header>
        <div className = "header_logo">
        </div>
        <div className= 'header_navbar'>
        </div>
      </header>
      <Main>
        <Routes>
          <Route path="/top" element={<Top/>}/>
          <Route path="/users/sign_up" element={<UserSignUp/>}/>
          <Route path="/api/v1/todos" element={<TodoList/>}/>
        </Routes>
      </Main>
    </>
  );
}

export default App;