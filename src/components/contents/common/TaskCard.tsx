import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Task } from '../../../types/interfaces';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useDraggable } from '@dnd-kit/core';

type TaskCardProps = {
    task: Task
    sx?: React.CSSProperties
}

function TaskCard({ task, sx }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    return (
        <Card
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            sx={{ ...style, margin: 1, backgroundColor: 'lightgrey', ...sx }}
        >
            <CardContent>
                <Box display='flex' flexDirection='row'>
                    <ReorderIcon />
                    <Typography variant='h6'>{task.title}</Typography>
                </Box>
                <Typography variant='body1'>{task.details}</Typography>
            </CardContent>
        </Card>
    )
}

export default TaskCard