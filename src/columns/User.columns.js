import UserActionBtn from "../components/buttons/UserActionBtn";

export const getColumns = () => {
    return [
        { field: "userId", headerName: "ID" },

        { 
            field: "name", headerName: "Name", 
            width: 350
        },

        { 
            field: "email", headerName: "Email", 
            width: 350
        },

        {
            field: "department", headerName: "Department",
            width: 300,
            valueGetter: ({ value }) => value.name
        },

        { 
            field: "jobLabel", headerName: "Job Label", 
            width: 200
        },

        // {
        //     field: "approvalAmount", headerName: "Approval Amount",
        //     renderCell: ({ value }) => (
        //         <Typography>
        //             {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK
        //         </Typography>
        //     ),
        //     width: 300
        // },

        {
            field: "_id",
            headerName: "Actions",
            width: 400,
            renderCell: ({ value, row: { isDisabled } }) =>
            (
                <UserActionBtn id={value} isDisabled={isDisabled} isUser={true} />
            )
        }
    ];
}