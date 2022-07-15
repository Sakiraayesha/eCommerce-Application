import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    background-color: #ABB2B9;; 
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`;

const Announcement = () => {
    return (
        <Container>
            NEW ARRIVALS! Get up to 30% off your next order
        </Container>
    )
}

export default Announcement;