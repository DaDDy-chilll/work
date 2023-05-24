import GroupActionBtn from "../components/buttons/GroupActionBtn";

export const getColumns = () => {
    return [
        { field: "departmentId", headerName: "ID" },
    
        { field: "name", headerName: "Department Name", width: 1200 },
    ];
}