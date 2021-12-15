import { useEffect, useState } from "react";
import { Days } from "../../global/days";
import { RequestForm } from "components/request";
import { getCurrentUser } from "../../services"

import Form from "react-bootstrap/esm/Form";

// Props be passed from parent or queried
let posts:Posts[] = [
    {
        poster: "Student1",
        req_id: 1231231,
        title:"Title1",
        section: 1,
        content: "Additional poster comments maybe, I'm available weekends too <3. Suspendisse potenti. Morbi posuere massa ante, scelerisque condimentum diam vulputate vitae.",
        members: 2,
        availability: Days.Thursday },
    {
        poster: "Student2",
        req_id: 564564564,
        title:"Title2",
        section: 2,
        content: "Curabitur mattis urna lorem, ac condimentum urna commodo id. Nulla dignissim ex in metus sollicitudin consectetur.",
        members: 3,
        availability: Days.Monday
    }
]

const forumData:ForumData = {
    className: "CPSC 471",
    sections: [1, 2, 3],
    group_size: 4,
    instructor: "Instructor",
    posts: posts
}

const sections = [1, 2, 3];
const group_size = 4;

const mapToCheckbox = (options:any):CheckboxData[] => {
    return options.map((opt) => {
        return {value: opt, isChecked: false};
    });
}

export const Forum = () => {
    const [user, setUser] = useState<UserInfo>(getCurrentUser);
    const [filter, setFilter] = useState<FilterPost>({
        members: group_size,
        section: mapToCheckbox(forumData.sections),
        availability: mapToCheckbox(Object.keys(Days))
    });

    useEffect(() => {
       console.log(filter); 
    },[filter]);

    
    const handleInputChange = (e: ChangeEvent) => {
        e.persist();

        let prev = {...filter};

        if(e.target.id == "members") {
            prev[e.target.id]=parseInt(e.target.value);
        } else {
            let checkBox = prev[e.target.id][e.target.name];
            checkBox.isChecked=!checkBox.isChecked;
        }
        
        setFilter(prev);
    };

    const checkOptions = (pref: string|null, option: any, key:number, filterName: string) => {
        return (
            <div className="mb-2 ml-3">
                <Form.Check
                    key={`${filterName}${key}`}
                    type="checkbox"
                    id={filterName}
                    name={key.toString()}
                    checked={filter[filterName].isChecked}
                    label={`${pref ? pref : ""}${ option }`}
                    onChange={handleInputChange}
                />
            </div>
        )
    }

    const showPosts = (post:any) => {
        return (
            <div className="mb-3 border-2 border-bottom">
                <h5> { post.title } </h5>
                <div className="row">
                    <div className="col-md-9 px-3 pb-3">
                        { post.content }
                    </div>
                    <div className="col-md-3 px-3 pb-3">
                        Member slots: ({ post.members }/{group_size})
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div className="container-sm vh-100 p-2">
            <div className="row m-1 border-5 border-bottom px-2 mb-4">
                <div className="d-flex justify-content-between">
                    <div className="p-2 col-example text-left">
                        <h1>{forumData.className} (Fall 2020)</h1>
                        <dl className="row">
                            <dd className="col-sm-8">Group size: {forumData.group_size}</dd>
                            <dd className="col-sm-8">Instructor: {forumData.instructor}</dd>
                        </dl>
                    </div>
                    <div className="pt-5 pr-3 text-left align-middle">
                        <RequestForm school_id={user.school_id} classes={[]}/>
                    </div>
                </div>
            </div>

            <div className="row m-1">
                <div className="col-md-9 border-left pl-3 pr-5">
                    <div className="d-flex flex-column">
                        { forumData.posts.map((post) => { return showPosts(post) }) }
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="border p-3">
                        <h6>Filter by:</h6>
                        <div className="mt-3 m-2">
                            <h6 className="mt-3">Section:</h6>
                                { sections.map((sec, i) => { return checkOptions("0", sec, i, "section") }) }

                            <h6 className="mt-3">Member slots: {filter.members}</h6>
                                < Form.Range 
                                    className="w-50"
                                    id="members"
                                    value={filter.members}
                                    min={1}
                                    max={group_size}
                                    onChange={handleInputChange}
                                />

                            <h6 className="mt-3">Availability:</h6>
                                { Object.keys(Days).map((day, i) => { return checkOptions(null, day, i, "availability")}) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}