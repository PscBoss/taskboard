import { Box, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import TaskColumn from "../TaskColumn";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board, Column, Task } from "../../../../types/interfaces";

type BoardModalProps = {
    open: boolean
    onClose: () => void
    board: Board
};

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

function BoardModal({ board, open, onClose }: BoardModalProps) {
    const [tasks, setTasks] = useState<Task[]>(board.tasks); // state for task management in the board

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event; // active is the task being dragged, over is the task being dragged over

        if (!over) return;  // if there is no task being dragged over, return

        const taskID = active.id as Task['id']; // active.id = column.id of the task being dragged
        const newStatus = over.id as Column['id']; // over.id = column.id of the task being dragged over, to be updated as new task.status

        // setTask is used to update tasks status by using array.map to create new updated task array. 
        setTasks(tasks.map(task => task.id === taskID
            ? {
                ...task,
                status: newStatus,
            } // to update the dragged task status on drag end
            : task)); // to keep other tasks the same
    }

    const handleTaskUpdate = (prevTasks: Task[], id: Task["id"], updatedValue: Task) => {
        // Use map method to return a new array
        return prevTasks.map(task => {
            // If this task's id matches the one to be updated
            if (task.id === id) {
                // Use spread operator to merge new properties
                return { ...task, ...updatedValue };
            }
            // If not, return the object unchanged
            return task;
        });
    }

    const handleStopTaskEdit = (task: Task) => {
        // to update the tasks in the board
        const updatedTasks = handleTaskUpdate(tasks, task.id, task)
        setTasks(() => updatedTasks)
    }

    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
        >
            <Box sx={modalStyle}>
                <Typography variant='h6' id='modal-title'
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: 1,
                        fontWeight: 'bold',
                    }}>
                    {board.title}
                </Typography>
                <Typography variant='body1' sx={{ marginY: 1, textAlign: 'center' }}>{board.desc}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <DndContext onDragEnd={handleDragEnd}>
                        {/* onDragEnd is one of the dnd kit library's props to handle the end of a drag event */}
                        {board.columns.map((column) => (
                            <TaskColumn key={column.id} column={column} tasksInColumn={tasks.filter(task => task.status === column.id)} onStopTaskEdit={handleStopTaskEdit} />
                        ))};
                    </DndContext>
                </Box>
            </Box >
        </Modal >
    )
}

export default BoardModal