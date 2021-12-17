import { Button, Table } from "react-bootstrap";

export const StudentGroupDetailsScreen = () => {
    return (
        <div className="col-md-8 p-2">
            <div className="col-md-12 border p-5">
                <h5>My Preference Posts</h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Forum Post Id</td>
                            <td> Requested By</td>
                            <td> Class Name</td>
                            <td> Decision</td>
                            <td> Comment</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 12890</td>
                            <td> Will H</td>
                            <td> Discrete Math</td>
                            <td>
                                <span>
                                    <Button size="sm">Accept</Button>
                                </span>
                                <span>
                                    <Button size="sm">Reject</Button>
                                </span>
                            </td>
                            <td> This is a interesting group</td>
                        </tr>
                    </tbody>
                </Table>
                <h5>My Join Requests</h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Forum Post Id</td>
                            <td> Class Name</td>
                            <td> Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 12389 </td>
                            <td> Discrete Math </td>
                            <td> Pending... </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
