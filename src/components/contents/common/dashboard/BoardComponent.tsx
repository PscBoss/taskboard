import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { TaskEditProvider } from "../task-cards/TaskEditContext";
import BoardModal from "../BoardModal";

const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '200px',
    height: '200px',
    justifyContent: 'flex-start',
    padding: 2,
    margin: 2
}

function BoardComponents({ board }: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Paper elevation={3}
                sx={boardStyle}
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
                <Typography variant='body1'>{board.desc}</Typography>
            </Paper>
            <TaskEditProvider>
                <BoardModal open={open}
                    onClose={handleClose}
                    board={board}
                />
            </TaskEditProvider>
        </>
    )
}

export default BoardComponents;