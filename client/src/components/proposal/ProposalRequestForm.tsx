import { useEffect, useState } from "react";
import { Days } from "../../global/days";
import axios from "axios";

import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Alert from "react-bootstrap/esm/Alert";
import { randomIntFromInterval } from "components/request/RequestForm";

interface FormInfo {
    userClasses: any;
}

export const ProposalRequestForm: React.FC<FormInfo> = ({ userClasses }) => {
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState<AlertInfo>();

    const groupNo = [11241, 65849, 39820];

    const initProposal: ProposalInput = {
        proposalID: randomIntFromInterval(),
        group_no: undefined,
        submission_date: Date.now(),
        topic: "",
        description: "",
        status: "submitted",
    };

    const [proposalInfo, setProposalInfo] =
        useState<ProposalInput>(initProposal);

    const handleShow = () => {
        setProposalInfo(initProposal);
        setShow(!show);
    };

    const handleInputChange = (e: ChangeEvent) => {
        e.persist();
        let prev = { ...proposalInfo };
        prev[e.target.id] = e.target.value;
        setProposalInfo(prev);
        console.log(proposalInfo);
    };

    const onSubmit = () => {
        axios
            .post("http://localhost:3001/proposal", {
                submission_id: proposalInfo.proposalID,
                group_no: proposalInfo.group_no,
                topic: proposalInfo.topic,
                description: proposalInfo.description,
            })
            .then((res) => {
                setAlert({
                    status: res.data.status,
                    message: res.data.message,
                });
                setProposalInfo(initProposal);
            })
            .catch((err) => {
                console.log(err.data);
                setAlert({
                    status: err.data.status,
                    message: err.data.message,
                });
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create new proposal request
            </Button>
            <Modal show={show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Proposal</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="w-75 row mx-auto p-3" onSubmit={onSubmit}>
                        {alert && (
                            <Alert
                                variant={
                                    alert.status == 200 ? "success" : "danger"
                                }
                            >
                                {alert.message}
                            </Alert>
                        )}

                        <label className="form-label mt-3">Group Number</label>
                        <input
                            className="form-control"
                            id="group_no"
                            name="group_no"
                            value={proposalInfo.group_no}
                            onChange={handleInputChange}
                        />
                        <label className="form-label mt-3">Topic</label>
                        <input
                            className="form-control"
                            id="topic"
                            name="topic"
                            value={proposalInfo.topic || ""}
                            onChange={handleInputChange}
                        />
                        <label className="form-label mt-3">Description:</label>
                        <textarea
                            className="form-control"
                            value={proposalInfo.description || ""}
                            id="description"
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
