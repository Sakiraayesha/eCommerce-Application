import styled from "styled-components";
import Navbar from "../components/navbar";
import Announcement from "../components/announcement";
import Footer from "../components/footer";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout"; 
import { useEffect, useState } from 'react';
import { userRequest } from "../requestMethods";
import { useNavigate } from 'react-router-dom';

const Container = styled.div``;
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding: "10px"})}
`;
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;
const Top = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const TopButton = styled.button`
    padding: 10px;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
    ${mobile({display: "none"})}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`;
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection: "column"})}
`;
const Info = styled.div`
    flex: 3;
`;
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    ${mobile({flexDirection: "column"})}
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
    height: 200px;
    object-fit: contain;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bg}
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ProductQuantityContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const ProductQuantity = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    margin-top: 20px;
`;
const SummaryTitle = styled.h1`
    font-weight: 200;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
`;

const KEY = "pk_test_51LIasPByDKKy4jmTIKW7BtO1oE6HmYueTjulxmuPIHkKKNLvfLTn4SPgcB2YZhKGEtEfCfQ8rQLI7NQuN5RNKe9p00y3mIP5Gs";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount:  cart.subtotal * 100
                });
                navigate("/success", {state: { stripeData: res.data, cart: cart }});
            }
            catch(err){
                console.log(err);
            }
        }
        stripeToken && cart.subtotal >= 1 && makeRequest();
    },[stripeToken, cart.subtotal, navigate]);
     
    return(
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Wishlist (1)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product key={product._id}>
                                <ProductDetail>
                                    <Image alt="Image" src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product: </b> {product.title}
                                        </ProductName>
                                        <ProductId>ID: {product._id}</ProductId> 
                                        <ProductColor bg={product.color}/>
                                        <ProductSize>
                                            <b>Size: </b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductQuantityContainer>
                                        <RemoveIcon />
                                        <ProductQuantity>{product.quantity}</ProductQuantity>
                                        <AddIcon />
                                    </ProductQuantityContainer>
                                    <ProductPrice>$ {(product.price * product.quantity).toFixed(2)}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.subtotal}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$3.75</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$3</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.subtotal.toFixed(2)}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="WindowShop."
                            image="https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            billingAddress
                            shippingAddress
                            description={`Your total bill is $  ${cart.subtotal.toFixed(2)}`}
                            amount={cart.subtotal * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECTOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
};

export default Cart;