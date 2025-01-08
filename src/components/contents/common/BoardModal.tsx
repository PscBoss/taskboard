import { Box, Modal, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import TaskColumn from "./TaskColumn";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board, Task } from "../../../types/interfaces";

type BoardModalProps = {
    open: boolean
    onClose: () => void
    modalStyle?: SxProps
    board: Board
};

function BoardModal({ board, open, onClose, modalStyle = {} }: BoardModalProps) {
    const [tasks, setTasks] = useState<Task[]>(board.tasks);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const taskID = active.id as string;
        const newStatus = over.id as Task['status'];

        setTasks(tasks.map(task => task.id === taskID
            ? {
                ...task,
                status: newStatus,
            }
            : task));
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
                        {board.columns.map((column) => (
                            <TaskColumn column={column} tasks={tasks.filter(task => task.status === column.id)} />
                        ))};
                    </DndContext>
                </Box>
            </Box >
        </Modal >
    )
}

export default BoardModal