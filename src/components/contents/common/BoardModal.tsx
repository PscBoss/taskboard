import { Box, Modal, Paper, SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import ReorderIcon from '@mui/icons-material/Reorder';

type BoardModalProps = {
    title?: string
    desc?: string
    tasks?: { detail: string, status: string }[]
    open: boolean
    onClose: () => void
    modalStyle?: SxProps
};

const taskColumnStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginX: 1,
};

function BoardModal({ title, desc, open, onClose, modalStyle, tasks = [] }: BoardModalProps) {
    const todoTasks = tasks.filter((task) => task.status === 'To Do');
    const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
    const doneTasks = tasks.filter((task) => task.status === 'Done');
    return (
        <Modal open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
        >
            <Box sx={modalStyle}>
                <Typography variant='h6' id='modal-title'
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        marginBottom: 1,
                        fontWeight: 'bold',
                    }}>
                    {title}
                </Typography>
                <Typography variant='body1' sx={{ marginY: 1, textAlign: 'center' }}>{desc}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Box sx={taskColumnStyle}>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                marginY: 1,
                            }}
                        >
                            <Typography fontWeight={'bold'}>To Do</Typography>

                        </Paper>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {todoTasks.map((task) => (
                                <Box sx={{ display: 'flex' }}><ReorderIcon /><Typography component="span">{task.detail}</Typography></Box>
                            ))}
                        </Paper>
                    </Box>
                    <Box sx={taskColumnStyle}>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                marginY: 1,
                            }}
                        >
                            <Typography fontWeight={'bold'}>In Progress</Typography>
                        </Paper>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {inProgressTasks.map((task) => (
                                <Box sx={{ display: 'flex' }}>
                                    <ReorderIcon />
                                    <Typography component="span">
                                        {task.detail}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                    <Box sx={taskColumnStyle}>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                                textAlign: 'center',
                                marginY: 1,
                            }}
                        >
                            <Typography fontWeight={'bold'}>Done</Typography>
                        </Paper>
                        <Paper elevation={3}
                            sx={{
                                width: '100%',
                            }}
                        >
                            {doneTasks.map((task) => (
                                <Box sx={{ display: 'flex' }}>
                                    <ReorderIcon />
                                    <Typography component="span">
                                        {task.detail}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                </Box>
            </Box >
        </Modal >
    )
}

export default BoardModal