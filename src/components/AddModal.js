import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import '../App';
import TodoList from './TodoList';
import { render } from '@testing-library/react';

////スタイリング////
    const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    `

    const ModalWindow = styled.div`
    z-index: 2;
    width: 50%;
    min-width: 500px;
    padding: 10px;
    background-color: #fff;
    `

    const NewTodoForm = styled.textarea`
        resize: none;
        width: 160px;
        height: 80px;
        margin: 0 auto;
    `
////AddModaltコンポーネント(①show②title③id④setshowメソッドの4つをTodoListコンポーネントから受け取っている)////
    function AddModal( {todoshow, title, id, setTodoShow, effect, setEffect, user} ){
        ////stateで定義されるtodoの初期値を決める。フォームに入力するためのstateなので初期値が必要////
            const initialTodoState = {
                id: null,
                about: "",
                genre_id: null
            }
            const initialGenreState = {
                id:null,
                name:"",
                user_id:user.id
            }
        ////todo stateの定義////
            const [todo, setTodo] = useState(initialTodoState)
            const [genre, setGenre] = useState(initialGenreState)
        ////modalを閉じるメソッドの定義////
            const closeModalWindow = () =>{
                setTodoShow(false);
            }
        ////todo投稿フォームの書き換え定義////
        const handleNewTodoForm = (event) => {
            const {about, value} = event.target;
            setTodo({ about: value});
        }

        const saveTodo = () => {
            var data ={
                about: todo.about,
                genre_id: id
            }

            axios.post('http://localhost:3000/api/v1/todos', data)
            .then(resp => {
                setTodo({
                    id: resp.data.id,
                    about: resp.data.about,
                    genre_id: resp.data.genre_id
                })
                setTodoShow(false);
                setEffect(false);
                console.log("effect1");
                console.log(effect);
            })
            .catch(e => {
                console.log(e)
            })

        }

        const handleNewGenreForm = (event) => {
            const {name, value}=event.target;
            setGenre({name:value});
        }

        const saveGenre = () => {
            console.log(user);
            var data = {
                name:genre.name,
                user_id:user.id
            }

            axios.post('http://localhost:3000/api/v1/genres', data)
            .then(resp => {
                setGenre({
                    name: resp.data.name,
                    user_id:user.id
                })
                setTodoShow(false);
                setEffect(false);
                console.log("effect1");
                console.log(effect);
            })
            .catch(e => {
                console.log(e)
            })

        }

        
        return(
            <>
                <Overlay onClick={() => closeModalWindow()}>
                    <ModalWindow onClick={(e) => e.stopPropagation()}>
                        {
                            id &&
                            <>
                                <h1>新規タスク追加</h1>
                                <h2>{title}</h2>
                                <NewTodoForm
                                type = "text"
                                required
                                value = {todo.about}
                                name = "about"
                                onChange={handleNewTodoForm}
                                /> 
                                <p>
                                    <button 
                                        onClick={saveTodo}
                                        disabled={(!todo.about || /^\s*$/.test(todo.about))}
                                    >
                                        タスクを保存
                                    </button>
                                </p>
                            </> 
                        }
                        {
                            !id &&
                            <>
                                <h1>{title}</h1>
                                <NewTodoForm
                                type = "text"
                                required
                                value = {genre.name}
                                name = "name"
                                onChange={handleNewGenreForm}
                                /> 
                                <p>
                                    <button 
                                        onClick={saveGenre}
                                        disabled={(!genre.name || /^\s*$/.test(genre.name))}
                                    >
                                        ジャンルを保存
                                    </button>
                                </p>
                            </> 
                        }
                    </ModalWindow>
                </Overlay>
            </>
        )
    }

export default AddModal;