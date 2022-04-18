import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./course.scss";
import courseColumns from "./course-columns";
import { useState, useEffect } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const Course = () => {
  const [data, setData] = useState([]);
  const entity = "courses";

  useEffect(() => {
    // LISTEN(REALTIME)
    const unsub = onSnapshot(collection(db, entity), (snapshot) => {
      const list = [];
      snapshot.docs.forEach((doc) => list.push({ id: doc.id, ...doc.data() }))
      setData(list)
    }, (error) => {
      console.log(error)
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, entity, id));
    setData(data.filter(item => item.id !== id))
  }


  return <div className="course">
    <Sidebar />
    <div className="courseContainer">
      <Navbar />
      <Datatable
        entity={entity}
        columns={courseColumns}
        rows={data}
        deleteRow={handleDelete}
      />
    </div>
  </div>;
};

export default Course;
