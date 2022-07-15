import styled from 'styled-components';
import Navbar from '../components/navbar';
import Announcement from '../components/announcement';
import Footer from '../components/footer';
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest} from "../requestMethods";
import { useState, useEffect } from "react";
import { resetCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
`;
const SuccessWrapper = styled.div`
    width: 100vw;
    height: 40vh;
    display:  flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const OrderStatus = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const PaymentConfirmation = styled.div`
    background-color: #2BBB04;
    color: #ffffff;
    margin: 30px auto 20px auto;
    padding: 15px 20px;
    border-radius: 5px;
`;
const OrderConfirmation = styled.div`
    background-color: #2BBB04;
    color: #ffffff;
    margin: 30px auto 20px auto;
    padding: 15px 20px;
    border-radius: 5px;
`;
const Text = styled.div`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
`;
const Button = styled.div`
    padding: 10px;
    margin: 30px auto;
    background: #2E4053;
    color: #ffffff;
    cursor: pointer;
`;

const Success = () => {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const createOrder = async () => {
            try{
                const res = await userRequest.post("/orders", {
                    userId: currentUser._id,
                    products: cart.products.map((item) => (
                        {
                            productId: item._id,
                            quantity: item._quantity
                        }
                    )),
                    subtotal: cart.subtotal,
                    address: data.billing_details.address
                });
                setOrderId(res.data._id);
                dispatch(
                    resetCart()
                );
            }
            catch(err){
                console.log(err);
            }
        };
        data && createOrder();
    },[data, cart, currentUser]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <SuccessWrapper>
                {!orderId ? 
                    <OrderStatus>    
                        <PaymentConfirmation>PAYMENT SUCCESSFUL</PaymentConfirmation>
                        <Text>Your order is being processed...</Text>
                    </OrderStatus>
                    :
                    <OrderStatus>
                        <OrderConfirmation>ORDER CONFIRMED</OrderConfirmation>
                        <Text> Your order ID is {orderId}. Thanks for choosing WindowShop!</Text> 
                    </OrderStatus>
                }
                <Link to="/" style={{textDecoration: "none"}}>
                    <Button>Go to Homepage</Button>
                </Link>
            </SuccessWrapper>
            <Footer />
        </Container>
    );
}

export default Success;