import React, {useState, useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'
import AddTodoModal from './AddTodoModal';
import { render } from '@testing-library/react';

////スタイリング////

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

////TodoListコンポーネント////

  function TodoList({loggedInStatus}) {

    ////TodoListでTodoを表示するために、Todoの親となっているGenreを取得する////
      const [genres, setGenres] = useState([])
    ////AddTodoModalコンポーネントを表示するかしないかのステータス////
      const [todoshow, setTodoShow] = useState(false)
    ////AddTodoModalコンポーネントに受け渡すためにタイトル（ジャンル名）を保存するstate////
      const [modaltitle, setModalTitle] = useState([])
    ////AddTodoModalコンポーネントに受け渡すためにGenreとTodoを紐付けるIDを保存するstate////
      const [modalgenreid, setModalGenreId] = useState([])
    ////useEffectの発火条件管理
      const [effect, setEffect] = useState(false)

    ////ページロード時&投稿後、Todoの情報を取得////
      ////TodoはGenreが親となって保持しているため、Genreを取得すれば問題ない/////
      useEffect(() => {
      ////effectをuseEffectの第二引数にし、useEffectの発火条件にした
        const getTodo = async () => {
          try{
            const response = await axios.get('http://localhost:3000/api/v1/todos.json');
            setGenres(response.data);
            console.log("effect3");
            setEffect(true);
            console.log(KeyframeEffect)
          }catch(error){
            console.log(error);
          }
        }
        getTodo();
        ////二つのやり方を試した////
          ////▼上手くいったやり方：asyncを使ってtodoを非同期で常に取得し続けるやり方▼////
          ////と思いきや、常に取得し続けるやり方は無限ループとなってしまいよろしくないため、もう一個上のやり方に。////
            // const getTodo = async () => {
            //   try{
            //     const response = await axios.get('http://localhost:3000/api/v1/todos.json');
            //     setGenres(response.data);
            //     console.log("effect3");
            //     setEffect(true);
            //     console.log(KeyframeEffect)
            //   }catch(error){
            //     console.log(error);
            //   }
            // }
            // getTodo();

          //▼上手くいかなかったやり方：単純にaxiosで取得するやり方。非同期処理（タスク投稿後、更新無しでタスクを表示）ができなかった////
            // axios.get('http://localhost:3000/api/v1/todos.json')
            //   .then(resp => {
            //       console.log(resp.data);
            //       setGenres(resp.data);
            //   })
            //   .catch(e => {
            //       console.log(e)
            //   })
      },[effect])
    // 新規Todo投稿のためにAddTodoModalコンポーネントを開く際に、
    // 開くボタンに応じてAddTodoModalコンポーネントのタイトル（Todoのジャンル名）や、
    // GenreとTodoを紐付けるIDをAddTodoModalコンポーネントに受け渡すための関数
      const openAddTodoModal = (genre) =>{
        ////AddTodoModalコンポーネントのタイトル（Todoのジャンル名）////
          setModalTitle(genre.name);
        ////GenreとTodoを紐付けるID////
          setModalGenreId(genre.id);
        ////AddTodoModalコンポーネントを開くステータスをtrueにする////
        setTodoShow(true);
      }

    return (
      <>
        <h1>
          All Todo
        </h1>
        <TaskBord>
          {/* stateで定義したgenresをmapで回して、ジャンルごとでカードを表示するようにする */}
            {
              genres.map((genre) =>
                {
                  return(
                    <GenreCard key = {genre.id}>
                      <GenreName>{genre.name}</GenreName>
                      {/* gereのtodoをmapで回して各ジャンルのカードの中にtodoごとでカードを表示するようにする */}
                        {
                          genre.todos.map((todo) =>
                            {
                              return(
                                  <TodoCard key = {todo.id}>
                                    <TodoAbout>{todo.about}</TodoAbout>
                                  </TodoCard>
                              );
                            }
                          )
                        }
                        <button onClick={() => openAddTodoModal(genre)}>追加</button>
                    </GenreCard>
                  );
                }
              )
            }
        </TaskBord>
        {/* stateで定義したshowがtrueならば、AddTodoModalコンポーネントを表示し、
        stateで定義したshowとmodaltitleとmodalgenreidを使用して、AddTodoModalコンポーネントに
        ①AddTodoModalコンポーネントを表示するかのステータス②タイトル（Todoのジャンル名）③GenreとTodoを紐付けるID④setshowメソッドをModalに受け渡す */}
          {todoshow &&<AddTodoModal todoshow={todoshow} title={modaltitle} id={modalgenreid} setTodoShow={setTodoShow} effect={effect} setEffect={setEffect}/>}
      </>
    );
  }

export default TodoList