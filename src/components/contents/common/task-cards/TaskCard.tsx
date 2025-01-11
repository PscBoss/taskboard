import { SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Task } from '../../../../types/interfaces';
import { useDraggable } from '@dnd-kit/core';
import { useRef } from 'react';
import TaskShow from './TaskShow';
import TaskEdit from './TaskEdit';
import { useTaskEdit } from './TaskEditContext';

type TaskCardProps = {
    task: Task
    sx?: SxProps
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

    const { editingTaskId, setEditingTaskId } = useTaskEdit();
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isEditing = (editingTaskId === task.id)

    const handleTaskClick = () => {
        console.log('clicked on the task!');
        setEditingTaskId(task.id);
    }

    const handleMouseDown = () => {
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

    const handleStopTaskEdit = () => {
        setEditingTaskId(null);
    }

    return (
        <Card
            ref={isEditing ? null : setNodeRef}
            {...(isEditing ? {} : listeners)}
            {...(isEditing ? {} : attributes)}
            sx={{ ...style, margin: 1, backgroundColor: 'lightgrey', ...sx }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            id={task.id}
        >
            <CardContent>
                {(isEditing)
                    ? <TaskEdit task={task} onStopTaskEdit={handleStopTaskEdit} />
                    : <TaskShow task={task} />}
            </CardContent>
        </Card>
    )
}

export default TaskCard