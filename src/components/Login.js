import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components"

const Title = styled.h1`
    text-align: center;
`

const LoginBox = styled.div`
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

const LoginsButton = styled.button`
    border: 1px solid rgb(180,255,168);
    background-color: #fff;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    color: rgb(69,148,56);
    display: block;
    margin: 0 auto;
`

function Login({handleLogin, loggedInStatus}){

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    let navigate = useNavigate();

    const handleSuccessfulAuthentication = (data) => {
        console.log("handleSuccessfulAuthentication発火");
        console.log("handleLogin開始");
        console.log(data);
        handleLogin(data);
        console.log("handleLogin終了");
        navigate("../top", { replace: true });
    }

    const handleSubmit = (event) => {
        axios.post("http://localhost:3000/login",
            {
                user:{
                    email:email,
                    password:password
                }
            },
        ).then(response => {
            console.log("login res", response)
            if(response.data.logged_in === true){
                handleSuccessfulAuthentication(response.data);
            }
        }).catch(error => {
            console.log("login error", error)
        })
        event.preventDefault();
    }

    return(
        <>
            <Title>ログイン</Title>
            <LoginBox>
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
                    <LoginsButton>ログインする</LoginsButton>
                </form>
            </LoginBox>
        </>
    );

}

export default Login