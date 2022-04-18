import Datatable from "../../components/datatable/Datatable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./student.scss";
import studentColumns from "./student-columns";
import { useState, useEffect } from "react";
import { onSnapshot, deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Student = () => {
  const [data, setData] = useState([]);
  const entity = "students";

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
  return <div className="student">
    <Sidebar />
    <div className="studentContainer">
      <Navbar />
      <Datatable
        entity={entity}
        columns={studentColumns}
        rows={data}
        deleteRow={handleDelete}
        rowHeight={50}
      />
    </div>
  </div>;
};

export default Student;
