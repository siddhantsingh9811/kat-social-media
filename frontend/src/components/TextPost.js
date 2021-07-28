const TextPost = ({content,auth}) => {
    const image_url = "http://localhost:1337"+content.author.image.url

    return ( 
        <div className="textpost post">
            <div className="top">
                <div className="image" style={{background:`url("${image_url}")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                <div className="info">
                    <div className="username">
                        {content.author.username}
                        
                    </div>
                    <div className="title">
                        {content.title}
                    </div>
                    <div className="content">
                        {content.content}
                    </div>
                </div>
            </div> 
            <div className="annoyingshit">
            <div className="bottom">
                Bottom
            </div>
            </div>
            <div className="comments">
            Comments
            </div>
            
            
        </div>
        
     );
}
 
export default TextPost
