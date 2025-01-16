import { Backdrop, Box, Button, Modal, Typography } from '@mui/material'
import ReorderIcon from '@mui/icons-material/Reorder';
import { Task } from '../../../../../../../types/interfaces';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useRef } from 'react';
import React from 'react';

const taskDeleteModalStyle = {
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

interface TaskDeleteProps {
    taskId: Task['id']
    taskTitle: Task['title']
    onDeleteTask: (TaskId: number) => void;
}

function TaskDelete({ taskId, taskTitle, onDeleteTask }: TaskDeleteProps) {

    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleMouseDown = () => {
        clickTimeoutRef.current = setTimeout(() => {
            clickTimeoutRef.current = null;
        }, 200);
    };

    const handleMouseUp = () => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            handleOpen();
        }
    };

    const handleMouseDownModal = (event: React.MouseEvent<HTMLElement>) => {
        // Ensure the event is triggered by the Backdrop
        const isBackdrop = (event.target as HTMLElement).getAttribute('data-backdrop') === 'true';
        if (isBackdrop) {
            console.log('MouseDown detected on Backdrop:', event);
            handleClose();
        }
    };

    return (
        <>
            <BackspaceIcon sx={{
                color: 'pink',
                '&:hover': {
                    color: 'red'
                },
            }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            />
            <Modal open={open}
                onClose={handleClose}
                aria-labelledby={"confirm delete task"}
            >
                <Box sx={{
                    ...taskDeleteModalStyle,
                    width: 600,
                    height: 300,
                    display: "flex",
                    flexDirection: 'column',
                }}>
                    <Typography variant="h4" textAlign={'center'}>Do you want to delete task:</Typography>
                    <Typography variant="h4" textAlign={'center'}>"{taskTitle}"</Typography>
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
                            onMouseDown={() => onDeleteTask(taskId)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ width: '100px' }}
                            onMouseDown={handleClose}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

interface TaskShowProps {
    task: Task
    onDeleteTask: (TaskId: number) => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
}

function TaskShow({ task, onDeleteTask }: TaskShowProps) {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ReorderIcon />
                <Typography variant='h6' marginLeft={1} flexGrow={1}>{task.title}</Typography>
                <TaskDelete taskId={task.id} taskTitle={task.title} onDeleteTask={onDeleteTask} />
            </Box>
            <Typography variant='body1'>{task.details}</Typography>
        </>
    )
}

export default TaskShow