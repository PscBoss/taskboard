import { Box, InputAdornment, TextField } from '@mui/material'
import { Task } from '../../../../types/interfaces'
import ReorderIcon from '@mui/icons-material/Reorder';
import FormControl from '@mui/material/FormControl';
import { useEffect, useRef, useState } from 'react';
import { useTaskEdit } from './TaskEditContext';

type TaskEditProps = {
    task: Task
    onStopTaskEdit: (title?: string, details?: string) => any
}

function TaskEdit({ task, onStopTaskEdit }: TaskEditProps) {
    // Ref to the element for detecting clicks outside the element
    const elementRef = useRef<HTMLDivElement>(null);
    const { setEditingTaskId } = useTaskEdit();

    // States for recording the changes to the task (track changes in the input fields)
    const [title, setTitle] = useState(task.title);
    const [details, setDetails] = useState(task.details);

    // Effect to detect clicks outside the element
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                console.log("Clicked outside the element!");
                onStopTaskEdit(title, details);
                setEditingTaskId(null);
            }
        };

        // Add event listener to the document
        document.addEventListener("click", handleClickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <FormControl>
            <Box ref={elementRef}
                display='flex'
                flexDirection='column'>
                <TextField id="title"
                    value={title}
                    label="Task Title"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ReorderIcon />
                                </InputAdornment>
                            ),
                        },
                    }} />
                <TextField id="details"
                    value={details}
                    label="Task Details"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setDetails(e.target.value)}
                    multiline />
            </Box>
        </FormControl>
    )
}

export default TaskEdit