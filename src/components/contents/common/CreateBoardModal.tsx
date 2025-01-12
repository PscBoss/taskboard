import { Modal, Box, FormControl, TextField, Button } from '@mui/material';
import { Board } from '../../../types/interfaces';
import { useState } from 'react';
import React from 'react';

interface CreateBoardModalProps {
    open: boolean
    onClose: () => void
    setBoards: React.Dispatch<React.SetStateAction<Board[]>>
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const emptyBoard: Board = {
    id: Math.floor(Math.random() * 100000),
    title: "",
    desc: "",
    creator: "Guest",
    columns: [{ id: 'to_do', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress', },
    { id: 'done', title: 'Done' }],
    tasks: [],
}

function CreateBoardModal({ open, onClose, setBoards }: CreateBoardModalProps) {
    const [newBoard, setNewBoard] = useState(emptyBoard)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBoards((prevBoards) => ([...prevBoards, newBoard]))
        onClose()
    }

    return (
        <FormControl component={"form"}>
            <Modal open={open}
                onClose={onClose}
                aria-labelledby="modal-title"
            >
                <Box sx={{ ...modalStyle, display: 'flex', flexDirection: 'column' }} component='form' onSubmit={handleSubmit}>
                    <Box sx={{ margin: 1 }}>
                        <TextField
                            id="board-name"
                            label="Board Name"
                            variant="outlined"
                            fullWidth
                            value={newBoard.title}
                            onChange={(e) => setNewBoard((board) => ({ ...board, title: e.target.value }))}
                        />
                    </Box>
                    <Box sx={{ margin: 1 }}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Board Description"
                            multiline
                            rows={6}
                            fullWidth
                            value={newBoard.desc}
                            onChange={(e) => setNewBoard((board) => ({ ...board, desc: e.target.value }))}
                        />
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        width: 1,
                        p: 5
                    }}>
                        <Button
                            variant="contained"
                            type='submit'
                            sx={{ width: '200px' }}
                        >
                            Create
                        </Button>
                        <Button
                            variant="outlined"
                            type='reset'
                            sx={{ width: '200px' }}
                            disabled={!newBoard.title && !newBoard.desc}
                            onClick={() => {
                                setNewBoard((board) => ({ ...board, title: '', desc: '' }))
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ width: '200px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal >
        </FormControl>
    )
}

export default CreateBoardModal