interface ClassListSearchInfo {
    course_name: string;
    student_id: number | null;
}

interface LoginInfo {
    username: string,
    password: string
}

interface SignUpInfo extends LoginInfo {
    first_name: string,
    last_name: string
}

interface UserInfo extends SignUpInfo {
    roles: string,
    session_token: string
}

interface RequestInput {
    student_id: number,
    group_size: number,
    status?: string,
    class_id?: number,
    requestID?: number, // PK
    availability?: Days
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