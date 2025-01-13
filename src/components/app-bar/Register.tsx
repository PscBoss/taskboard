import { Box, Button, FormControl, MenuItem, Modal, TextField, Typography } from '@mui/material'
import React from 'react';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Register() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <MenuItem onClick={handleOpen}>Register</MenuItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Typography id="modal-modal-title"
                            variant="h2"
                            textAlign={'center'}
                            sx={{ my: 3 }}>
                            Register
                        </Typography>
                        <FormControl>
                            <Box component='form'
                                onSubmit={(e) => { e.preventDefault() }}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <TextField variant='outlined'
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    margin='normal' />
                                <TextField variant='outlined'
                                    placeholder="Password"
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    required
                                    margin='normal' />
                                <TextField variant='outlined'
                                    placeholder="Repeat Password"
                                    id="outlined-password-input"
                                    label="Repeat Password"
                                    type="password"
                                    required
                                    margin='normal' />
                                <Button type="submit"
                                    variant="contained"
                                    sx={{
                                        p: 3,
                                        my: 10,
                                        mx: 25,
                                    }}>Log In</Button>
                            </Box>
                        </FormControl>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Register