import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'
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
  margin: 0 auto;
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

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos.json')
    .then(resp => {
        setGenres(resp.data);
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
      <TaskBord>
        {
          genres.map((genre, key) =>
            {
              console.log(key);
              console.log(genre);
              return(
                <GenreCard>
                  <GenreName>{genre.name}</GenreName>
                    {
                      genre.todos.map((todo, num) =>
                        {
                          console.log(key + '-' + num)
                          console.log(todo);
                          return(
                            <TodoCard>
                              <TodoAbout>{todo.about}</TodoAbout>
                            </TodoCard>
                          );
                        }
                      )
                    }
                </GenreCard>
              );
            }
          )
        }
      </TaskBord>
    </>
  );
}

export default TodoList