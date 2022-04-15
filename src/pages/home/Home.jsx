import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar></Sidebar>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="student" />
          <Widget type="earning" />
          <Widget type="course" />
        </div>
        <div className="charts">
          <Featured />
          <Chart aspect={2 / 1} title="Last 6 months (Revenue)" />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recently Added Students</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
