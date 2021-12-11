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

enum Roles {
    Prof,
    Student
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
type FormEvent = React.FormEvent<EventTarget & HTMLButtonElement | HTMLFormElement>
// Need role?