const Create = ({auth,handleUser}) => {
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
						<div className="field">
							<div className="text">Content</div>
							<textarea className='contentField' placeholder='Your Content' cols="40" rows="8"/>
						</div>
					</div>
					<div className="right">
						cum
					</div>
				</form>

				<div className="buttons">
					<button>Post</button>
					<button>Cancel</button>
				</div>
            </div>
        </div>
     );
}
 
export default Create;