import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

export const ProfessorGroupDetailsScreen = () => {
    return (
        <div>
            <div className="col-md-12 border p-5">
                <h5>Join Requests</h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Requested By</td>
                            <td> Requester Section</td>
                            <td> Forum Post Section</td>
                            <td> Current Members</td>
                            <td> Decision</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Will H</td>
                            <td> 2</td>
                            <td> 1</td>
                            <td> 3/4</td>
                            <td>
                                <span>
                                    <Button size="sm">Accept</Button>
                                </span>
                                <span>
                                    <Button size="sm">Reject</Button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <div className="col-md-12 border p-5">
                <h5>Requested Proposals</h5>
                <Table>
                    <thead>
                        <tr>
                            <td> Group No.</td>
                            <td> Proposal Content</td>
                            <td> Decision</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 7</td>
                            <td> Would like to build a game for this class</td>
                            <td>
                                <span>
                                    <Button size="sm">Accept</Button>
                                </span>
                                <span>
                                    <Button size="sm">Reject</Button>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
