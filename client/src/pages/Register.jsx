import styled from 'styled-components';
import { useState } from 'react';
import { publicRequest } from "../requestMethods";
import { useNavigate } from "react-router";
import { mobile } from "../responsive";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display:  flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0)),url("https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center;
    background-size: cover;
`;
const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
`;
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;

    &:focus {
        outline: none;
    }
`;
const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #2E4053;
    color: #ffffff;
    cursor: pointer;
`;

const Register = () => {
    const [address, setAddress] = useState({});
    const [inputs, setInputs] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await publicRequest.post("/auth/register", {...inputs, address});
            navigate("/login");
        }
        catch(err){
            console.log(err);
        }
    };

    const handleAddress = (e) => {
        setAddress((prev) => {
            return {...prev, [e.target.name] : e.target.value };
            }
        );
    }

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name] : e.target.value };
            }
        );
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Username" type="text" name="username" onChange={handleChange} />
                    <Input placeholder="Email" type="email" name="email" onChange={handleChange} />
                    <Input placeholder="City" type="text" name="city" onChange={handleAddress} />
                    <Input placeholder="Country" type="text" name="country" onChange={handleAddress} />
                    <Input placeholder="Phone" type="text" name="phone" onChange={handleChange} />
                    <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
                    <Agreement>By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY.</b></Agreement>
                    <Button type="submit">CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    );
}

export default Register;