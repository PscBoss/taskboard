import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import BoardModal from '../common/BoardModal';

const boards = [
    {
        id: 1,
        title: 'Get Hyped',
        desc: "You can click on these boards to open them, and manage tasks inside.",
        tasks: [
            { detail: 'Task 1', status: 'To Do' },
            { detail: 'Task 2', status: 'To Do' },
            { detail: 'Task 3', status: 'In Progress' },
            { detail: 'Task 4', status: 'In Progress' },
            { detail: 'Task 5', status: 'Done' },
            { detail: 'Task 6', status: 'Done' },
        ],
    },
    {
        id: 2,
        title: 'Sign Up With TaskBoard',
        desc: "Your task now is to sign up for an account on TaskBoard.",
        tasks: [
            { detail: 'Task 1', status: 'To Do' },
            { detail: 'Task 2', status: 'To Do' },
            { detail: 'Task 3', status: 'In Progress' },
            { detail: 'Task 4', status: 'In Progress' },
            { detail: 'Task 5', status: 'Done' },
            { detail: 'Task 6', status: 'Done' },
        ],
    },
]

const sectionStyle = {
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
}

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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DemoDashboard() {
    return (
        <Box sx={{
            background: "linear-gradient(to right,rgb(228, 204, 232),rgb(255, 229, 229), #ffebee)",
        }}>
            <Typography variant='h4'
                sx={{
                    width: '100%',
                    paddingTop: 4,
                    paddingLeft: 4,
                    textAlign: 'start',
                }}>
                My Boards
            </Typography>
            <Box sx={sectionStyle}>
                {boards.map((board) => (
                    <BoardComponents key={board.id} board={board} />
                ))}
                <CreateBoard />
            </Box>
        </Box>
    )
}

function BoardComponents({ board }: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                    {board.title}
                </Typography>
                <Typography variant='body1'>{board.desc}</Typography>
            </Paper>
            <BoardModal open={open}
                onClose={handleClose}
                title={board.title}
                desc={board.desc}
                modalStyle={modalStyle}
                tasks={board.tasks}
            />
        </>
    )
}

function CreateBoard() {
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

export default DemoDashboard