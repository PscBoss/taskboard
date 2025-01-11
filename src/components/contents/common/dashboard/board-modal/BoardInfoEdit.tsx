import { useEffect, useRef, useState } from 'react'
import { Board } from '../../../../../types/interfaces'
import { Box, FormControl, TextField } from '@mui/material'

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

    // Effect to detect clicks outside the element
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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
    }, [editingBoard, isEditingBoard]);

    return (
        <FormControl sx={{ width: 1 }}>
            <Box ref={elementRef}>
                <TextField id="Board Title"
                    size='medium'
                    sx={{
                        m: 5
                    }}
                    value={editingBoard.title}
                    label="Board Title"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setEditingBoard((prevBoard) => ({ ...prevBoard, title: e.target.value }))}
                />
                <TextField id="Board Details"
                    size='small'
                    value={editingBoard.desc}
                    label="Board Descriptions"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEditingBoard((prevBoard) => ({ ...prevBoard, desc: e.target.value }))}
                    multiline />
            </Box>
        </FormControl>
    )
}

export default BoardInfoEdit