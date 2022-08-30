import axios from 'axios'
import jwtDecode from 'jwt-decode'

export function hasAuthenticated() {
  const token = sessionStorage.getItem('userToken')
  const result = token ? tokenIsValid(token) : false

  if (false === result) {
    sessionStorage.clear()
  }

  return result
}

export async function login(credentials) {
  return await axios
    .post(`http://localhost:8000/api/auth/login`, credentials)
    .then(response => {
      if (response.status === 200) {
        sessionStorage.setItem('userID', response.data.userId)
        sessionStorage.setItem('userToken', response.data.token)
        sessionStorage.setItem('isAdmin', response.data.isAdmin)
        console.log('===== RES AUTH =====', response);

        return true
      }
    })
    .catch(error => {
      console.log('====== CATCH ======', error)
      
      if (error.response.status === 401) {
        sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert401', activeClassName: 'alert', message: "Ce compte n'existe pas. \n Veuillez essayer avec un email valide ou créez un compte." }))
      }
      if (error.response.status === 418) {
        sessionStorage.setItem('modalParams', JSON.stringify({ id: 'alert418', activeClassName: 'alert', message: "Mot de passe incorrect !" }))
      }
    })
}

export function logout() {
  sessionStorage.clear()
}

function tokenIsValid(token) {
  const { exp: expiration } = jwtDecode(token)

  if (expiration * 1000 > new Date().getTime()) {
    return true
  }

  return false
}