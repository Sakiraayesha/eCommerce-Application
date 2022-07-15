import "./editProduct.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { addProduct, updateProduct } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const EditProduct = ({type}) => {
    const [file, setFile] = useState(null);
    const [arrInputs, setArrInputs] = useState(null);
    const [inputs, setInputs] = useState(null);
    const [ update, setUpdate ] = useState(false);
    const dispatch = useDispatch();

    const ExistingProduct = () => {
        const location = useLocation();
        const pId = location.pathname.split("/")[3];
        const products = useSelector((state) => state.product.products);
        useEffect(() => {
            setInputs(products[products.findIndex((item) => item._id === pId)]); 
        },[pId]);
    }

    type === "update" && ExistingProduct();

    const handleArrInputs = (e) => {
        setArrInputs((prev) => {
            return { ...prev, [e.target.name] : e.target.value.split(",") };
            }
        );
    }

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name] : e.target.value };
            }
        );
    }

    const handleClick = (e) => {
        e.preventDefault();

        if(file){
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const product = {...inputs, ...arrInputs, img : downloadURL};
                    if(type === "update"){
                        updateProduct(inputs._id, product, dispatch);
                        setInputs(product); 
                    }
                    else{
                        addProduct(product, dispatch);
                        setFile(null);
                    }
                    setUpdate(true);
                    setTimeout(() => {
                        setUpdate(false);
                    }, 3000);
                    document.getElementById("productForm").reset();
                });
                }
            );
        }
        else if(type === "update"){
            const product = {...inputs, ...arrInputs};
            updateProduct(inputs._id, product, dispatch);
            setInputs(product); 
            setUpdate(true);
            setTimeout(() => {
                setUpdate(false);
                }, 3000);
            document.getElementById("productForm").reset();
        }
    }

    const notifyUpdateDOM = () => {
        return (
            <div className="updateSuccessWrapper">
                <div className="updatsuccessText">Product has been {type === "update"? "updated " : "added "} successfully.</div>
            </div>
        );
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar/>
                {update? notifyUpdateDOM() : null}
                <div className="top">
                    <h1>{type == "update" ? "Edit " : "Add New "} Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file) : inputs?.img ? inputs.img : "https://image.shutterstock.com/image-vector/photo-camera-icon-600w-419601094.jpg"} alt="Image"/>
                    </div>
                    <div className="right">
                        <form id="productForm">
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input type="file" id="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <div className="formInput">
                                    <label>Title</label>
                                    <input type="text" placeholder="Product Title" name="title" defaultValue={type === "update" ? inputs?.title : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Description</label>
                                    <input type="text" placeholder="Product Description" name="desc" defaultValue={type === "update" ? inputs?.desc : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Category</label>
                                    <input type="text" placeholder="Product Category" name="categories" defaultValue={type === "update" ? inputs?.categories : ""} onChange={handleArrInputs} />
                            </div>
                            <div className="formInput">
                                    <label>Size</label>
                                    <input type="text" placeholder="Product Size" name="size" defaultValue={type === "update" ? inputs?.size : ""} onChange={handleArrInputs} />
                            </div>
                            <div className="formInput">
                                    <label>Color</label>
                                    <input type="text" placeholder="Product Color" name="color" defaultValue={type === "update" ? inputs?.color : ""} onChange={handleArrInputs} />
                            </div>
                            <div className="formInput">
                                    <label>Price</label>
                                    <input type="number" placeholder="Product Price" name="price" defaultValue={type === "update" ? inputs?.price : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Stock</label>
                                    <select name="inStock" onChange={handleChange}  defaultValue={type === "update" ? inputs?.inStock : "true"}>
                                        <option value="true">Yes</option>
                                        <option value="false" selected={type === "update" && !inputs?.inStock}>No</option>
                                    </select>
                            </div>
                            <button type="submit" onClick={handleClick}>{type == "update" ? "Update" : "Add"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;