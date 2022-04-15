import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name + new Date());
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, profileImage: downloadURL }))
          });
        }
      );

    };
    file && uploadFile();
  }, [file])

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // Add a new document in collection "students"
      await setDoc(doc(db, "students", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp()
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  return <div className="new">
    <Sidebar></Sidebar>
    <div className="newContainer">
      <Navbar></Navbar>
      <div className="top">
        <h1 className="title">{title}</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt=" " />
        </div>
        <div className="right">
          <form onSubmit={handleAdd}>
            <div className="formInput">
              <label htmlFor="file">Image: <DriveFolderUploadOutlined className="icon" /> </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            {inputs.map(input => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} />
              </div>
            ))}
            <button disabled={percentage < 100} type="submit">Send</button>
          </form></div>
      </div>
    </div>
  </div>;
};

export default New;
