import { useEffect, useState } from 'react';

const Create = ({auth,handleUser}) => {
	const [type,setType] = useState('text');
	const [c1,setC1] = useState('var(--primary)')
	const [c2,setC2] = useState('white')
	const [image,setImage] = useState(false)
	
	
    return ( 
        <div className="create">
            <div className="cont">
				<div className="h">Create Post</div>
				<form className='createField'>
					<div className="left">

						<div className="field">
							<div className="text">Title</div>
							<input className='titleField' type="text" placeholder='Your Title' />
						</div>
						{image ? null:
						<div className="field">
							<div className="text">Content</div>
							<textarea className='contentField' placeholder='Your Content' cols="35" rows="8"/>
						</div>
						}
					</div>
					<div className="right">
						<div className="selector">
							<div className="op1" style={{ color:c1 }} onClick={()=>{setType('text');setC1('var(--primary)');setC2('white');setImage(false)}}>Text</div>
							<div className="op2" style={{ color:c2 }} onClick={()=>{setType('image');;setC2('var(--primary)');setC1('white');setImage(true)}}>Image</div>
						</div>
						{image ? <div className='upload'>Upload Image</div>: null}
						
					</div>
				</form>

				<div className="buttons">
					<button>Post</button>
				</div>
            </div>
        </div>
     );
}
 
export default Create;