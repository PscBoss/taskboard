import { useEffect, useRef, useState } from 'react'
import { Board } from '../../../../../types/interfaces'
import { FormControl, Paper, TextField } from '@mui/material'

interface BoardInfoEditProps {
    boardId: Board['id']
    boardTitle: Board['title']
    boardDesc: Board['desc']
    isEditingBoard: boolean
    setIsEditingBoard: React.Dispatch<React.SetStateAction<boolean>>
    onStopBoardEdit: (editingBoard: {
        id: Board['id']
        title: Board['title'];
        desc: Board['desc'];
    }) => void
}

function BoardInfoEdit({ boardId, boardTitle, boardDesc, isEditingBoard, setIsEditingBoard, onStopBoardEdit }: BoardInfoEditProps) {
    // State for recording the changes to the board info (track changes in the input fields)
    const [editingBoard, setEditingBoard] = useState({ id: boardId, title: boardTitle, desc: boardDesc })
    // Ref to the element for detecting clicks outside the element
    const elementRef = useRef<HTMLDivElement>(null);
    const ignoreClickOutside = useRef(false);

    useEffect(() => {
        if (isEditingBoard) {
            ignoreClickOutside.current = true;
            setTimeout(() => {
                ignoreClickOutside.current = false;
            }, 100);
        }
    }, [isEditingBoard]);

    // Effect to detect clicks outside the element
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ignoreClickOutside.current) {
                return;
            }
            if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
                onStopBoardEdit(editingBoard);
                setIsEditingBoard(false);
            }
        };

        // Add event listener to the document
        document.addEventListener("click", handleClickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("click", handleClickOutside);
        };
    }, [editingBoard]);
    return (
        <FormControl sx={{ width: 1 }}>
            <Paper
                ref={elementRef}
                elevation={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <TextField id="Board Title"
                    size='medium'
                    sx={{
                        m: 1
                    }}
                    value={editingBoard.title}
                    label="Board Title"
                    variant="standard"
                    onChange={(e) => setEditingBoard((prevBoard) => ({ ...prevBoard, title: e.target.value }))}
                />
                <TextField id="Board Details"
                    size='small'
                    sx={{
                        m: 1
                    }}
                    value={editingBoard.desc}
                    label="Board Descriptions"
                    variant="outlined"
                    onChange={(e) => setEditingBoard((prevBoard) => ({ ...prevBoard, desc: e.target.value }))}
                    multiline
                    minRows={2}
                />
            </Paper>
        </FormControl>
    )
}

export default BoardInfoEdit