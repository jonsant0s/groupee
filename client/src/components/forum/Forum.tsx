import { useEffect, useState } from "react";
import { Posts } from "./Posts";
import { Filter } from "./Filter";
import { Days } from "../../global/days";
import { RequestForm } from "components/request";

import axios from "axios";

import { getCurrentUser, getUserClasses } from "../../services"

const sections = [1, 2, 3];
const group_size = 4;

const mapToCheckbox = (options:any):CheckboxData => {
    const boxValue:CheckboxData = {}
    options.map((opt) => boxValue[opt]=true);

    return boxValue;
}

export const Forum = () => {
    const [userClasses, setUserClasses] = useState(getUserClasses);
    const [user, setUser] = useState<UserInfo>(getCurrentUser);

    const [allPost, setAllPost] = useState<Posts[] | null>(null);
    const [groupPosts, setPosts] = useState<Posts[]>([]);

    const courseNames = userClasses.map((course)=>course.course_name);
    const [filter, setFilter] = useState<FilterPost>({
        courses: mapToCheckbox(courseNames),
        members: group_size,
        section: mapToCheckbox([1, 2, 3]),
        availability: mapToCheckbox(Object.keys(Days)),
    });

    useEffect(() => {
        if(!allPost) {
            getPosts();
        }
    },[]);

    useEffect(() => {
        if(!allPost) {
            return;
        }
        const filteredPost = allPost.filter((post) => { 
            const cName = post.course_name;
            const pSec = post.section;
            const avail = post.availability;

            return ( 
                post.size <= filter.members &&
                filter.courses[cName] &&
                filter.availability[avail] &&
                filter.section[pSec]
            );
        });

        setPosts(filteredPost);

    },[filter, allPost]);

    const getPosts = async() => {
        const getP = await axios.get(`http://localhost:3001/requests?school_id=${user.school_id}`);
        const forumPosts:Posts[] = getP.data;
        setAllPost(forumPosts)
    }

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();

        let prev = {...filter};

        if(e.target.id == "members") {
            let newSize = parseInt(e.target.value);
            prev[e.target.id]=newSize;

        } else {
            let checkBox = prev[e.target.id];
            checkBox[e.target.name]=!checkBox[e.target.name];
        }
        
        setFilter(prev);
    };

    return (
        <div className="container-sm vh-100 p-2">
            <div className="row m-1 border-5 border-bottom px-2 mb-4">
                <div className="d-flex justify-content-between">
                    <div className="p-2 col-example text-left">
                        <h1>Group Preferences</h1>
                    </div>
                    <div className="pt-2 pr-3 text-left">
                        <RequestForm
                            userClasses={userClasses}
                            school_id={user.school_id} 
                            addRequest={getPosts}
                        />
                    </div>
                </div>
            </div>

            <div className="row m-1">
                <div className="col-md-9 border-left pl-3 pr-5">
                    <div className="d-flex flex-column">
                        { 
                            groupPosts.map((post) => { 
                                return ( 
                                    <Posts 
                                        key={post.request_id}
                                        post={post} 
                                        group_size={group_size}
                                        user={user}
                                    /> 
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-md-3">
                    <Filter
                        sections={sections}
                        courses={courseNames} 
                        filter={filter}
                        group_size={group_size}
                        handleInputChange={handleInputChange}/>
                </div>
            </div>
        </div>
    )
}