import React from "react"
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'

const About = styled.section`
    padding: 0px 0 30px 0;
`

const SectionInner = styled.div`
  margin: 0 auto;
  width: 80%;
  min-width: 800px;
`

const Title = styled.h1`
    text-align: center;
    font-size: 36px;
    margin-bottom: 0;
`

const Discription = styled.p`
    text-align: center;
    margin-top: 0;
`
const AboutBox = styled.div`
    text-align: center;
`

const Target = styled.section`
    padding: 30px 0 30px 0;
    background-color: #d9d9ff;
`

const TargetBox = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const EachTarget = styled.div`
    width: 20%;
    min-width: 240px;
    height: 400px;
`

const TargetImage = styled.div`
    height: 250px;
    background-color:#b2e9be;
`
const TargetDetail = styled.div`
    height: 150px;
    background-color: #4fff76;
`

function Top({loggedInStatus}) {

  return (
    <>
        <About>
            <SectionInner>
                <Title>
                    About（{loggedInStatus}）
                </Title>
                <Discription>
                     Taskとはどんなサービス？
                </Discription>
                <AboutBox>
                    「Task」とは、RailsのAPIモードとReactで作成したタスク管理アプリです<br/>
                    昨今では、フロントエンドとバックエンドでフレームワークを切り分け、<br/>
                    技術スタックの更新を行いやすいように運用するのが主流となってきつつあります。<br/>
                    しかしながら、マイクロサービス形式の開発ドキュメントは少なく、中級エンジニアにとっては学習を勧めるのが難しいポイントです。<br/>
                    そこで、そのドキュメンテーションの先駆けとなるために、テストとして作成しているアプリケーションがTaskです。
                </AboutBox>
            </SectionInner>
        </About>
        <Target>
            <SectionInner>
                <Title>
                    Client
                </Title>
                <Discription>
                    使ってもらいたい方
                </Discription>
                <TargetBox>
                    <EachTarget>
                        <TargetImage>
                        </TargetImage>
                        <TargetDetail>
                        </TargetDetail>
                    </EachTarget>
                    <EachTarget>
                        <TargetImage>
                        </TargetImage>
                        <TargetDetail>
                        </TargetDetail>
                    </EachTarget>
                    <EachTarget>
                        <TargetImage>
                        </TargetImage>
                        <TargetDetail>
                        </TargetDetail>
                    </EachTarget>
                </TargetBox>
            </SectionInner>
        </Target>
    </>
  );
}

export default Top;