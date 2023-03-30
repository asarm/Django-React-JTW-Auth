import {React, useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
    let {user, logout} = useContext(AuthContext)
    console.log(user)

    return(
            <div>
                <Link to="/">Home</Link>
                <span>  | </span>
                { user ?
                    (
                            <span onClick={logout}>Logout</span>
                            ) : <Link to="/login">Login</Link>
                }

                {user && <p>Hello {user.username}</p>}
            </div>
    )
}

export default Header;