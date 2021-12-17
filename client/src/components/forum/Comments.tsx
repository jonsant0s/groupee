import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";

interface CommentsProps {
    post:Posts,
    user:UserInfo
}

export const Comments:React.FC<CommentsProps> = ({ post, user }) => {
    const [show, setShow] = useState(false);
    const [postComments, setPostComments] = useState<PostComment[]>();
    const [userComment, setUserComment] = useState<UserComment>({
            post_id: post.request_id,
            commenter_id:user.school_id,
            content:"",
            status:""
        });

    useEffect(() => {
        if(!postComments) {
            getComments();
        }
    },[]);

    const handleOnRequest = async() => {
        const join = await axios.post(`http://localhost:3001/join`, {
            post_id: post.request_id,
            student_id: user.school_id,
            join: true
        });
    }

    const getComments = async() => {
        const comments = await axios
            .get(`http://localhost:3001/comment?post_id=${post.request_id}`);
        setPostComments(comments.data);
    }

    const handleOnPost = async() => {
        await axios
            .post(`http://localhost:3001/comment`, userComment);
        getComments();
    }

    const handleDeleteComment = async(post_id, time_stamp) => {
        await axios
        .delete(`http://localhost:3001/comment`, 
            { data:{
                post_id: post_id,
                commenter_id: user.school_id,
                time_stamp: time_stamp
            }}
        );

        getComments();
    }

    const handleInputChange = (e: ChangeEvent|any) => {
        e.persist();
        let prev = {...userComment};
    
        if (e.target.id=="join") {
            prev[e.target.id] = !prev[e.target.id];

            if(!prev[e.target.id]) {
                prev["status"] = "";
            }
        } else {
            prev[e.target.id] = e.target.value;
        }
        setUserComment(prev);
    };

    const handleShow = () => setShow(!show);
    
    return (
        <>
            <a className="text-reset text-decoration-none" href="#" >
                <a className="h4" onClick={handleShow}>{post.course_name}: Section 0{post.section}</a>
                <button 
                        id="join"
                        onClick={handleOnRequest} 
                        className={`ml-3 btn btn-sm ${ userComment.status=="pending" ? "btn-outline-primary": "btn-outline-secondary"}`}>
                        Join </button>
                </a>
            <Modal show={show} onHide={handleShow} className="p-3">
                <Modal.Header closeButton>
                    <Modal.Title>{post.course_name}: Section 0{post.section} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{ post.comments }</p>
                    - {post.username} Student ID:{ post.poster_id}
                </Modal.Body>

                { 
                    postComments && postComments.map((comment) => { 
                        return (            
                            <div className="border-top row px-3 m-2">
                                <div className="col-md-10">
                                    <h6 className=" pt-2">
                                        {comment.username}
                                        <small className="text-muted"> Student #{comment.commenter_id} </small>
                                        <br />
                                        <small className="text-muted"> {comment.time_stamp} </small>
                                    </h6>
                                    <p>{comment.content}</p>
                                </div>

                                <div className="col-md-2 mt-4">
                                    { user.school_id===comment.commenter_id && 
                                        <CloseButton onClick={()=>{handleDeleteComment(post.request_id, comment.time_stamp)}}/> 
                                    }
                                </div>
                                
                            </div>
                        )
                    })
                }

                <Modal.Footer>
                    <div className="w-100 row">
                        <h6>{user.username}</h6>
                        <textarea 
                            id="content"
                            rows={3}
                            onChange={handleInputChange}
                        />
                        <div className="text-right">
                            <Button className="w-25 mt-2" onClick={handleOnPost}>
                                Post
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}