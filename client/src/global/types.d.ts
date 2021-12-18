interface ClassListSearchInfo {
    course_name: string;
    student_id: number | null;
}

interface LoginInfo {
    username: string,
    password?: string
}

interface SignUpInfo extends LoginInfo {
    student_id: number,
    first_name: string,
    last_name: string
}

interface UserInfo {
    username: string,
    first_name: string,
    last_name: string,
    school_id: number,
    session_token: string,
    role: string
}

interface RequestInput {
    requestID: number,
    courseName: string,
    student_id: number,
    availability?: Days
    group_size: number,
    section: number,
    comments?:string
}

interface ForumPosts extends RequestInput {
    posterUser: string,
    section: number,
    title: string,
    section?: number
}

interface CheckboxData {
    [key: string|Days]: boolean
}

interface AlertInfo {
    status: number,
    message: string
}

interface Posts {
    request_id: number,
    poster_id: number,
    username: string,
    availability: Days,
    size: number,
    course_id: number,
    section: number,
    comments: string,
    course_name: string
}

interface ForumData {
    className: string,
    sections: number[],
    group_size: number,
    instructor: string,
    posts: Posts[]
}

interface FilterPost {
    courses:CheckboxData,
    members: number,
    section: CheckboxData,
    availability: CheckboxData
}

interface UserComment {
    post_id: number,
    commenter_id: number,
    content: string,
    status: string
}

interface PostComment {
    commenter_id: number,
    content: string,
    join_group: boolean,
    post_id: number,
    status: string,
    time_stamp: string,
    username: string
}

interface JoinInfo {
	availability: string,
	course_name: string,
	join_group: number,
	post_id: number,
	section: number,
	size: number,
	status: string,
	student_id: number
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> 
type FormEvent = React.FormEvent<EventTarget & HTMLButtonElement | HTMLFormElement>
// Need role?