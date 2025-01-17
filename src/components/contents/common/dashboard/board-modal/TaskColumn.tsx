import { Box, Paper, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { Column, Task } from "../../../../../types/interfaces";
import TaskCard from "./task-cards/TaskCard";
import AddTask from "./sub/AddTask";

interface TaskColumnsProps {
    column: Column
    tasksInColumn: Task[]
    onStopTaskEdit: (task: Task) => void
    onAddTask: (columnId: Column['id']) => void
    onDeleteTask: (TaskId: number) => void;
};

function TaskColumn({ column, tasksInColumn, onStopTaskEdit, onAddTask, onDeleteTask }: TaskColumnsProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: column.id,
    });

    const isOverStyle = isOver ? { backgroundColor: 'secondary.light', border: '1px solid' } : undefined;

    return (
        <>
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
                    <TaskCard key={task.id} task={task} onStopTaskEdit={onStopTaskEdit} onDeleteTask={onDeleteTask} />
                ))}
            </Paper>
            <Box onClick={() => onAddTask(column.id)}>
                <AddTask />
            </Box>
        </>
    )
}

export default TaskColumn