import { useEffect, useState } from "react";
import { getCurrentUser, getUserClasses } from "../../services";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import "./HomeScreen.css";

export const ProfessorProposals = () => {
    const [user, setUser] = useState(getCurrentUser);
    const [userClasses, setUserClasses] = useState(getUserClasses);

    useEffect(() => {
        console.log(user);
        console.log(userClasses);
    }, [user]);

    return(
        <div >
            <div className="col-md-12 border p-5">
                    <h5>JOIN REQUESTS</h5>
                    <Table>
                        <thead>
                            <tr>
                                <td> Requested By</td>
                                <td> Requester Section</td>
                                <td> Forum Post Section</td>
                                <td> Current Memories</td>
                                <td> Decision</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> 
                                    <span>
                                    <Button  size="sm">
                                        Accept
                                    </Button>
                                    </span>
                                    <span>
                                    <Button  size="sm" >
                                        Reject
                                    </Button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            
                <div className="col-md-12 border p-5">
                    <h5>VIEW PROPOSALS</h5>
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
                                <td> </td>
                                <td> </td>
                                <td> 
                                    <span>
                                    <Button  size="sm">
                                        Accept
                                    </Button>
                                    </span>
                                    <span>
                                    <Button  size="sm" >
                                        Reject
                                    </Button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
    )
}