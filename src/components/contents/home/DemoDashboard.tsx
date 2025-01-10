import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import BoardModal from '../common/BoardModal';
import { TaskEditProvider } from '../common/task-cards/TaskEditContext';

//Data that will be fetched when the user logs in to the real dashboard
const demoBoards = [
    {
        id: 1,
        title: 'Get Hyped',
        desc: "You can click on these boards to open them, and manage tasks inside.",
        columns: [
            { id: 'to_do', title: 'To Do' },
            { id: 'in_progress', title: 'In Progress', },
            { id: 'done', title: 'Done' }
        ],
        tasks: [
            { id: 1, title: 'task 1', details: 'Task 1', status: 'to_do' },
            { id: 2, title: 'task 2', details: 'Task 2', status: 'to_do' },
            { id: 3, title: 'task 3', details: 'Task 3', status: 'in_progress' },
            { id: 4, title: 'task 4', details: 'Task 4', status: 'in_progress' },
            { id: 5, title: 'task 5', details: 'Task 5', status: 'done' },
            { id: 6, title: 'task 6', details: 'Task 6', status: 'done' },
        ],
    },
    {
        id: 2,
        title: 'Sign Up With TaskBoard',
        desc: "Your task now is to sign up for an account on TaskBoard.",
        columns: [
            { id: 'to_do', title: 'To Do' },
            { id: 'in_progress', title: 'In Progress', },
            { id: 'done', title: 'Done' }
        ],
        tasks: [
            { id: 1, title: 'task 1', details: 'Task 1', status: 'to_do' },
            { id: 2, title: 'task 1', details: 'Task 2', status: 'to_do' },
            { id: 3, title: 'task 1', details: 'Task 3', status: 'in_progress' },
            { id: 4, title: 'task 1', details: 'Task 4', status: 'in_progress' },
            { id: 5, title: 'task 1', details: 'Task 5', status: 'done' },
            { id: 6, title: 'task 1', details: 'Task 6', status: 'done' },
        ],
    }
]

const sectionStyle = {
    width: '100vw',
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

function DemoDashboard() {
    const [boards] = useState(demoBoards)
    return (
        <Box sx={{
            background: "linear-gradient(to right,rgb(228, 204, 232),rgb(255, 229, 229), #ffebee)",
            flexGrow: 1,
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
            <TaskEditProvider>
                <BoardModal open={open}
                    onClose={handleClose}
                    board={board}
                />
            </TaskEditProvider>
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