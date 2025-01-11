import { Box, Paper, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Column, Task } from "../../../types/interfaces";
import TaskCard from "./task-cards/MainTaskCard";

const taskColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginX: 1,
};

interface TaskColumnsProps {
    column: Column
    tasksInColumn: Task[]
    onStopTaskEdit: (task: Task) => void
};

function TaskColumn({ column, tasksInColumn, onStopTaskEdit }: TaskColumnsProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: column.id,
    });

    const isOverStyle = isOver ? { backgroundColor: 'lightgreen' } : undefined;

    return (
        <Box sx={taskColumnStyle}>
            <Paper elevation={3}
                sx={{
                    width: '280px',
                    textAlign: 'center',
                    marginY: 1,
                }}
            >
                <Typography fontWeight={'bold'}>{column.title}</Typography>
            </Paper>
            <Paper elevation={3}
                sx={{
                    width: '100%',
                    minHeight: '100px',
                    ...isOverStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
                ref={setNodeRef}
            >
                {tasksInColumn.map((task) => (
                    <TaskCard key={task.id} task={task} onStopTaskEdit={onStopTaskEdit} />
                ))}
            </Paper>
        </Box>
    )
}

export default TaskColumn