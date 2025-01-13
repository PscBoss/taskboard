import { Paper, Box, Typography } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDroppable } from '@dnd-kit/core';

function TaskDelete() {
    const { isOver, setNodeRef } = useDroppable({
        id: "deleteTask",
    });

    const isOverStyle = isOver ? { backgroundColor: 'orange', border: '1px solid red' } : undefined;

    return (
        <Paper elevation={3}
            ref={setNodeRef}
            sx={{
                width: '280px',
                textAlign: 'center',
                marginY: 2,
                marginX: "auto",
                backgroundColor: isOver ? 'orange' : undefined
                , ...isOverStyle
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                p: 2,

            }}>
                <DeleteForeverIcon />
                <Typography fontWeight={'bold'} marginX={1}>Drop to delete task</Typography>
            </Box>
        </Paper>
    )
}

export default TaskDelete