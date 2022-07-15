import { useState } from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display:  flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.5)),url("https://images.pexels.com/photos/11669476/pexels-photo-11669476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
    background-size: cover;
`;
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #ffffff;
    ${mobile({width: "75%"})}
`;
const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;

    &:focus {
        outline: none;
    }
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #2E4053;
    color: #ffffff;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled {
        cursor: not-allowed;
    }
`;
const Error = styled.span`
    color: red;
`;
const LinkComponent = styled.span`
    margin: 5px 0;
    font-size: 12px;
    cursor: pointer;
    color: #000000;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);

    const HandleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
        if(error){
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
                }, 3000);
        }
    }; 

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
                    <Input placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input placeholder="Password" type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={HandleClick} disabled={isFetching}>LOG IN</Button>
                    {isError && <Error>Failed to log in!</Error>}
                    <Link to={"/"}>
                        <LinkComponent>FORGOT PASSWORD?</LinkComponent>
                    </Link>
                    <Link to={"/register"}>
                        <LinkComponent>CREATE A NEW ACCOUNT</LinkComponent>
                    </Link>
                </Form>
            </Wrapper>
        </Container>
    );
}

export default Login;