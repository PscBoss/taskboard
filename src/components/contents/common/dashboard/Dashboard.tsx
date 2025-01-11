import { Box, Typography } from '@mui/material'
import { Board } from '../../../../types/interfaces'
import BoardComponents from './BoardComponent'
import CreateBoard from './CreateBoard'

interface DashboardProps {
    boards: Board[]
}

function Dashboard({ boards }: DashboardProps) {

    const sectionStyle = {
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }

    return (
        <Box sx={{
            background: "linear-gradient(to right,rgb(228, 204, 232),rgb(255, 229, 229), #ffebee)",
            flexGrow: 1,
        }}>
            <Typography variant='h4'
                sx={{
                    width: '100%',
                    paddingTop: 4,
                    paddingLeft: 4,
                    textAlign: 'start',
                }}>
                My Boards
            </Typography>
            <Box sx={sectionStyle}>
                {boards.map((board) => (
                    <BoardComponents key={board.id} board={board} />
                ))}
                <CreateBoard />
            </Box>
        </Box>
    )
}

export default Dashboard