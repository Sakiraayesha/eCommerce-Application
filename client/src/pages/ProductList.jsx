import styled from 'styled-components';
import Announcement from '../components/announcement';
import Navbar from '../components/navbar';
import Products from '../components/products';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``;
const Title = styled.h1`
    margin: 20px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div`
    margin: 20px;
    ${mobile({margin: "0px 20px", display: "flex", flexDirection: "column"})}
`;
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 700;
    margin-right: 20px;
    ${mobile({marginRight: "0"})}
`;
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({margin: "10px 0px"})}
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("latest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters(
            {
                ...filters,
                [e.target.name]: value
            }
        );
    };

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option>Black</Option>
                        <Option>White</Option>
                        <Option>Gray</Option>
                        <Option>Navy</Option>
                        <Option>Beige</Option>
                        <Option>Pastel</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="latest">Latest</Option>
                        <Option value="popular">Popular</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    );
}

export default ProductList;