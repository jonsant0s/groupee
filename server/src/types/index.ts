export * from "./api";

export interface NewRequest {
    requestID: number,
    courseName:string,
    student_id: number,
    availability?: string
    group_size: number,
    section: number,
    comments?:string
}

export interface Credentials {
    username: string;
    password: string;
}

export interface SignUpForm extends Credentials {
    student_id: number;
    first_name: string;
    middle_name?: string | undefined;
    last_name: string;
}

export interface UserInfo {
    first_name: string;
    last_name: string;
    school_id: number;
    username: string;
    session_token: string;
    role: string;
}

export interface CheckRoleForm {
    username: string;
    role_id: string;
}

export interface ClassList {
    course_name: string;
    student_id: number | null;
}

export interface CommentInfo {
    post_id: number,
    commenter_id: number,
    content: string,
    time_stamp: string
}

export interface JoinRequest {
    post_id: number,
    student_id: number,
    join: boolean,
    status: string
}