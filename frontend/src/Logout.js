import { useHistory } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem('token')
    window.location.replace("/");
    return ( 
        <div className="logout">
            <h1>Logging you out</h1>
        </div>
     );
}
 
export default Logout;