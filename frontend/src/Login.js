import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {
    const [user,setUser] = useState(null);
    useEffect(() =>{
        console.log("this ran")
        
        setUser("gae")
    },[])
    
    const handleSubmit = (e) =>{
        e.preventDefault()
		const post = {}
    } 
    return (  
        <div className="login">
            <form onSubmit={handleSubmit}></form>
        </div>
    );
}
 
export default Login;