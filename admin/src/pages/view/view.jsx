import "./view.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const View = ({type}) => {
    const location = useLocation();
    const viewId = location.pathname.split("/")[2];
    const [ item, setItem ] = useState({});
    let Details;

    const ProductView = () => {
        const products = useSelector((state) => state.product.products);
        useEffect(() => {
            setItem(products[products.findIndex((item) => item._id === viewId)]); 
        },[viewId]);

        Details = [
            {
                key: "Description",
                value: `${item.desc}`
            },
            {
                key: "Category",
                value: `${item.categories}`
            },
            {
                key: "Size",
                value: `${item.size}`
            },
            {
                key: "Color",
                value: `${item.color}`
            },
            {
                key: "Price",
                value: `$${item.price}`
            },
            {
                key: "Stock",
                value: `${item.inStock  ? "Yes" : "No"}`
            },
        ]
    }

    const UserView = () => {
        const users = useSelector(state => state.user.users);
        useEffect(() => {
            setItem(users[users.findIndex((item) => item._id === viewId)]); 
        },[viewId]);

        Details = [
            {
                key: "Username",
                value: `${item.username}`
            },
            {
                key: "Email",
                value: `${item.email}`
            },
            {
                key: "Admin",
                value: `${item.isAdmin ? "Yes" : "No"}`
            },
            {
                key: "Phone",
                value: `${item.phone ? item.phone : ""}`
            },
            {
                key: "City",
                value: `${item.address?.city ? item.address.city : ""}`
            },
            {
                key: "Country",
                value: `${item.address?.country ? item.address.country : ""}`
            },
            {
                key: "Account Created",
                value: `${format(item.createdAt)}`
            },
        ]
    }

    type === "products" ? ProductView() : UserView();

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <Link to={`/${type}/edit/${item._id}`}>
                            <div className="editButton">Edit</div>
                        </Link>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src={item.img ? item.img : "https://image.shutterstock.com/image-vector/photo-camera-icon-600w-419601094.jpg"} alt="Image" className="itemImg"/>
                            <div className="details">
                                <h1 className="itemTitle">{type === "products" ? item.title : item.username}</h1>
                                {Details.map((row) => (
                                    <div className="detailItem" key={row.key}>
                                        <span className="itemkey">{row.key}:</span>
                                        <span className="itemValue">{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart title={type == "products" ? "Item Sold (Last 6 Months)" : "User Spending (Last 6 Months)"} aspect={2/1}/>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    );
}

export default View;  