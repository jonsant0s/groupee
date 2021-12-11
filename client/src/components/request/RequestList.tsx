import React from "react";
import Table from "react-bootstrap/esm/Table";

export const RequestList = () => {
    return (
        <div className="container">
            <h4 className="my-3">Requests</h4>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Request id#</th>
                        <th>Status</th>
                        <th>Requested by</th>
                        <th>Members</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>012312</td>
                        <td>Pending</td>
                        <td>Mark</td>
                        <td>131331, 342423...</td>
                        <td>Monday</td>
                    </tr>
                    <tr>
                        <td>042325</td>
                        <td>Pending</td>
                        <td>Jacob</td>
                        <td>465435, 234324...</td>
                        <td>Wednesday</td>
                    </tr>
                    <tr>
                        <td>034232</td>
                        <td>Declined</td>
                        <td>Larry</td>
                        <td>465435, 234324...</td>
                        <td>Friday</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};
