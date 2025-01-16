import { Box, SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Task } from '../../../../../../types/interfaces';
import { useDraggable } from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import TaskShow from './sub/TaskShow';
import TaskEdit from './sub/TaskEdit';
import { useTaskEdit } from './sub/TaskEditContext';
import ReorderIcon from '@mui/icons-material/Reorder';

type TaskCardProps = {
    task: Task
    isOverStyle?: SxProps
    onStopTaskEdit: (task: Task) => void
    onDeleteTask: (TaskId: number) => void;
}

function TaskCard({ task, isOverStyle, onStopTaskEdit, onDeleteTask }: TaskCardProps) {
    const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
        id: task.id,
    });
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => { setIsEditing(editingTaskId === task.id), [editingTaskId] })

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    const { editingTaskId, setEditingTaskId } = useTaskEdit();
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleTaskClick = () => {
        setEditingTaskId(task.id);
        console.log('Task Clicked');
    }

    const handleMouseDown = () => {
        console.log('MouseDown')
        clickTimeoutRef.current = setTimeout(() => {
            clickTimeoutRef.current = null;
        }, 200);
    };

    const handleMouseUp = () => {
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            handleTaskClick();
        }
    };

    return (
        <Card
            ref={setNodeRef}
            {...attributes}
            sx={{
                ...style,
                ...isOverStyle,
                margin: 2,
                backgroundColor: 'lightgrey',
                width: '260px',
                height: '120px',
                '&:hover': {
                    backgroundColor: 'primary.contrastText'
                },
                overflowY: 'auto'
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box
                        ref={setActivatorNodeRef}
                        {...(isEditing ? {} : listeners)}>
                        <ReorderIcon />
                    </Box>
                    {(isEditing)
                        ? <TaskEdit task={task}
                            onStopTaskEdit={onStopTaskEdit}
                        />
                        : <TaskShow task={task} onDeleteTask={onDeleteTask}
                            onClick={handleTaskClick}
                        />}
                </Box>
            </CardContent>
        </Card>
    )
}

export default TaskCard