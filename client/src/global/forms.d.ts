interface SignUpInfo {
    first_name: string,
    last_name: string,
    username: string,
    password: string
}

interface LoginInfo {
    username: string,
    password: string
}

interface IUser {
    username: string,
    password: string,
    roles?: string
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
type FormEvent = React.FormEvent<EventTarget & HTMLButtonElement | HTMLFormElement>
// Need role?