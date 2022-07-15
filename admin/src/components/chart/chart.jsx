import "./chart.scss";
import {AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { useEffect, useState, useMemo } from "react";
import { userRequest } from "../../requestMethods";

const Chart = ({title, aspect}) => {
    const [ stats, setStats ] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    );

    useEffect(() => {
        setStats([]); 
        const getStats = async () => {
            try{
                const res = await userRequest.get("/orders/sale");
                res.data.map((item) =>
                    setStats((prev) => [
                        { "name": MONTHS[item._id - 1], "total" : item.total },
                        ...prev,
                    ]) 
                );
            }
            catch(err){
                console.log(err);
            }
        };
        getStats(); 
    },[MONTHS]); 

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart width={730} height={250} data={stats}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray"/>
                    <CartesianGrid strokeDasharray="3 3" className="chartGrid"/>
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;