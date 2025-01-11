import { Box } from '@mui/material'
import { Board } from '../../../../types/interfaces'
import BoardComponents from './BoardComponent'
import CreateBoard from './CreateBoard'

interface DashboardSegmentProps {
    boards: Board[]
}

function DashboardSegment({ boards }: DashboardSegmentProps) {

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
        <>
            <Box sx={sectionStyle}>
                {boards.map((board) => (
                    <BoardComponents key={board.id} board={board} />
                ))}
                <CreateBoard />
            </Box >
        </>
    )
}

export default DashboardSegment