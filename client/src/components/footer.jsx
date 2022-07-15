import styled from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 10px 5px;
    ${mobile({flexDirection: "column"})}
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
    margin: 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #ffffff;
    background-color: #${(props) => props.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
`;
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({display: "none"})}
`;
const Title = styled.h3`
    margin-bottom: 30px;
`;
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`;
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({backgroundColor: "#F4F6F6"})}
`;
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;
const Payment = styled.img`
    width: 50%;
    cursor: pointer;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>WindowShop.</Logo>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Desc>
                <SocialContainer>
                    <SocialIcon bg="3B5999">
                        <InstagramIcon />
                    </SocialIcon>
                    <SocialIcon bg="E4405F">
                        <PinterestIcon />
                    </SocialIcon>
                    <SocialIcon bg="55ACEE">
                        <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon bg="E60023">
                        <TwitterIcon />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Women's Fashion</ListItem>
                    <ListItem>Men's Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Track Order</ListItem>
                    <ListItem>Terms & Conditions</ListItem>
                    <ListItem>Career</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <LocationOnIcon style={{marginRight: "10px"}}/>
                    3914 Circle Drive, Baytown, TX
                </ContactItem>
                <ContactItem>
                    <LocalPhoneIcon style={{marginRight: "10px"}}/>
                    +123 456 7890
                </ContactItem>
                <ContactItem>
                    <EmailIcon style={{marginRight: "10px"}}/>
                    contact@windowshop.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
            </Right>
        </Container>
    );
}

export default Footer;