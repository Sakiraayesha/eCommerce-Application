import "./editUser.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";
import { addUser, updateUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const EditUser = ({type}) => {
    const [file, setFile] = useState(null);
    const [inputs, setInputs] = useState(null);
    const [ update, setUpdate ] = useState(false);
    const [address, setAddress] = useState({});
    const dispatch = useDispatch();

    const ExistingUser = () => {
        const CryptoJS = require("crypto-js");
        const location = useLocation();
        const uId = location.pathname.split("/")[3];
        const users = useSelector((state) => state.user.users);
        const userData = users[users.findIndex((item) => item._id === uId)];
        const originalPassword = (CryptoJS.AES.decrypt(userData.password, process.env.REACT_APP_CRYPTO_KEY)).toString(CryptoJS.enc.Utf8);
        useEffect(() => {
            setInputs({...userData, password : originalPassword}); 
            setAddress(userData?.address);
        },[uId]);
    }

    type === "update" && ExistingUser();

    const handleAddress = (e) => {
        setAddress((prev) => {
            return {...prev, [e.target.name] : e.target.value };
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
                    const user = {...inputs, address, img : downloadURL};
                    if(type === "update"){
                        updateUser(inputs._id, user, dispatch);
                        setInputs(user); 
                    }
                    else{
                        addUser(user, dispatch);
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
            const user = {...inputs, address};
            updateUser(inputs._id, user, dispatch);
            setInputs(user); 
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
                <div className="updatsuccessText">User has been {type === "update"? "updated " : "added "} successfully.</div>
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
                    <h1>{type == "update" ? "Edit " : "Add New "} User</h1>
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
                                    <label>Username</label>
                                    <input type="text" placeholder="Username" name="username" defaultValue={type === "update" ? inputs?.username : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Email</label>
                                    <input type="email" placeholder="Email" name="email" defaultValue={type === "update" ? inputs?.email : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Password</label>
                                    <input type="password" placeholder="Password" name="password" defaultValue={type === "update" ? inputs?.password : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>City</label>
                                    <input type="text" placeholder="City" name="city" defaultValue={type === "update" && inputs?.address ? inputs?.address.city : ""} onChange={handleAddress} />
                            </div>
                            <div className="formInput">
                                    <label>Country</label>
                                    <input type="text" placeholder="Country" name="country" defaultValue={type === "update" && inputs?.address ? inputs?.address.country : ""} onChange={handleAddress} />
                            </div>
                            <div className="formInput">
                                    <label>Phone</label>
                                    <input type="text" placeholder="Phone" name="phone" defaultValue={type === "update" ? inputs?.phone : ""} onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                    <label>Admin</label>
                                    <select name="isAdmin" onChange={handleChange} defaultValue={type === "update" ? inputs?.isAdmin : "false"}>
                                        <option value="false">No</option>
                                        <option value="true" selected={type === "update" && inputs?.isAdmin}>Yes</option>
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

export default EditUser;