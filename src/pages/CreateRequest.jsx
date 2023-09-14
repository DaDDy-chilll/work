import { Box } from "@mui/material"
import LinkButton from "../components/ui/LinkButton"
import { colors } from "../assets/theme/theme"

const CreateRequest = () => {


    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    mb: '20px',
                    mx: '20px',
                }}
            >
                <LinkButton to={'/my-requests'} innerText="Back" variant="contained" />
            </Box>
            <Box bgcolor={colors.white[100]} m="20px" p={5} borderRadius="10px">

            </Box>
        </Box>
    )
}

export default CreateRequest
