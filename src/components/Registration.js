import React, { useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom"


const Title = styled.h1`
    text-align: center;
`

const RegistrationBox = styled.div`
    width: 600px;
    margin: 20px auto 0;
    border: 1px solid rgb(121, 121, 121);
    box-shadow: 3px 1px 3px rgb(50, 50, 50);
    padding: 20px 0;
    border-radius: 10px;
`

const EmailField = styled.input.attrs({
    type:"email"
})`
    border: 1px solid rgb(121,121,121);
    border-radius: 5px;
    width: 390px;
    height: 26px;
    display: block;
    margin: 30px auto;
    padding: 2px 5px;
`

const PasswordField = styled.input.attrs({
    type:"password"
})`
    border: 1px solid rgb(121,121,121);
    border-radius: 5px;
    width: 390px;
    height: 26px;
    display: block;
    margin: 30px auto;
    padding: 2px 5px;
`

const PasswordConfirmationField = styled.input.attrs({
    type:"password"
})`
    border: 1px solid rgb(121,121,121);
    border-radius: 5px;
    width: 390px;
    height: 26px;
    display: block;
    margin: 30px auto;
    padding: 2px 5px;
`

const RegistrationsButton = styled.button`
    border: 1px solid rgb(180,255,168);
    background-color: #fff;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    color: rgb(69,148,56);
    display: block;
    margin: 0 auto;
`

function Registration({handleLogin, loggedInStatus}){

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [passwordConfirmation, setPasswordConfirmation] = useState([]);

    const xhr = new XMLHttpRequest();
    let navigate = useNavigate();

    const handleSuccessfulAuthentication = (data) => {
        console.log("handleSuccessfulAuthentication発火");
        console.log("handleLogin開始");
        console.log(handleLogin);
        handleLogin(data);
        console.log("handleLogin終了");
        navigate("../top", { replace: true });
    }


    const handleSubmit = (event) => {
        axios.post("http://localhost:3000/signup",
            {
                user:{
                    email:email,
                    password:password,
                    password_confirmation:passwordConfirmation
                }
            },
        ).then(response => {
            console.log("registration res", response)
            if(response.data.status === 'created'){
                handleSuccessfulAuthentication(response.data);
            }
        }).catch(error => {
            console.log("registraionts error", error)
        })
        event.preventDefault();
    }
    
    return(
        <>
            <Title>新規登録</Title>
            <RegistrationBox>
                <form onSubmit={handleSubmit}>
                    <EmailField
                        name="email"
                        placeholder="メールアドレス"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <PasswordField
                        name="password"
                        placeholder='パスワード'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <PasswordConfirmationField
                        name="password_confirmation"
                        placeholder='パスワード再入力'
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                    />

                    <RegistrationsButton>新規登録する</RegistrationsButton>
                </form>
            </RegistrationBox>
        </>
    );
}

export default Registration;