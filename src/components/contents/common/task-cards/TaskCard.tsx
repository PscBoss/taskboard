import { SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Task } from '../../../../types/interfaces';
import { useDraggable } from '@dnd-kit/core';
import { useRef } from 'react';
import TaskShow from './sub/TaskShow';
import TaskEdit from './sub/TaskEdit';
import { useTaskEdit } from './sub/TaskEditContext';

type TaskCardProps = {
    task: Task
    isOverStyle?: SxProps
    onStopTaskEdit: (task: Task) => void
}

function TaskCard({ task, isOverStyle, onStopTaskEdit }: TaskCardProps) {
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

    return (
        <Card
            {...(isEditing ? {} : { ref: setNodeRef })}
            {...(isEditing ? {} : listeners)}
            {...(isEditing ? {} : attributes)}
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
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <CardContent>
                {(isEditing)
                    ? <TaskEdit task={task} onStopTaskEdit={onStopTaskEdit} />
                    : <TaskShow task={task} />}
            </CardContent>
        </Card>
    )
}

export default TaskCard