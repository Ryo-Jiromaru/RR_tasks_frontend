import React from "react"
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';
import '../App'

const About = styled.section`
    padding: 30px 0 30px 0;
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

function Top() {

  return (
    <>
        <About>
            <SectionInner>
                <Title>
                    About
                </Title>
                <Discription>
                     FutureAlcoholとはどんなサービス？
                </Discription>
                <AboutBox>
                    お酒の歴史は古くは紀元前4000年まで遡ります。メソポタミア地方のシュメル人は果実酒を作り、飲んでいました。メソポタミア地方ではその後、紀元前3000年ごろにはビールが飲まれるようになります。<br/>
                    定番のお酒であるウイスキーなどの蒸留酒は11世紀初めの南イタリアで、なんと医療用のアルコールとして作られたのが始まりでした。<br/>
                    お酒にはこのように非常に深い歴史があり、現代でも刻々とその姿を変えています。では現代における最新のお酒はなんなのか、それを紹介するのがFutureAlcoholです。
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