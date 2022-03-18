import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'
import AddTodoModal from './AddTodoModal';
import { render } from '@testing-library/react';

const TaskBord = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  min-width: 1200px;
  height: 800px;
  margin: 0 auto;
  background-color: #e6ffeb;
  border-radius: 10px;
`

const GenreCard = styled.div`
  width: 200px;
  min-height: 100px;
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  border: 1px solid #d4d2d2;
  border-radius: 5px;
`

const GenreName = styled.h1`
  font-size: 20px;
  font-weight: bold;
`

const TodoCard = styled.div`
  width: 160px;
  height: 80px;
  margin: 10px auto;
  border: 1px solid #333;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  padding: 5px;
`

const TodoAbout = styled.p`
  color: #333;
  font-size: 12px;
`

function TodoList() {

  const [genres, setGenres] = useState([])

  const [show, setShow] = useState(false)

  const [modaltitle, setModalTitle] = useState([])

  const [modalgenreid, setModalGenreId] = useState([])

  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get('http://localhost:3000/api/v1/todos.json');
      setGenres(response.data)
    }
    getTodo();

    //下記でやったら投稿したタスクの表示に更新が必要、上記でやったら非同期で表示可能

    // axios.get('http://localhost:3000/api/v1/todos.json')
      // .then(resp => {
      //     console.log(resp.data);
      //     setGenres(resp.data);
      // })
      // .catch(e => {
      //     console.log(e)
      // })
  })

  const openAddTodoModal = (genre) =>{
    setModalTitle(genre.name);
    setModalGenreId(genre.id);
    setShow(true);
  }

  return (
    <>
      <h1>
        All Todo
      </h1>
      <TaskBord>
        {
          genres.map((genre, key) =>
            {
              return(
                <GenreCard>
                  <GenreName>{genre.name}</GenreName>
                    {
                      genre.todos.map((todo, num) =>
                        {
                          return(
                            <>
                              <TodoCard>
                                <TodoAbout>{todo.about}</TodoAbout>
                              </TodoCard>
                              {
                                // {
                                //   (()=>{
                                //   if(show==true){
                                //     return <AddTodoModal show={show} title={genre.name} id={genre.id}/>;
                                //   }
                                //   })
                                // }

                                // 上か下かのどちらかでいい

                                // show && <AddTodoModal show={show} title={genre.name} id={genre.id}/>
                              }
                            </>
                          );
                        }
                      )
                    }
                     <button onClick={() => openAddTodoModal(genre)}>Click</button>
                </GenreCard>
              );
            }
          )
        }
      </TaskBord>
      {show &&<AddTodoModal show={show} title={modaltitle} id={modalgenreid} setShow={setShow}/>}
    </>
  );
}

export default TodoList