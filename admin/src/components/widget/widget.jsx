import "./widget.scss";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const Widget = ({type}) => {
    const [ currentNumbers, setCurrentNumbers ] = useState([]);
    const [ percentage, setPercentage ] = useState(0);
    let widgetData;

    const UserWidget = () => {
        useEffect(() => {
            const getCurrentNumbers = async () => {
                try{
                    const res =  await userRequest("/users/stats");
                    setCurrentNumbers(res.data);
                    setPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
                }
                catch(err){
                    console.log(err);
                }
            }
            getCurrentNumbers();
        },[]);

        widgetData = {
            title: "USERS",
            isCurrency: false,
            link: "See all users",
            icon: (
                <PersonOutlineOutlinedIcon className="icon"
                    style={{color:"#990000", backgroundColor:"#ffbfbf"}}
                />
            )
        }
    }

    const OrderWidget = () => {
        useEffect(() => {
            const getCurrentNumbers = async () => {
                try{
                    const res =  await userRequest("/orders/stats");
                    setCurrentNumbers(res.data);
                    setPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
                }
                catch(err){
                    console.log(err);
                }
            }
            getCurrentNumbers();
        },[]);

        widgetData = {
            title: "ORDERS",
            isCurrency: false,
            link: "View all orders",
            icon: (
                <LocalMallIcon className="icon"
                    style={{color:"#DAA520", backgroundColor:"#fff6c9"}}
                />
            )
        }
    }

    const RevenueWidget = () => {
        useEffect(() => {
            const getCurrentNumbers = async () => {
                try{
                    const res =  await userRequest("/orders/sale");
                    setCurrentNumbers(res.data);
                    setPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
                }
                catch(err){
                    console.log(err);
                }
            }
            getCurrentNumbers();
        },[]);

        widgetData = {
            title: "REVENUE",
            isCurrency: true,
            link: "View net revenue",
            icon: (
                <MonetizationOnOutlinedIcon className="icon"
                    style={{color:"#006600", backgroundColor:"#bfffbf"}}
                />
            )
        }
    }

    type === "users" ?  UserWidget() : type === "orders" ? OrderWidget() : RevenueWidget();

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{widgetData.title}</span>
                <span className="counter">{widgetData.isCurrency && "$"}{currentNumbers[0]?.total}</span>
                <span className="comparison">{percentage < 0 ? "Decreased " : "Incresed "} by {Math.floor(percentage)}% from last month</span>
                <span className="link">{widgetData.link}</span>
            </div>
            <div className="right">
                <div className={percentage > 0 ? "percentage positive" : percentage == 0 ? "percentage" : "percentage negative"}>
                    { percentage > 0 && <ArrowUpwardIcon />}
                    { percentage < 0 && <ArrowDownwardIcon />}
                    {Math.floor(percentage)}%
                </div>
                {widgetData.icon}
            </div>
        </div>
    );
}

export default Widget;