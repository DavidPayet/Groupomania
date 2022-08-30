import { useContext } from "react"
import { Navigate } from "react-router-dom"
import Auth from "../contexts/Auth"

export default function AuthenticatedRoute({ children }) {
  const { isAuthenticated } = useContext(Auth)

  return isAuthenticated ? children : <Navigate to='/' />
}
