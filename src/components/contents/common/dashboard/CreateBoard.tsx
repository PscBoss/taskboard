import { Paper, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

function CreateBoard() {

    const boardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        height: '200px',
        justifyContent: 'flex-start',
        padding: 2,
        margin: 2
    }

    return (
        <Paper elevation={3}
            sx={boardStyle}
        >
            <Typography variant='h6'
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 1,
                    fontWeight: 'bold',
                }}>
                Create a Board
            </Typography>
            <AddCircleIcon sx={{ fontSize: 'h1.fontSize', flexGrow: 1 }} />
        </Paper>
    )
}

export default CreateBoard