import Navbar from "../components/Navbar"
import SendPost from "../components/SendPost"
import '../styles/Dashboard.css'

export default function Dashbord() {
  return (
    <div className="Dashboard">
      <Navbar />
      <h2>Partagez un message avec vos collègues.</h2>
      <SendPost />
    </div>
  )
}
