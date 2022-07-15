import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './categoryItem';
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    ${mobile({padding: "0", flexDirection: "column"})}
`;

const Categories = () => {
    return (
        <Container>
            {categories.map((item) => (
                <CategoryItem key={item.id} item={item} />
            ))}
        </Container>
    );
}

export default Categories;