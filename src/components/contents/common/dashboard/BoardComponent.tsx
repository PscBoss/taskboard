import { Paper, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { TaskEditProvider } from "../task-cards/TaskEditContext";
import BoardModal from "./board-modal/MainBoardModal";
import { Board } from "../../../../types/interfaces";

interface BoardComponenetsProps {
    board: Board
    onDelete: (boardId: Board['id']) => void
    sx: SxProps
    onStopBoardEdit: (editingBoard: {
        id: Board['id']
        title: Board['title'];
        desc: Board['desc'];
    }) => void
}

function BoardComponents({ board, onDelete, sx, onStopBoardEdit }: BoardComponenetsProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Paper elevation={3}
                sx={sx}
                onClick={handleOpen}
            >
                <Typography variant='h6'
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: 1,
                        fontWeight: 'bold',
                    }}>
                    {board.title}
                </Typography>
                <Typography variant='body1' textAlign='center'>{board.desc}</Typography>
            </Paper>
            <TaskEditProvider>
                <BoardModal open={open}
                    onClose={handleClose}
                    board={board}
                    onDelete={onDelete}
                    onStopBoardEdit={onStopBoardEdit}
                />
            </TaskEditProvider>
        </>
    )
}

export default BoardComponents;