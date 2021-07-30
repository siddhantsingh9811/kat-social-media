const Comment = ({comment}) => {
    return ( 
        <div className="comment">
            <div className="top">
                <div className="userimage" style={{background:`url("http://localhost:1337/uploads/default_af544244c7.png")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                <div className="info">
                    <div className="username">
                        Username
                        
                    </div>
                    <div className="title">
                        Content
                    </div>
                </div>
            </div> 
        </div>
     );
}
 
export default Comment;