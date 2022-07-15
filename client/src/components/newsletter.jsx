import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { mobile } from "../responsive";

const Container = styled.div`
    height: 60vh;
    background-color: #BDC3C7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.div`
    font-size: 70px;
    margin-bottom: 20px;
`;
const Desc = styled.div`
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 300;
    ${mobile({textAlign: "center"})}
`;
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    border: 1px solid rgba(151, 154, 132, 0.70);
    ${mobile({width: "80%"})}
`;
const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;

    &:focus {
        outline: none;
    }
`;
const Button = styled.button`
    border: none;
    flex: 1;
    color: #ffffff;
    background-color: #212F3C;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Desc>Stay updated on your favorite products!</Desc>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                    <SendIcon />
                </Button>
            </InputContainer>
        </Container>
    );
}

export default Newsletter;