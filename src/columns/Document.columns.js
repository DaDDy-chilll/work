import { Box, Typography } from "@mui/material";
import { convert } from "html-to-text";
import { colors } from "../utils/theme";
import ActionBtn from "../components/buttons/ActionBtn";
import { changeBgColor, changeTextColor } from "../helpers";

// 

export const getColumns = () => {
    return [
        {
            field: "documentId", headerName: "ID",
        },

        {
            field: "createdAt", headerName: "Date",
            valueGetter: ({ value }) => value.split("T")[0]
        },

        { field: "name", headerName: "Item", width: 200 },

        {
            field: "description", headerName: "Reason", width: 250,
            valueGetter: ({ value }) => convert(value).replace(/<[^>]+>/g, '')
        },

        // { field: "type", headerName: "Document Type", width: 150 },

        // {
        //     field: "requester", headerName: "Requested By",
        //     valueGetter: ({ value }) => value && value.name,
        //     width: 150
        // },

        // {
        //     field: "amount", headerName: "Amount",
        //     width: 150,
        //     renderCell: ({ value }) => (
        //         <Typography>
        //             {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MMK
        //         </Typography>
        //     )
        // },

        {
            field: "isCaseClosed", headerName: "Case",
            renderCell: ({ value }) => (
                <Box
                    sx={{
                        backgroundColor: value ? colors.red[200] : colors.paleGreen[200],
                        px: 2,
                        py: 1,
                        borderRadius: "50px"
                    }}
                >
                    <Typography
                        variant="h4"
                        color={
                            value ? colors.red[800] : colors.paleGreen[800]
                        }
                    >
                        {
                            value ? "Close" : "Open"
                        }
                    </Typography>
                </Box>
            )
        },

        // {
        //     field: "remarks", headerName: "Remark",
        //     renderCell: ({ value }) =>
        //     (
        //         <Box sx={{ ml: 3 }}>
        //             <Badge badgeContent={value.length ? value.length : 0} color="primary">
        //                 <MailIcon color="action" />
        //             </Badge>
        //         </Box>
        //     ),
        // },

        {
            field: "lastActivity", headerName: "Last Activities",
            width: 400,
            renderCell: ({ value }) => {

                const textColor = changeTextColor({ action: value.action })
                
                const bgColor = changeBgColor({ action: value.action })

                return (
                    <Box
                        sx={{
                            backgroundColor: bgColor ? bgColor : colors.grey[600],
                            px: 2,
                            py: 1,
                            borderRadius: "50px"
                        }}
                    >
                        <Typography
                            sx={{ color: textColor ? textColor : colors.grey[600] }}
                        >
                            {value.action} by {value.actor.name} ({value.department.name})
                        </Typography>
                    </Box>
                )
            }
        },

        {
            field: "_id",
            headerName: "Actions",
            renderCell: ({ value }) =>
            (
                <ActionBtn id={value} />
            )
        }
    ]
}