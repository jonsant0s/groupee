export interface loginForm {
    username: string;
    password: string;
}

export interface signupForm {
    username: string;
    password: string;
    first_name: string;
    middle_name?: string | undefined;
    last_name: string;
    roles: number;
}

export interface checkRoleForm {
    username: string;
    role_id: string;
}