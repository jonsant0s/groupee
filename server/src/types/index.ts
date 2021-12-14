export * from "./api";

export interface NewRequest {
    id: number;
    members: string;
    availability: string | any;
    size: number;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface SignUpForm extends Credentials {
    first_name: string;
    middle_name?: string | undefined;
    last_name: string;
}

export interface UserInfo {
    first_name: string;
    last_name: string;
    school_id: number; // Either professor_id or student_id
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