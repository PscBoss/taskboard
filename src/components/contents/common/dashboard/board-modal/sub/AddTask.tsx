import { Paper, Box, Typography } from "@mui/material"
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';

function AddTask() {
    return (
        <Paper elevation={3}
            sx={{
                width: '280px',
                textAlign: 'center',
                marginY: 2,
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                p: 2,
                '&:hover': {
                    backgroundColor: 'primary.contrastText'
                }
            }}>
                <SwitchAccessShortcutAddIcon />
                <Typography fontWeight={'bold'} marginX={1}> Add Task</Typography>
            </Box>
        </Paper>
    )
}

export default AddTask