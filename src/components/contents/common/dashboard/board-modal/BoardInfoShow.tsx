import { Box, Typography } from '@mui/material'
import { Board } from '../../../../../types/interfaces'

interface BoardInfoShowProps {
    boardTitle: Board['title']
    boardDesc: Board['desc']
    onClick: React.MouseEventHandler<HTMLDivElement>
}

function BoardInfoShow({ boardTitle, boardDesc, onClick }: BoardInfoShowProps) {
    return (
        <Box onClick={onClick}>
            <Typography variant='h6'
                id='board-title'
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
                sx={{
                    marginY: 1,
                    textAlign: 'center'
                }}>
                {boardDesc}
            </Typography >
        </Box>
    )
}

export default BoardInfoShow