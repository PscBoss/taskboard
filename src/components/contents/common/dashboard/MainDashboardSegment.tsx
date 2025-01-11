import { Box } from '@mui/material'
import { Board } from '../../../../types/interfaces'
import BoardComponents from './BoardComponent'
import CreateBoard from './CreateBoard'
import { useState } from 'react'

interface DashboardSegmentProps {
    boardsData: Board[]
}

function DashboardSegment({ boardsData }: DashboardSegmentProps) {

    const sectionStyle = {
        width: '100vw',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }

    const boardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px',
        height: '250px',
        justifyContent: 'flex-start',
        padding: 4,
        margin: 5
    }

    const handleDelete = (boardId: Board['id']) => {
        setBoards((boards) => boards.filter((board) => board.id !== boardId))
    }

    const [boards, setBoards] = useState(boardsData)

    return (
        <>
            <Box sx={sectionStyle}>
                {boards.map((board) => (
                    <BoardComponents key={board.id} board={board} onDelete={handleDelete} sx={boardStyle} />
                ))}
                <CreateBoard setBoards={setBoards} sx={boardStyle} />
            </Box >
        </>
    )
}

export default DashboardSegment