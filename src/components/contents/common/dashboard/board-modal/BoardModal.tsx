import { Box, Button, Modal, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import TaskColumn from "./TaskColumn";
import { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Board, Column, Task } from "../../../../../types/interfaces";
import BackspaceIcon from '@mui/icons-material/Backspace';
import React from "react";
import BoardInfoShow from "./sub/BoardInfoShow";
import BoardInfoEdit from "./sub/BoardInfoEdit";
import TaskDelete from "./task-cards/TaskDelete";
import { useTaskEdit } from "./task-cards/sub/TaskEditContext";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const taskColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginX: 1,
};

interface BoardDeleteProps {
    sx?: SxProps
    boardId: Board['id']
    boardTitle: Board['title']
    onDelete: (boardId: Board['id']) => void
}

function BoardDelete({ sx, boardId, boardTitle, onDelete }: BoardDeleteProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <BackspaceIcon sx={sx} onClick={handleOpen} />
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby={"confirm delete board"}
            >
                <Box sx={{
                    ...modalStyle,
                    width: 600,
                    height: 300,
                    display: "flex",
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4" textAlign={'center'}>Do you want to delete board:</Typography>
                    <Typography variant="h4" textAlign={'center'}>"{boardTitle}"</Typography>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        width: 1,
                        p: 5
                    }}>
                        <Button
                            variant="contained"
                            sx={{ width: '100px' }}
                            color="warning"
                            onClick={() => onDelete(boardId)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ width: '100px' }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

interface BoardModalProps {
    open: boolean
    onClose: () => void
    board: Board
    onDelete: (boardId: Board['id']) => void
    onStopBoardEdit: (editingBoard: {
        id: Board['id']
        title: Board['title'];
        desc: Board['desc'];
    }) => void
    onStopTaskEdit: (tasks: Task[], boardId: Board['id']) => void
};

function BoardModal({ board, open, onClose, onDelete, onStopBoardEdit, onStopTaskEdit }: BoardModalProps) {
    const [tasks, setTasks] = useState(board.tasks) // state of task management in the board
    const [isEditingBoard, setIsEditingBoard] = useState(false)

    // to stop editing and not applying changes when clicked outside the modal.
    useEffect(() => {
        if (!open) {
            setIsEditingBoard(false)
        }
    }, [open]
    )

    // to send new tasks data to the board state when tasks data change.
    useEffect(() => {
        onStopTaskEdit(tasks, board.id)
    }, [tasks])

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event; // active is the task being dragged, over is the droppable area being dragged over

        if (!over) return;  // if there is no droppable area being dragged over, return

        const draggingTaskId = active.id as Task['id']; // active.id = column.id of the task being dragged
        const droppingAreaId = over.id as Column['id'] | Task['id']; // over.id = column.id of the task being dragged over, to be updated as new task.status

        // setTask is used to update tasks status by using array.map to create new updated task array. 
        if (droppingAreaId === 'deleteTask') {
            setTasks(prev => prev.filter(task => (task.id !== draggingTaskId)))
        }
        else {
            const isColumnId = board.columns.some(column => column.id === droppingAreaId);
            if (isColumnId) // In case of droppable area is a column
                setTasks((prev) => prev.map((task) => (task.id === draggingTaskId // to only update the task to be dropped
                    ? {
                        ...task,
                        status: droppingAreaId as Column['id'],
                    }
                    : task)))
            else if (draggingTaskId !== droppingAreaId) {
                setTasks((prev) => {
                    const oldIndex = prev.findIndex(task => task.id === draggingTaskId);
                    const newIndex = prev.findIndex(task => task.id === droppingAreaId);
                    return arrayMove(prev, oldIndex, newIndex);
                })
            } // In case of droppable area is another task (and not the area of the one being dragged)
        };
    }

    const { setEditingTaskId } = useTaskEdit();

    const handleAddTask = (columnId: Column['id']) => {
        const newTask: Task = {
            id: Math.floor(Math.random() * 100000),
            title: "Task Name",
            details: "Task Details",
            status: columnId,
        }
        setTasks((prev) => [...prev, newTask])
        setEditingTaskId(newTask.id)
    }

    const handleTaskUpdate = (prevTasks: Task[], updatedTask: Task) => {
        // Use map method to return a new array
        return prevTasks.map(task => {
            // If this task's id matches the one to be updated
            if (task.id === updatedTask.id) {
                // Use spread operator to merge new properties
                return { ...task, ...updatedTask };
            }
            // If not, return the object unchanged
            return task;
        });
    }

    const handleStopTaskEdit = (task: Task) => {
        const updatedTasks = handleTaskUpdate(tasks, task)
        setTasks(() => updatedTasks)
    } // to update the tasks in the board

    const handleDeleteTask = (taskId: number) => {
        setTasks((prev) => prev.filter(task => task.id !== taskId))
    }

    // const dndMouse = useSensor(MouseSensor, {
    //     // Press delay of 201ms, with tolerance of 500px of movement
    //     activationConstraint: {
    //         delay: 201,
    //         tolerance: 500,
    //     },
    // })

    // const dndSensors = useSensors(dndMouse)

    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby={board.title}
            aria-describedby={board.desc}
        >
            <Box sx={{ ...modalStyle, overflowY: 'auto' }}>
                {
                    isEditingBoard
                        ? <BoardInfoEdit
                            boardId={board.id}
                            boardTitle={board.title}
                            boardDesc={board.desc}
                            isEditingBoard={isEditingBoard}
                            setIsEditingBoard={setIsEditingBoard}
                            onStopBoardEdit={onStopBoardEdit} />
                        : <BoardInfoShow
                            onClick={() => setIsEditingBoard(true)}
                            boardTitle={board.title}
                            boardDesc={board.desc} />
                }

                <DndContext onDragEnd={handleDragEnd}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                    }}>
                        {/* onDragEnd is one of the dnd kit library's props to handle the end of a drag event */}
                        {board.columns.map((column) => (

                            <Box key={column.id} sx={taskColumnStyle} >
                                <SortableContext
                                    items={tasks.filter(task => task.status === column.id).map(task => task.id)}
                                >
                                    <TaskColumn
                                        column={column}
                                        tasksInColumn={tasks.filter(task => task.status === column.id)}
                                        onStopTaskEdit={handleStopTaskEdit}
                                        onAddTask={handleAddTask}
                                        onDeleteTask={handleDeleteTask}
                                    />
                                </SortableContext>
                            </Box>
                        ))}
                    </Box>
                    <TaskDelete />
                </DndContext>
                <BoardDelete
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: 'pink',
                        fontSize: '50px',
                        '&:hover': {
                            color: 'red'
                        }
                    }}
                    boardTitle={board.title}
                    boardId={board.id}
                    onDelete={onDelete}
                />
            </Box >
        </Modal >
    )
}

export default BoardModal