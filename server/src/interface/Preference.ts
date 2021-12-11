export interface createNewRequest {
    id: number;
    members: string; // change to array of members for complete API
    // members: Array<number>;
    availability: string | any;
    size: number;
}

export interface getRequests {
    username: string; // session username, might change to session cookie once postman demo is done
}
