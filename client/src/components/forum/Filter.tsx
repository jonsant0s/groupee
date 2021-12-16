import { Days } from "../../global/days";

import Form from "react-bootstrap/esm/Form";

interface FilterProps {
    sections:number[],
    courses:string[],
    filter:FilterPost,
    group_size: number,
    handleInputChange: (e:ChangeEvent) => void
}

export const Filter:React.FC<FilterProps> = ({sections, filter, courses, handleInputChange, group_size}) => {
    const checkOptions = (pref: string|null, option: any, filterName: string) => {
        return (
            <div key={`opt${option}`} className="mb-2 ml-3">
                <Form.Check
                    key={`${filterName}${option}`}
                    type="checkbox"
                    id={filterName}
                    name={option}
                    checked={filter[filterName][option]}
                    label={`${pref ? pref : ""}${ option }`}
                    onChange={handleInputChange}
                />
            </div>
        )
    }
    return (
        <div className="border p-3">
            <h6>Filter by:</h6>
            <div className="mt-3 m-2">
                <h6 className="mt-3">Course:</h6>
                    { courses.map((course, i) => { return checkOptions(null, course, "courses") }) }

                <h6 className="mt-3">Section:</h6>
                    { sections.map((sec, i) => { return checkOptions(null, sec, "section") }) }

                <h6 className="mt-3">Member slots: {filter.members}</h6>
                    < Form.Range 
                        className="w-50"
                        id="members"
                        value={filter.members}
                        min={1}
                        max={group_size}
                        onChange={handleInputChange}
                    />

                <h6 className="mt-3">Availability:</h6>
                    { Object.keys(Days).map((day) => { return checkOptions(null, day, "availability")}) }
            </div>
        </div>
    )
}