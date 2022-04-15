import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const List = () => {
  return <div className="list">
    <Sidebar></Sidebar> 
    <div className="listContainer">
      <Navbar></Navbar>
      <Datatable></Datatable>
    </div>
  </div>;
};

export default List;
