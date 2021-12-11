export enum Days {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}

// creating request with preference
export interface RequestInput {
    student_id: number;
    group_size: number;
    status?: string;
    class_id?: number;
    requestID?: number; // PK
    availability?: Days
}

export interface Comment {
    userID: string;
    content: string;
    request_id: number // FK
}