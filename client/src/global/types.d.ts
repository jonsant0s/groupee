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
    student_id: number,
    availability?: Days
    group_size: number,
    class_id: number,
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
    value: number|Days,
    isChecked: boolean
}

interface AlertInfo {
    status: number,
    message: string
}

interface Posts {
    poster: string,
    req_id: number,
    title:string,
    section: number,
    content: string,
    members: number,
    availability: Days
}

interface ForumData {
    className: string,
    sections: number[],
    group_size: number,
    instructor: string,
    posts: Posts[]
}

interface FilterPost {
    members: number,
    section?: CheckboxData[],
    availability?: CheckboxData[]
}

interface Comment {
    userID: string,
    content: string,
    request_id: number// FK
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> 
type FormEvent = React.FormEvent<EventTarget & HTMLButtonElement | HTMLFormElement>
// Need role?