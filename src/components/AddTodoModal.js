import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import '../App';
import TodoList from './TodoList';
import { render } from '@testing-library/react';

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

function AddTodoModal( {show, title, id, setShow} ){

    const history = createBrowserHistory();

    const initialTodoState = {
        id: null,
        about: "",
        genre_id: null
    }

    const [todo, setTodo] = useState(initialTodoState)

    const closeModalWindow = () =>{
        setShow(false);
    }

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
            setShow(false);
            history.replace('http://localhost:3001/api/v1/todos');
        })
        .catch(e => {
            console.log(e)
        })
    }

    
    return(
        <>
            <Overlay onClick={() => closeModalWindow()}>
                <ModalWindow onClick={(e) => e.stopPropagation()}>
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
                </ModalWindow>
            </Overlay>
        </>
    )
}

export default AddTodoModal