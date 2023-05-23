import GroupActionBtn from "../components/buttons/GroupActionBtn";

export const getColumns = () => {
    return [
        { field: "groupId", headerName: "ID" },
    
        { field: "name", headerName: "Work Flow Title", width: 1200 },

        {
            field: "_id",
            headerName: "Actions",
            renderCell: ({ row }) =>
            (
                <GroupActionBtn row={row} /> 
            ),
        }
    ];
}