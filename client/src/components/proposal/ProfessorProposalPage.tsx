import { Button, Table } from "react-bootstrap";

export const ProfessorProposalPage = () => {
    return (
        <div className="col-md-12 border p-5">
            <h5>Submitted Proposals</h5>
            <Table>
                <thead>
                    <tr>
                        <td> Group No. </td>
                        <td> Title </td>
                        <td> Description </td>
                        <td> Submission Date </td>
                        <td> Decision </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> 7 </td>
                        <td> My title </td>
                        <td className="w-25">
                            {" "}
                            Would like to build a game for this class{" "}
                        </td>
                        <td> Time stamp </td>
                        <td>
                            <span>
                                <Button className="btn-success mr-2" size="sm">
                                    Approve
                                </Button>
                            </span>
                            <span>
                                <Button className="btn-danger" size="sm">
                                    Reject
                                </Button>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
