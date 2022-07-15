import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import List from "./pages/list/list";
import Login from "./pages/login/login";
import EditProduct from "./pages/editProduct/editProduct";
import EditUser from "./pages/editUser/editUser";
import View from "./pages/view/view";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/darkMode.scss";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={admin ? <Home/> :  <Navigate to="/login"/>} />
            <Route path="login" element={admin ? <Navigate to="/"/> : <Login/>} />
            <Route path="users">
              <Route index element={admin ? <List type="users" /> : <Navigate to="/login"/>} />
              <Route path=":userId" element={admin ?<View type="users"/> : <Navigate to="/login"/>} />
              <Route path="edit/:userId" element={admin ?<EditUser type="update" /> : <Navigate to="/login"/>} />
              <Route path="add" element={admin ?<EditUser /> : <Navigate to="/login"/>} />
            </Route>
            <Route path="products">
              <Route index element={admin ? <List type="products" /> : <Navigate to="/login"/>} />
              <Route path=":productId" element={admin ? <View type="products"/> : <Navigate to="/login"/>} />
              <Route path="edit/:productId" element={admin ? <EditProduct type="update" /> : <Navigate to="/login"/>} />
              <Route path="add" element={admin ? <EditProduct /> : <Navigate to="/login"/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
