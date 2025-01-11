import { Box, Typography } from '@mui/material';
import DashboardSegment from '../common/dashboard/DashboardSegment';

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
            { id: 7, title: 'task 1', details: 'Task 1', status: 'to_do' },
            { id: 8, title: 'task 2', details: 'Task 2', status: 'to_do' },
            { id: 9, title: 'task 3', details: 'Task 3', status: 'in_progress' },
            { id: 10, title: 'task 4', details: 'Task 4', status: 'in_progress' },
            { id: 11, title: 'task 5', details: 'Task 5', status: 'done' },
            { id: 12, title: 'task 6', details: 'Task 6', status: 'done' },
        ],
    }
]

function DemoDashboard() {
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
                My Boards (Guests's Demo)
            </Typography>
            <DashboardSegment boards={demoBoards} />
        </Box>
    )
}

export default DemoDashboard