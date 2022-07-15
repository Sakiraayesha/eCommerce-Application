import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { deleteProduct, deleteUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts, getUsers } from "../../redux/apiCalls";

const Datatable = ({type}) => {
    const dispatch = useDispatch();
    let rows, columns;

    const ProductsData = () => {
        rows = useSelector((state) => state.product.products);

        useEffect(() => {
            getProducts(dispatch);
        },[dispatch]);

        columns = [
            {
                field: "_id",
                headerName: "ID",
                width: 300
            },
            {
                field: "title",
                headerName: "Title",
                width: 300,
                renderCell: (params) => {
                    return (
                        <div className="cellWithImg">
                            <img className="cellImg" src={params.row.img} alt="Product" />
                            {params.row.title}
                        </div>
                    );
                }
            },
            {
                field: "price",
                headerName: "Price",
                width: 120
            },
            {
                field: "inStock",
                headerName: "Stock",
                width: 120
            },
            {
                field: "action",
                headerName: "Action",
                width: 220,
                renderCell: (params) => {
                    return (
                        <div className="cellAction">
                            <Link to={`/${type}/${params.row._id}`} style={{textDecoration: "none"}}>
                                <div className="viewButton">View</div>
                            </Link>
                            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                        </div>
                    );
                }
            }
        ];
    }

    const UsersData = () => {
        rows = useSelector((state) => state.user.users);

        useEffect(() => {
            getUsers(dispatch);
        },[dispatch]);

        columns = [
            {
                field: "_id",
                headerName: "ID",
                width: 300
            },
            {
                field: "username",
                headerName: "Username",
                width: 280,
                renderCell: (params) => {
                    return (
                        <div className="cellWithImg">
                            <img className="cellImg" src={params.row.img ? params.row.img : "https://image.shutterstock.com/image-vector/photo-camera-icon-600w-419601094.jpg"} alt="Product" />
                            {params.row.username}
                        </div>
                    );
                }
            },
            {
                field: "email",
                headerName: "Email",
                width: 160
            },
            {
                field: "isAdmin",
                headerName: "Admin",
                width: 120
            },
            {
                field: "action",
                headerName: "Action",
                width: 200,
                renderCell: (params) => {
                    return (
                        <div className="cellAction">
                            <Link to={`/${type}/${params.row._id}`} style={{textDecoration: "none"}}>
                                <div className="viewButton">View</div>
                            </Link>
                            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                        </div>
                    );
                }
            }
        ];
    }

    type === "products" ? ProductsData() : UsersData();

    const handleDelete = (id) => {
        if(type === "products"){
            deleteProduct(id, dispatch);
        }
        else{
            deleteUser(id, dispatch);
        }
    }

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Product
                <Link to={`/${type}/add`} className="link">Add New</Link>
            </div>
            {rows &&
                <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                />
            }
        </div>
    );
}

export default Datatable;  