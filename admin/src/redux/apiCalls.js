import { loginStart, loginSuccess, loginFailed, logout,
        getUsersStart, getUsersSuccess, getUsersFailed,
        addUserStart, addUserSuccess, addUserFailed,
        updateUserStart, updateUserSuccess, updateUserFailed,
        deleteUserStart, deleteUserSuccess, deleteUserFailed } from "./userRedux";
import { getProductStart, getProductSuccess, getProductFailed,
        addProductStart, addProductSuccess, addProductFailed,
        updateProductStart, updateProductSuccess, updateProductFailed, 
        deleteProductStart, deleteProductSuccess, deleteProductFailed } from "./productRedux";
import { publicRequest, userRequest } from "../requestMethods";


//AUTHORIZATION
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch) => {
    dispatch(logout());
};


//USERS
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try{
        const res = await userRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    }
    catch(err){
        dispatch(getUsersFailed());
    }
};

export const addUser = async (user, dispatch) => {
    dispatch(addUserStart());
    try{
        const res = await userRequest.post("/users", user);
        dispatch(addUserSuccess(res.data));
    }
    catch(err){
        dispatch(addUserFailed());
    }
};

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try{
        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserSuccess({id, user}));
    }
    catch(err){
        dispatch(updateUserFailed());
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try{
        const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    }
    catch(err){
        dispatch(deleteUserFailed());
    }
};


//PRODUCTS
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try{
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    }
    catch(err){
        dispatch(getProductFailed());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try{
        const res = await userRequest.post("/products", product);
        dispatch(addProductSuccess(res.data));
    }
    catch(err){
        dispatch(addProductFailed());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try{
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({id, product}));
    }
    catch(err){
        dispatch(updateProductFailed());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try{
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    }
    catch(err){
        dispatch(deleteProductFailed());
    }
};
