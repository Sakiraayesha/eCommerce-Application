import "./table.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { userRequest, publicRequest } from "../../requestMethods";
import { useState, useEffect } from "react";
import { format } from "timeago.js";

const rows = [
    {
        id: "3345612",
        product: "White Shirt",
        img: "https://images.pexels.com/photos/10129697/pexels-photo-10129697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        customer: "Zara",
        date: "6 Jan",
        subtotal: 356,
        method: "COD",
        status: "Approved" 
    },
    {
        id: "1349912",
        product: "Basic T.",
        img: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        customer: "Sarah",
        date: "8 Mar",
        subtotal: 38,
        method: "Online",
        status: "Approved" 
    },
    {
        id: "2345612",
        product: "Midi Dress",
        img: "https://images.pexels.com/photos/8053529/pexels-photo-8053529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        customer: "Zara",
        date: "9 Mar",
        subtotal: 240,
        method: "Online",
        status: "Approved" 
    },
    {
        id: "4575612",
        product: "Basic T.",
        img: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        customer: "John",
        date: "27 May",
        subtotal: 38,
        method: "COD",
        status: "Pending" 
    },
    {
        id: "9045612",
        product: "Gray Tshirt",
        img: "https://images.pexels.com/photos/6311139/pexels-photo-6311139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        customer: "John",
        date: "10 Jun",
        subtotal: 128,
        method: "COD",
        status: "Pending" 
    }
];

const List = ({title, aspect}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try{
                const res = await userRequest.get("/orders?latest=true");
                setOrders(res.data);
            }
            catch(err){
                console.log(err);
            }
        } 
        getOrders();
    },[]);

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Tracking ID</TableCell>
                        {/* <TableCell className="tableCell">Product</TableCell> */}
                        <TableCell className="tableCell">Customer ID</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Subtotal</TableCell>
                        <TableCell className="tableCell">Payment Method</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {orders.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell className="tableCell">{row._id}</TableCell>
                        {/* <TableCell className="tableCell">
                            <div className="cellWrapper">
                                <img src={row.img} alt="Product Image" className="image"/>
                                {row.product}
                            </div>
                        </TableCell> */}
                        <TableCell className="tableCell" align="center">{row.userId}</TableCell>
                        <TableCell className="tableCell" align="center">{format(row.createdAt)}</TableCell>
                        <TableCell className="tableCell" align="center">{row.subtotal.toFixed(2)}</TableCell>
                        <TableCell className="tableCell" align="center">{row.method ? row.method : "Online"}</TableCell>
                        <TableCell className="tableCell">
                            <span className={`status ${row.status}`}>{row.status}</span>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default List;