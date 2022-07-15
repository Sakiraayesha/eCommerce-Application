import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { resetCart } from "../redux/cartRedux";

const Container = styled.div`
    height: 60px;
    ${mobile({height: "50px"})}
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    ${mobile({padding: "10px 0"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display: "none"})}
`;
const SearchConatiner = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({marginLeft: "5px"})}
`;
const Input = styled.input`
    border: none;
    ${mobile({width: "45px"})}
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;
const Logo = styled.h1`
    font-weight: 700;
    color: #000000;
    ${mobile({fontSize: "20px"})};
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex: "2", justifyContent: "flex-start"})}
`;
const MenuItem = styled.div`
    position: relative;
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    color: #000000;
    ${mobile({fontSize: "12px", marginLeft: "10px"})};
`;
const Counter = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: -5px;
    right: -5px;
`;

const Navbar = () => {
    const user = useSelector((state) => state.user.currentUser);
    const quantity = useSelector(state => state.cart.quantity);
    const logoutDispatch = useDispatch();

    const handleLogOut = () => {
        logoutUser(logoutDispatch);
        logoutDispatch(resetCart());
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchConatiner>
                        <Input placeholder="Search" />
                        <SearchIcon style={{color: "gray", fontSize: 16}}/> 
                    </SearchConatiner>
                </Left>
                <Center>
                    <Link to={"/"} style={{textDecoration:"none"}}>
                        <Logo>WindowShop.</Logo>
                    </Link>
                </Center>
                <Right>
                    {!user ?  
                    <>
                        <Link to={"/register"} style={{textDecoration:"none"}}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link to={"/login"} style={{textDecoration:"none"}}>
                            <MenuItem>SIGN IN</MenuItem>
                        </Link>
                    </>
                    :
                    <>
                        <MenuItem>
                            <ChatBubbleOutlineOutlinedIcon color="action" fontSize="small"/>
                            <Counter>1</Counter>
                        </MenuItem>
                        <MenuItem>
                            <NotificationsNoneOutlinedIcon color="action"/>
                            <Counter>2</Counter>
                        </MenuItem>
                    </>
                    }
                    <Link to="/cart">
                        <MenuItem>
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlinedIcon color="action" />
                        </Badge>
                        </MenuItem>
                    </Link>
                    {user &&
                        <MenuItem>
                            <LogoutIcon color="action" fontSize="small" onClick={handleLogOut}/>
                        </MenuItem>
                    }
                </Right>
            </Wrapper>
        </Container>
    );
}

export default Navbar;