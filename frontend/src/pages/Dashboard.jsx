import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/Dashboard.css'

export default function Dashbord() {
  const params = useParams()
  console.log(params);
  return (
    <div className="Dashboard">
      <Navbar />
      <h2>Dashboard</h2>
    </div>
  )
};
