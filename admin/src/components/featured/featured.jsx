import "./featured.scss";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Featured = () => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Statistics</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={66} text={"66%"} strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$578</p>
                <p className="desc">
                    Previous transactions processing. Last payments may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <ArrowUpwardIcon fontSize="small"/>
                            <div className="resultAmount">$15k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult negative">
                            <ArrowDownwardIcon fontSize="small"/>
                            <div className="resultAmount">$11.8k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <ArrowUpwardIcon fontSize="small"/>
                            <div className="resultAmount">$15.3k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;