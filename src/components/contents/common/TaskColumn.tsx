import { Box, Paper, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Column, Task } from "../../../types/interfaces";
import TaskCard from "./task-cards/TaskCard";

type TaskColumnsProps = {
    column: Column
    tasks: Task[]
};

const taskColumnStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginX: 1,
};

function TaskColumn({ column, tasks }: TaskColumnsProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: column.id,
    });

    const isOverStyle = isOver ? { color: 'green' } : undefined;

    return (
        <Box sx={taskColumnStyle}>
            <Paper elevation={3}
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginY: 1,
                }}
            >
                <Typography fontWeight={'bold'}>{column.title}</Typography>
            </Paper>
            <Paper elevation={3}
                sx={{
                    width: '100%',
                    ...isOverStyle,
                }}
                ref={setNodeRef}
            >
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} sx={isOverStyle} />
                ))}
            </Paper>
        </Box>
    )
}

export default TaskColumn