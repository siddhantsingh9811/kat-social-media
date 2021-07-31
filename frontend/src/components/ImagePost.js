import Comments from "./Comments";
import { useEffect, useState } from "react";
import axios from "axios";
const ImagePost = ({content,auth}) => {
    const user_image_url = "http://localhost:1337"+content.author.image.url;
    const image = "http://localhost:1337"+content.image.url;
    const [open,setOpen] = useState(null)
    const [liked,setLiked] = useState(false)
    const [likeid,setLikeid] = useState('')
    const [likeno,setLikeno] = useState(content.likes.length)
    const [commentno,setCommentno] = useState(content.comments.length)
    useEffect(()=>{
        const likes = content.likes
        likes.map((like)=>{
            try {
                if (like.author === auth.user.id){
                    setLikeid(like.id)
                    setLiked(true)
                }
            } catch (error) {
                
            }
            
        })
    },[auth])
    const likePost = ()=>{
        console.log("liked")
        const like_post = axios({
            method:'POST',
            url:'http://localhost:1337/likes/',
            data:{post:content.id},
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then(response=>{setLikeid(response.data.id);setLikeno(parseInt(likeno)+1)}).catch(err=>{console.log(err)})
    }
    const unlikePost = ()=>{
        console.log("unliked")
        const like_post = axios({
            method:"delete",
            url:`http://localhost:1337/likes/${likeid}`,
            headers: { Authorization: `Bearer ${auth.token}` }
        }).then((response)=>{console.log(response);setLikeno(parseInt(likeno)-1)}).catch((err)=>{console.log(err)})
    }
    const countIncrease = ()=>{
        setCommentno(parseInt(commentno)+1)
    }
    return ( 
        <div className="imagepost post">
            <div className="top">
                <div className="userimage" style={{background:`url("${user_image_url}")`, backgroundSize:"cover",backgroundPosition:"center"}}></div>
                <div className="info">
                    <div className="username">
                        {content.author.username}
                        
                    </div>
                    <div className="title">
                        {content.title}
                    </div>
                </div>
            </div> 
            <div className="image">
                <img preserveAspectRatio src={image} alt="Image Not Loading :(" />
                
            </div>
            <div className="annoyingshit">
            <div className="bottom">
                {liked ?  <svg onClick={()=>{setLiked(!liked);unlikePost()}} className="icons" preserveAspectRatio viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5011 22.2422C12.1458 22.2422 11.8025 22.1132 11.5351 21.8792C10.5251 21.0002 9.55113 20.1662 8.69213 19.4342C6.4682 17.6598 4.39112 15.7088 2.48113 13.6002C0.941513 11.9404 0.059796 9.7763 0.00113309 7.51317C-0.0323123 5.54844 0.675714 3.64323 1.98413 2.17717C2.61935 1.48503 3.39257 0.9337 4.25394 0.558734C5.11532 0.183768 6.04571 -0.00650987 6.98513 0.00016997C8.4103 -0.00603367 9.7953 0.472088 10.9131 1.35617C11.5191 1.82999 12.0539 2.38835 12.5011 3.01417C12.9484 2.38836 13.4832 1.83 14.0891 1.35617C15.207 0.472088 16.592 -0.00603367 18.0171 0.00016997C18.9564 -0.00636985 19.8866 0.183976 20.7478 0.558937C21.609 0.933899 22.382 1.48515 23.0171 2.17717C24.3259 3.64308 25.0343 5.5483 25.0011 7.51317C24.9432 9.77626 24.0618 11.9405 22.5221 13.6002C20.6134 15.7058 18.538 17.6542 16.3161 19.4262C15.4551 20.1592 14.4801 20.9902 13.4681 21.8762C13.2007 22.1102 12.8575 22.2392 12.5021 22.2392L12.5011 22.2422Z" fill="#D64E4E"/>
</svg>
: 
    <svg onClick={()=>{setLiked(!liked);likePost()}} className="icons" preserveAspectRatio viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 23.032C13.1446 23.032 12.8013 22.903 12.534 22.669C11.524 21.79 10.55 20.956 9.69097 20.224C7.46704 18.4496 5.38996 16.4986 3.47997 14.39C1.94035 12.7302 1.05864 10.5661 0.999973 8.30296C0.966528 6.33823 1.67455 4.43302 2.98297 2.96696C3.61819 2.27482 4.39141 1.72349 5.25279 1.34853C6.11416 0.973563 7.04455 0.783285 7.98397 0.789965C9.40914 0.783761 10.7941 1.26188 11.912 2.14596C12.5179 2.61978 13.0527 3.17814 13.5 3.80396C13.9472 3.17815 14.482 2.61979 15.088 2.14596C16.2058 1.26188 17.5908 0.783761 19.016 0.789965C19.9552 0.783425 20.8854 0.973771 21.7466 1.34873C22.6078 1.72369 23.3809 2.27495 24.016 2.96696C25.3248 4.43287 26.0331 6.3381 26 8.30296C25.942 10.5661 25.0606 12.7303 23.521 14.39C21.6123 16.4956 19.5369 18.4439 17.315 20.216C16.454 20.949 15.479 21.78 14.467 22.666C14.1996 22.9 13.8563 23.0289 13.501 23.029L13.5 23.032ZM7.98397 2.25496C7.24746 2.24861 6.51778 2.3966 5.84194 2.6894C5.16609 2.9822 4.55907 3.41331 4.05997 3.95496C2.99954 5.15036 2.42828 6.70132 2.45997 8.29896C2.51619 10.2249 3.28062 12.0624 4.60697 13.46C6.46383 15.4988 8.47985 17.3867 10.636 19.106C11.498 19.841 12.476 20.674 13.493 21.564C14.516 20.673 15.493 19.838 16.36 19.102C18.516 17.383 20.532 15.4954 22.389 13.457C23.7127 12.06 24.4755 10.2246 24.532 8.30096C24.5637 6.70332 23.9924 5.15236 22.932 3.95696C22.4329 3.41531 21.8259 2.9842 21.15 2.6914C20.4742 2.3986 19.7445 2.25061 19.008 2.25696C17.9075 2.25338 16.8385 2.62359 15.976 3.30696C15.2979 3.84986 14.7251 4.51248 14.286 5.26196C14.2041 5.39955 14.0878 5.5135 13.9486 5.59263C13.8095 5.67177 13.6521 5.71338 13.492 5.71338C13.3319 5.71338 13.1745 5.67177 13.0353 5.59263C12.8961 5.5135 12.7799 5.39955 12.698 5.26196C12.259 4.5124 11.6862 3.84976 11.008 3.30696C10.1454 2.62359 9.0764 2.25338 7.97597 2.25696L7.98397 2.25496Z" fill="#D64E4E"/>
    </svg>
    }
               
                <span className="l">{likeno}</span>
                <svg className="icons" onClick={() =>{setOpen(!open)}} preserveAspectRatio viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.69495 22.8031H1.92295L3.17595 21.5541C3.85081 20.8774 4.2772 19.9926 4.38595 19.0431C2.71096 17.9918 1.40376 16.4463 0.644954 14.6201C-0.0459672 12.8475 -0.134173 10.8968 0.393954 9.06911C1.08561 6.71678 2.55239 4.66746 4.55595 3.25411C6.9079 1.60454 9.72159 0.741671 12.594 0.789111C15.9801 0.637625 19.2989 1.76771 21.889 3.95411C23.3802 5.28955 24.4118 7.06162 24.8368 9.01776C25.2618 10.9739 25.0586 13.0143 24.256 14.8481C23.7055 16.1043 22.897 17.2307 21.883 18.1541C19.299 20.3465 15.9824 21.4822 12.597 21.3341C11.1801 21.3326 9.76899 21.1528 8.39695 20.7991C7.78695 21.4297 7.05674 21.9315 6.24947 22.275C5.44221 22.6185 4.57427 22.7968 3.69695 22.7991L3.69495 22.8031ZM12.598 2.25411C6.52995 2.25411 2.80695 5.87311 1.80895 9.45411C0.864954 12.8541 2.25595 16.0541 5.52795 18.0281L5.89395 18.2491L5.88295 18.6761C5.86284 19.5072 5.66364 20.3241 5.29895 21.0711C6.19444 20.7658 6.98966 20.2219 7.59895 19.4981L7.90895 19.1311L8.36895 19.2691C9.74361 19.6675 11.1677 19.8696 12.599 19.8691C20.15 19.8691 23.59 15.2971 23.59 11.0481C23.5888 9.91428 23.3488 8.79342 22.8854 7.75858C22.4221 6.72373 21.7459 5.79813 20.901 5.04211C18.5811 3.10405 15.6174 2.1089 12.598 2.25411Z" fill="#7D8288"/>
    </svg>
                <span className="l">{commentno}</span>

            </div>
            </div>
            <Comments countIncrease={countIncrease} id={content.id} auth={auth} open={open} comments={content.comments}/>
            
        </div>
     );
}
 
export default ImagePost;