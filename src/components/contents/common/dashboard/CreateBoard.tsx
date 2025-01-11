import { Paper, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateBoardModal from '../CreateBoardModal';
import { useState } from 'react';

function CreateBoard() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <>
            <Paper elevation={3}
                sx={boardStyle}
                onClick={handleOpen}
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
            <CreateBoardModal open={open}
                onClose={handleClose}
            />
        </>
    )
}

export default CreateBoard