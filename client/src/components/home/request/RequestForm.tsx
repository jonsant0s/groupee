import React from 'react';

//@TODO: Create interface module and add types
const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]; 

// export const RequestForm: React.FC<Props> = ({})
export const RequestForm = () => {
    return (
        <div className="container-sm p-5">
            <h3 className="mb-4 text-center">Create Group Request</h3>
            <form className="w-75 row mx-auto p-3 border rounded">
                <div className="col-md-6">
                    <div className="col-md-12">
                        <label className="form-label">Student ID</label>
                        <input type="email" className="form-control" id="sid" placeholder="#000000"/>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Group Size</label>
                        <input type="number" className="form-control" id="size"/>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Availability</label>
                        <select id="inputState" className="form-select">
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
                            <div className="border rounded p-2 m-2">Member 1: 234264</div> 
                            <div className="border rounded p-2 m-2">Member 2: 956753</div>
                            <div className="p-2 row">
                                <div className="col-7">
                                    <input type="text" className="form-control" id="inputAddress2" placeholder="#000000"/>
                                </div>
                                <button className="col-4 btn btn-primary btn-sm">Add</button>
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