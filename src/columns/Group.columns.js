import GroupActionBtn from "../components/buttons/GroupActionBtn";
import DepartmentRoute from "../components/details/DepartmentRoute";
import { getDepartmentsFromWorkflow } from "../helpers";

export const getColumns = () => {
    return [
        { field: "groupId", headerName: "ID" },
    
        { field: "name", headerName: "Work Flow Title", width: 400 },
        { field: "description", headerName: "Work Flow Description", width: 400 },

        { 
            field: "reviewers", headerName: "Department Route", width: 800,
            renderCell: ({ value }) => {                
                return <DepartmentRoute departments={getDepartmentsFromWorkflow(value)} />
            }
        },

        {
            field: "_id",
            headerName: "Actions",
            renderCell: ({ value }) =>
            (
                <GroupActionBtn id={value} /> 
            ),
        }
    ];
}