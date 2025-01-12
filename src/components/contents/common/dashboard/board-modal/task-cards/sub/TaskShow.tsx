import { Box, Typography } from '@mui/material'
import ReorderIcon from '@mui/icons-material/Reorder';
import { Task } from '../../../../../../../types/interfaces';

type TaskShowProps = {
    task: Task
}

function TaskShow({ task }: TaskShowProps) {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ReorderIcon />
                <Typography variant='h6' marginLeft={1}>{task.title}</Typography>
            </Box>
            <Typography variant='body1'>{task.details}</Typography>
        </>
    )
}

export default TaskShow