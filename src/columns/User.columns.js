import ActionBtn from "../components/buttons/ActionBtn";



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
            width: 300,
            renderCell: ({ value, row: { isDisabled } }) =>
            (
                <ActionBtn id={value} isDisabled={isDisabled} isUser={true} />
            )
        }
    ];
}