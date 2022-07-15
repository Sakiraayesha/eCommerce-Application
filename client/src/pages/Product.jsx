import styled from 'styled-components';
import Announcement from '../components/announcement';
import Navbar from '../components/navbar';
import Products from '../components/products';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    ${mobile({padding: "10px", flexDirection: "column"})}
`;
const ImgContainer = styled.div`
    flex: 1;
`;
const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({height: "40vh"})}
`;
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    ${mobile({padding: "10px"})}
`;
const Title = styled.h1`
    font-weight: 300;
`;
const Desc = styled.p`
    margin: 20px 0;
`;
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 200;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bg};
    margin: 0 5px;
    cursor: pointer;
`;
const Select = styled.select`
    padding: 5px;
    margin-left: 10px;
    ${mobile({padding: "4px"})}
`;
const Option = styled.option``;
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`;
const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Quantity = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid lightgray;
    background-color: #ffffff;
    cursor: pointer;

    &:hover{
        background-color: #E5E8E8;
    }
`;

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try{
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getProduct();
    },[id]);

    const handleQuantity = (type) => {
        if(type === "inc"){
            setQuantity(quantity + 1);
        }
        else{
            quantity > 1 && setQuantity(quantity - 1);
        }
    };

    const handleClick = () => {
        dispatch(
            addProduct({...product, quantity, color, size})
        );
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} alt="Product Image"/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterText>Color</FilterText>
                            {product.color?.map((c) => (
                                <FilterColor bg={c} key={c} onClick={() => setColor(c)}/>
                            ))}
                        </Filter>
                        <Filter>
                            <FilterText>Size</FilterText>
                            <Select onChange={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => (
                                    <Option key={s}>{s}</Option>
                                ))}
                            </Select>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <QuantityContainer>
                            <RemoveIcon onClick={() => handleQuantity("dec")} />
                            <Quantity>{quantity}</Quantity>
                            <AddIcon onClick={() => handleQuantity("inc")} />
                        </QuantityContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Products />
            <Newsletter />
            <Footer />
        </Container>
    );
}

export default Product;