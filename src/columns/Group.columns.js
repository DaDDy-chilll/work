import GroupActionBtn from "../components/buttons/GroupActionBtn";

export const getColumns = () => {
    return [
        { field: "groupId", headerName: "ID" },
    
        { field: "name", headerName: "Work Flow Title", width: 400 },
        { field: "description", headerName: "Work Flow Description", width: 800 },

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