import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/PersonalPosts.css'

export default function PersonalPosts() {
  const params = useParams()
  console.log(params);
  return (
    <div className="PersonalPosts">
      <Navbar />
      <h2>Mes Posts</h2>
    </div>
  )
};
