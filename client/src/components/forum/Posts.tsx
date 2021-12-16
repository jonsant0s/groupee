import { useState } from "react";

import Alert from "react-bootstrap/esm/Alert";
import CloseButton from "react-bootstrap/esm/CloseButton";

import axios from "axios";

interface PostProp {
    post:Posts,
    group_size: number,
    school_id:number
}

export const Posts:React.FC<PostProp> = ({post, group_size, school_id}) => {
    const [alert, setAlert] = useState<AlertInfo | null>(null);

    const handleDeletePost = async() => {
        const getP = await axios
            .delete(`http://localhost:3001/requests`, { data: { request_id: post.request_id } });
        
        setAlert({
            status: getP.data.status,
            message: getP.data.message
        });
    }

    return (
        <div className="mb-3 border-2 border-bottom">
            {
                alert ? 
                    <Alert variant={alert.status==200 ? "warning":"danger"}>
                        { alert.message }
                    </Alert> 
                :

                    <>
                        <h5> { post.course_name }: Section 0{ post.section }</h5>
                        <h6>Availability: { post.availability }</h6>
                        <div className="row">
                            <div className="col-md-9 px-3 pb-3">
                                { post.comments }
                                <p className="text-muted">
                                    <small>-{post.username}</small>
                                </p>
                            </div>
                            
                            <div className="col-md-2 px-3 pb-3">
                                Member slots: ({ post.size }/{group_size})
                            </div>

                            <div className="col-md-1 pb-3">
                                { school_id===post.poster_id && 
                                    <CloseButton onClick={handleDeletePost}/> 
                                }
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}