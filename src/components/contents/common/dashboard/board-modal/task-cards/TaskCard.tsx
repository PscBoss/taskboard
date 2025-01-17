import { SxProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Task } from '../../../../../../types/interfaces';
import { useEffect, useRef, useState } from 'react';
import TaskShow from './sub/TaskShow';
import TaskEdit from './sub/TaskEdit';
import { useTaskEdit } from './sub/TaskEditContext';
import { useSortable } from '@dnd-kit/sortable';

type TaskCardProps = {
    task: Task
    isOverStyle?: SxProps
    onStopTaskEdit: (task: Task) => void
    onDeleteTask: (TaskId: number) => void;
}

function TaskCard({ task, isOverStyle, onStopTaskEdit, onDeleteTask }: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: task.id,
        disabled: isEditing
    });

    useEffect(() => { setIsEditing(editingTaskId === task.id), [editingTaskId] })

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            transition
        }
        : undefined;

    const { editingTaskId, setEditingTaskId } = useTaskEdit();
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
            ref={setNodeRef}
            {...attributes}
            {...listeners}
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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <CardContent>
                {(isEditing)
                    ? <TaskEdit task={task}
                        onStopTaskEdit={onStopTaskEdit}
                    />
                    : <TaskShow task={task} onDeleteTask={onDeleteTask}
                    />}
            </CardContent>
        </Card>
    )
}

export default TaskCard