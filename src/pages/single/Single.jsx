import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./single.scss";
import { Avatar } from "@mui/material";
import Chart from "../../components/chart/Chart";

import Table from "../../components/table/Table"

const Single = () => <div className="single">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
      <div className="top">
        <div className="left">
          <div className="editButton">Edit</div>
          <h1 className="title">Information</h1>
          <div className="item">
            <Avatar src="https://i.pravatar.cc" sx={{
              width: "200px",
              height: "200px",
              marginTop: "4 0px"
            }} />
            <div className="details">
              <h1 className="itemTitle">Jane Doe</h1>
              <div className="detailItem">
                <span className="itemKey">Email: </span>
                <span className="itemValue">janedoe@gmail.com</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Phone: </span>
                <span className="itemValue">9878674534</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Course:</span>
                <span className="itemValue">PGDCA</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Duration:</span>
                <span className="itemValue">6 Months</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Date Of Joining:</span>
                <span className="itemValue">01-09-2022</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Date Of Leaving:</span>
                <span className="itemValue">01-12-2022</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Address:</span>
                <span className="itemValue">Vikas Nagar Colony Jalalpur Ambedkar Nagar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Chart aspect={3 / 1} title="Performance" />
        </div>
      </div>
      <div className="bottom">
        <h1 className="title">Fees History</h1>
        <Table />
      </div>
    </div>
  </div>;

export default Single;
