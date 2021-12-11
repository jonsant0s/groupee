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
    roles: number;
}

export interface CheckRoleForm {
    username: string;
    role_id: string;
}

export interface ClassList {
    course_name: string;
    student_id: number | null;
}