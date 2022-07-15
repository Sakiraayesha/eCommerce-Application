import styled from 'styled-components';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from "react-router-dom";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(112, 123, 124, 0.37);
    display: flex;
    align-items: center;
    justify-content: center;
    cusror: pointer;
    transition: all 0.5s ease;
`;
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F2F4F4;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;
const Image = styled.img`
    height: 75%;
    z-index: 2;
    max-width: 65%;
    object-fit: cover;
`;
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;

    &:hover {
        background-color: #A6ACAF;
        transform: scale(1.1);
    }
`;

const Product = ({item}) => {
    return (
        <Container>
           <Image src={item.img} alt="Image" />
           <Info>
                <Icon>
                    <ShoppingCartOutlinedIcon />
                </Icon>
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <SearchOutlinedIcon />
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorderOutlinedIcon />
                </Icon>
           </Info>
        </Container>
    );
}

export default Product;