/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material"
import { colors } from "../../assets/theme/theme"

const DocumentCase = ({ documentCase }) => {
    return (
        <Box
            sx={{
                backgroundColor: documentCase ? colors.red[200] : colors.paleGreen[200],
                px: 2,
                py: 1,
                borderRadius: "50px"
            }}
        >
            <Typography
                variant="h4"
                color={
                    documentCase ? colors.red[800] : colors.paleGreen[800]
                }
            >
                {
                    documentCase ? "Close" : "Open"
                }
            </Typography>
        </Box>
    )
}

export default DocumentCase
