import React from 'react'
import './App.css';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import Top from './components/Top'
import TodoList from './components/TodoList';
import Registration from './components/Registration'
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from "react-router-dom"

axios.defaults.withCredentials = true;

const Main = styled.div`
  padding-top:30px;
`

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 300px;
`

function App() {

  let navigate = useNavigate();

  // const axiosPost = axios.create({
  //   xsrfHeaderName: 'X-CSRF-Token',
  //   withCredentials: true
  // })

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({})

  useEffect(() => {
    checkLoginStatus()
  })

  const checkLoginStatus = () => {
    console.log("checkLoginStatusが走ってる");
    axios.get("http://localhost:3000/logged_in", { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう")
          setUser(response.data.user);
          console.log(response.data);
        } else if (!response.data.logged_in && loggedInStatus === "ログインなう") {
          setLoggedInStatus("未ログイン")
          setUser({})
        }
    }).catch(error => {
      console.log("ログインエラー", error)
    })
  }

  const handleLogin = (data) => {
    console.log("handleLogin発火");
    setLoggedInStatus("ログインなう");
    setUser(data.user);
    console.log("handleLogin終了地点");
  }

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  }

  const handleLogoutClick = () => {
    axios.delete("http://localhost:3000/logout", { withCredentials: true })
        .then(response => {
            handleLogout();
            navigate("../top", {replace:true});
        }).catch(error => console.log("ログアウトエラー", error))
}

  return (
    <>
      <header>
        <div className = "header_logo">
        </div>
        <HeaderNav>
          <a href="/top">トップ</a>
          {loggedInStatus == "ログインなう" && <a href="/api/v1/todos">ToDoリスト</a>}
          {loggedInStatus == "未ログイン" && <a href = "/signup">サインアップ</a>}
          {loggedInStatus == "未ログイン" && <a href = "/login">ログイン</a>}
          {loggedInStatus == "ログインなう" && <a onClick={handleLogoutClick} href = "#">ログアウト</a>}
        </HeaderNav>
      </header>
      <Main>
        <Routes>
          <Route path="/top" element={<Top handleLogin={handleLogin} loggedInStatus={loggedInStatus}/>} />
          <Route path="/api/v1/todos" element={<TodoList handleLogin={handleLogin} loggedInStatus={loggedInStatus}  user={user}/>}/>
          <Route path = "/signup" element = {<Registration handleLogin={handleLogin} loggedInStatus={loggedInStatus}/>}/>
          <Route path = "/login" element = {<Login handleLogin={handleLogin} loggedInStatus={loggedInStatus}/>}/>
        </Routes>
      </Main>
    </>
  );
}

export default App;