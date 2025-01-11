import { Typography } from '@mui/material'
import { Board } from '../../../../../types/interfaces'
import { MouseEventHandler } from 'react'

interface BoardInfoShowProps {
    boardTitle: Board['title']
    boardDesc: Board['desc']
    onClick: MouseEventHandler<HTMLSpanElement> | undefined
}

function BoardInfoShow({ boardTitle, boardDesc, onClick }: BoardInfoShowProps) {
    return (
        <>
            <Typography variant='h6'
                id='board-title'
                onClick={onClick}
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: 1,
                    fontWeight: 'bold',
                }}>
                {boardTitle}
            </Typography>
            <Typography variant='body1'
                id='board-body'
                onClick={onClick}
                sx={{
                    marginY: 1,
                    textAlign: 'center'
                }}>
                {boardDesc}
            </Typography >
        </>
    )
}

export default BoardInfoShow