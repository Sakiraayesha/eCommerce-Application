import "./home.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Widget from "../../components/widget/widget";
import Featured from "../../components/featured/featured";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar/>
                <div className="widgets">
                    <Widget type="users" />
                    <Widget type="orders" />
                    <Widget type="revenue" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Last 6 Months (Revenue)" aspect={2/1} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <List />
                </div>
            </div>
        </div>
    );
}

export default Home;