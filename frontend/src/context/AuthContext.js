import {createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    // let [user, setUser] = useState(null);
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();

        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value, 'password': e.target.password.value
            })
        })
        let data = await response.json()

        if (response.status == 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/");
        }else{
            alert("Something went wrong!")
        }
    }

    let logout = () => {
         setAuthTokens(null);
         setUser(null);
         localStorage.removeItem('authTokens')
         navigate('/login')
    }

    let updateToken = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh':authTokens.refresh
            })
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logout();
        }
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logout: logout,
    }

    useEffect(() => {
        let interval = setInterval(() => {
            if(authTokens){
                updateToken();
            }
        }, 1.8e+6)
        return ()=>clearInterval(interval);
    }, [authTokens, loading]
    )

    return(
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
    )
}