import { Paper, SxProps, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateBoardModal from '../CreateBoardModal';
import { useState } from 'react';
import { Board } from '../../../../types/interfaces';

interface CreateBoardProps {
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>
    sx: SxProps
}

function CreateBoard({ setBoards, sx }: CreateBoardProps) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Paper elevation={3}
                sx={sx}
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
            <CreateBoardModal
                open={open}
                onClose={handleClose}
                setBoards={setBoards}
            />
        </>
    )
}

export default CreateBoard