import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Create = ({auth}) => {
	const history = useHistory();

	const [c1,setC1] = useState('var(--primary)')
	const [c2,setC2] = useState('white')
	const [image,setImage] = useState(false)
	
	const [type,setType] = useState('text');
	const [title,setTitle] = useState('')
	const [content,setContent] = useState('')
	const [file,setFile] = useState('')
	const [img,setImg] = useState('')

	useEffect(()=>{
		if (image){
			setType('image');
			setC2('var(--primary)');
			setC1('white');
		}
		else if (!image){
			setType('text');
			setC1('var(--primary)');
			setC2('white');
		}
	},[image])
	
	useEffect(()=>{
		if (img !== ''){

			const postData = {
				title:title,
				type:type,
				image:img
			}
			console.log(postData)
			const create_post = axios({
				method:'POST',
				url:'http://localhost:1337/posts',
				data:postData,
				headers: { Authorization: `Bearer ${auth.token}` }
			}).then(response=>{console.log(response);history.push('/');}).catch(err=>{console.log(err)})
		}
	},[img])
	
	const handleSubmit = (e) =>{
		e.preventDefault();
		if(image){
			const data = new FormData();
			data.append("files",file);
			const upload_res = axios({
				method:'POST',
				url:'http://localhost:1337/upload',
				data,
				headers: { Authorization: `Bearer ${auth.token}` }
			})
			.then(response =>{
				
				setImg(response.data[0])
				
			})
		}
		else if(!image){
			const postData = {
				title:title,
				type:type,
				content:content
			}
			const create_post = axios({
				method:'POST',
				url:'http://localhost:1337/posts',
				data:postData,
				headers: { Authorization: `Bearer ${auth.token}` }
			}).then(response=>{console.log(response);history.push('/');}).catch(err=>{console.log(err)})


		}
	}

	

	const handleChange = (e) =>{
		
		setFile(e.target.files[0]);	
	}
	
    return ( 
        <div className="create">
            <div className="cont">
				<div className="h">Create Post</div>
				<form className='createField' onSubmit={handleSubmit}>
					<div className="left">

						<div className="field">
							<div className="text">Title</div>
							<input className='titleField' type="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder='Your Title' required/>
						</div>
						{image ? <div className="field">
							<div className="text">Upload Image</div>
							<div className="imageField">

							<input style={{ fontSize: '18px' }} type="file" onChange={handleChange} />
							</div>
							
						</div>:
						<div className="field">
						<div className="text">Content</div>
						<textarea className='contentField' value={content} onChange={(e) => {setContent(e.target.value)}} placeholder='Your Content'/>
						</div>
						}
						<div className="buttons">
							<button>Post</button>
						</div>
						
						
						
						
					</div>
					<div className="right">
						<div className="selector">
							<div className="op1" style={{ color:c1 }} onClick={()=>{setImage(false)}}>Text</div>
							<div className="op2" style={{ color:c2 }} onClick={()=>{setImage(true)}}>Image</div>
						</div>						
					</div>
				
				</form>

            </div>
        </div>
     );
}
 
export default Create;