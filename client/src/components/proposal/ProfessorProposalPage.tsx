import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import * as Api from "./ProposalHelpers";

interface ProposalProps {
    proposals:any
}

export const ProfessorProposalPage:React.FC<ProposalProps> = ({ proposals }) => {
    const [reload, setReload] = useState(false);

    useEffect(() => {
        console.log(proposals);
    }, [reload]);

    const handleDecision = (status:string, group_no:number) => {
        Api.updateGroupProposal(status, group_no).then((res) => {
            setReload(!reload)
        });
    }
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
                        { proposals && (
                            proposals.map((proposal) => {
                                return (
                                    <tr>
                                        <td>
                                            {proposal.group_no}
                                        </td>
                                        <td>
                                            {proposal.topic}
                                        </td>
                                        <td>{proposal.description}</td>
                                        <td>
                                            {proposal.submission_date}
                                        </td>
                                        <td>
                                            <span>
                                                <Button 
                                                    className="btn-success mr-2"
                                                    size="sm"
                                                    onClick={ () => { handleDecision("Approved", proposal.group_no)}}>
                                                    Approve
                                                </Button>
                                            </span>
                                            <span>
                                                <Button
                                                    className="btn-danger"
                                                    size="sm"
                                                    onClick={ () => { handleDecision("Declined", proposal.group_no)}}>
                                                    Decline
                                                </Button>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </Table>
        </div>
    );
};
