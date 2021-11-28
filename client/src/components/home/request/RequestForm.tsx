import React, { Component, useState } from 'react';
import Button from "react-bootstrap/esm/Button";

import axios from 'axios';
//@TODO: Create interface module and add types

//Dummy JSON file to display member IDs
import data from "./mock-data.json";


const days: string[] = ["Select Day", "Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// export const RequestForm: React.FC<Props> = ({})
export const RequestForm = () => {

    const [members, setMembers] = useState(data);

    const [addMemberData, setAddMemberData] = useState({
        member_id: 0,
    });

    const [values, setValues] = useState({
        student_id: 0,
        group_size: 0,
        availability: "",
    });

    const handleAddMemberChange = (e) => {
        e.preventDefault();
        
        const fieldID = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newMemberData = { ...addMemberData };
        newMemberData[fieldID] = fieldValue;

        setAddMemberData(newMemberData);
       
    }
    const handleAddFormSubmit = (event) => {
        event.preventDefault();
    
        const newMember = {
          id: addMemberData.member_id,
        };
    
        const newMembers = [...members, newMember];
        setMembers(newMembers);
        console.log(newMembers);
    };

    const handleDeleteClick = (memberId) => {
        const newMembers = [...members];
    
        const index = members.findIndex((member) => member.id === memberId);
    
        newMembers.splice(index, 1);
    
        setMembers(newMembers);
    };
    

    let handleStudentID = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            student_id: e.target.value,
        }));
    };
    
    let handleGroupSize = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            group_size: e.target.value,
        }));
    };

    let handleAvailability = (e) => {
        e.persist();
        setValues((values) => ({
            ...values,
            availability: e.target.value,
        }));
    };
     

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            //.post("http://localhost:3001/create", values)
            .post('https://jsonplaceholder.typicode.com/posts', values)
            .then((res) => console.log(res.data));

    
    }

    


    return (
        <div className="container-sm p-5">
            <h3 className="mb-4 text-center">Create Group Request</h3>
            <form className="w-75 row mx-auto p-3 border rounded" onSubmit={onSubmit}>
                <div className="col-md-6">
                    <div className="col-md-12">
                        <label className="form-label">Student ID</label>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="sid" 
                        placeholder="#000000"
                        name="student_id"
                        value={values.student_id}
                        onChange={handleStudentID}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Group Size</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="size"
                            name="group_size"
                            value={values.group_size}
                            onChange={handleGroupSize}
                            />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Availability</label>
                        <select id="inputState" 
                                className="form-select" 
                                name="availability" 
                                value={values.availability} 
                                onChange={handleAvailability}
                                >
                            { days.map((day, i) => {
                                return (
                                    <option>{day}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Member IDs</label>
                            
                        <div className="border rounded py-2 d-flex flex-column">
                            {members.map((member)=>(
                                <div className="border rounded p-2 m-2">{member.id}
                                    <Button variant="outline-danger" style={{float: 'right'}} className="float-right" onClick={handleDeleteClick}>Remove</Button>
                                </div>
                            ))}
                            
                            <div className="p-2 row">
                                <div className="col-7">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress2" 
                                        name="member_id"
                                        placeholder="#000000"
                                        onChange={handleAddMemberChange}
                                        />
                                </div>
                                <button className="col-4 btn btn-primary btn-sm"onClick={handleAddFormSubmit}>Add</button>
                            </div>
                            
                        </div>
                </div>
                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Submit request</button>
                </div>
            </form>
        </div>
    )
}
