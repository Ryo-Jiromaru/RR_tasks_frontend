import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'
import { render } from '@testing-library/react';

const TodoCard = styled.div`
  width: 500px;
  height: 100px;
  margin: 10px auto;
  border: 1px solid #333;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
`

const TodoAbout = styled.p`
  color: #333;
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
        {
          genres.map((genre, key) =>
            {
              console.log(key);
              console.log(genre);
              return(
                <div className = "genrecard">
                    {
                      genre.todos.map((todo, num) =>
                        {
                          console.log(key + '-' + num)
                          console.log(todo);
                          return(
                            <TodoCard><TodoAbout>{genre.name}</TodoAbout></TodoCard>
                          );
                        }
                      )
                    }
                </div>
              );
            }
          )
        }
    </>
  );
}

export default TodoList