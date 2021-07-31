import { useEffect, useState } from "react";
import UserPosts from "./components/UserPosts";
import Users from "./components/Users";
import axios from "axios";
const Account = ({auth}) => {
    const [type,setType] = useState('all')
    const [o1,setO1] = useState({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
    const [o2,setO2] = useState({color:"var(--secondary)",bor:"none"})
    const [o3,setO3] = useState({color:"var(--secondary)",bor:"none"})
    const [image,setImage] = useState('')
    const [img,setImg] = useState('')
    useEffect(()=>{
        if (auth.user != null){
            const get_image = axios({
                method:'GET',
                url:`http://localhost:1337/users/${auth.user.id}`
            }).then(response=>{setImage(`http://localhost:1337${response.data.image.url}`)})
        }
    },[auth])
    useEffect(()=>{

        if(type==="all"){
            setO1({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO2({color:"var(--secondary)",bor:"none"})
            setO3({color:"var(--secondary)",bor:"none"})
        }
        else if(type==="image"){
            setO3({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO2({color:"var(--secondary)",bor:"none"})
            setO1({color:"var(--secondary)",bor:"none"})
        }
        else if(type==="text"){
            setO2({color:"var(--primary)",bor:"0px -1px 0px var(--primary) inset"})
            setO3({color:"var(--secondary)",bor:"none"})
            setO1({color:"var(--secondary)",bor:"none"})
        }
        

    },[type])
    useEffect(()=>{
        if(img){

            const data = {image:img}
            const update_image = axios({
                method:'PUT',
                url:`http://localhost:1337/users/${auth.user.id}`,
                data:data,
                headers: { Authorization: `Bearer ${auth.token}` }
            })
        }
    },[img])
    const handleClick = ()=>{
        const input = document.querySelector('.inp')
        input.click()
    }
    const handleChange = (e) =>{	
        const data = new FormData();
		data.append("files",e.target.files[0]);
        const upload_img = axios({
            method:'POST',
            url:'http://localhost:1337/upload',
            data,
            headers: { Authorization: `Bearer ${auth.token}` }
        })
        .then(response =>{
            
            setImg(response.data[0])
        })
	}
    return ( 
        <div className="main">
            <div className="left">
                <div className="profile">
                    <div className="userimage">
                        <img src={image} style={{borderRadius:'100%', height:'110px',width:'110px'}} alt="" />

                        <svg className="edit" onClick={handleClick} preserveAlpha viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.678 0H12.8879C6.20251 0 0.782959 5.53609 0.782959 12.3652V12.3665C0.782959 19.1956 6.20251 24.7317 12.8879 24.7317H13.678C20.3634 24.7317 25.783 19.1956 25.783 12.3665V12.3652C25.783 5.53609 20.3634 0 13.678 0Z" fill="#2BA7F3"/>
<path d="M20.1207 6.94753L18.7357 5.53782C18.4313 5.22751 18.0188 5.05322 17.5888 5.05322C17.1587 5.05322 16.7463 5.22751 16.4419 5.53782L6.14483 16.0575C6.08124 16.1232 6.03819 16.2068 6.02118 16.2975L5.32869 20.1148C5.31543 20.1878 5.31975 20.263 5.34128 20.3338C5.36281 20.4047 5.40091 20.4692 5.45228 20.5217C5.50365 20.5741 5.56675 20.613 5.63613 20.635C5.70552 20.657 5.7791 20.6614 5.85053 20.6479L9.58748 19.9405C9.67632 19.9231 9.7581 19.8792 9.82243 19.8142L20.1207 9.2945C20.272 9.14063 20.392 8.95776 20.4739 8.75638C20.5558 8.555 20.598 8.33908 20.598 8.12101C20.598 7.90294 20.5558 7.68702 20.4739 7.48564C20.392 7.28426 20.272 7.10139 20.1207 6.94753V6.94753ZM6.32785 19.6285L6.74581 17.3182L8.58832 19.2003L6.32785 19.6285ZM9.50587 18.8454L7.09329 16.3809L15.9002 7.38332L18.3128 9.85282L9.50587 18.8454ZM19.4876 8.64902L18.9459 9.20229L16.5334 6.73784L17.075 6.18962C17.2115 6.05085 17.3962 5.97295 17.5888 5.97295C17.7814 5.97295 17.9661 6.05085 18.1026 6.18962L19.4863 7.60311C19.6211 7.742 19.6969 7.92959 19.6971 8.12517C19.6973 8.32076 19.622 8.50854 19.4876 8.64776V8.64902Z" fill="white"/>
</svg>
                        <input className='inp' onChange={handleChange} type="file" style={{display:'none'}} />
                    </div>
                    <div className="info">
                        <div className="username">

                            {auth.user.username}
                        </div>
                        <div className="email">

                            {auth.user.email}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="middle">
                <div className="container">
                    <div className="header">
                        <div className="p">Posts</div>
                        <div className="options">
                            <div className="o1 o" onClick={()=>{setType('all');}} style={{color:o1.color,boxShadow:o1.bor}}>All</div>
                            <div className="o2 o" onClick={()=>{setType('text');}} style={{color:o2.color,boxShadow:o2.bor}}>Text</div>
                            <div className="o3 o" onClick={()=>{setType('image');}} style={{color:o3.color,boxShadow:o3.bor}}>Images</div>
                        </div>
                    </div>
                    <UserPosts type={type} auth={auth}/>
                </div>
            </div>
            <div className="right">
                <Users/>
            </div>
        </div>
         );
}
 
export default Account;