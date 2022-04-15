import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useEffect, useState } from "react";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { Collections, KeyboardArrowDown } from "@mui/icons-material";
import { db } from "../../firebase";

const Widget = ({ type }) => {
  let data;

  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);


  switch (type) {
    case "student":
      data = {
        title: "STUDENTS",
        counter: "100",
        link: "All Students",
        isMoney: false,
        icon: (
          <PeopleIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        counter: "15000",
        link: "View net earning",
        isMoney: true,
        icon: (
          <AccountBalanceWalletIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "course":
      data = {
        title: "COURSES",
        isMoney: false,
        counter: "20",
        link: "All Courses",
        icon: (
          <LibraryBooksIcon
            className="icon"
            style={{
              color: "#303f9f",
              backgroundColor: "RGBA(48,63,159,0.3)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(Collections(db, "students"), where("timeStamp", "<=", today), where("timeStamp", ">", lastMonth));
      const preMonthQuery = query(Collections(db, "students"), where("timeStamp", "<=", lastMonth), where("timeStamp", ">", prevMonth));

      const lastMonthData = await getDoc(lastMonthQuery);
      const preMonthData = await getDocs(preMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff((lastMonthData.docs.length - prevMonth.docs.length) / (preMonthData.docs.length) * 100)

    };
    fetchData();
  }, [])
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₹"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${diff < 0 ? "negative" : "positive"}`}>
          {diff < 0 ? <KeyboardArrowDown /> : <KeyboardArrowUpIcon />}
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
