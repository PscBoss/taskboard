import { Box } from '@mui/material'
import { Board, Task } from '../../../../types/interfaces'
import BoardComponents from './sub/BoardComponent'
import CreateBoard from './sub/CreateBoard'
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

    const [boards, setBoards] = useState(boardsData) //state for managing boards on the dashboard.

    const handleStopBoardEdit = (editingBoard: { id: number; title: string; desc: string; }) => {
        const handleBoardUpdate = (
            updatedBoard: {
                id: number;
                title: string;
                desc: string;
            }) => {
            // Use map method to return a new array
            return boards.map(board => {
                // If this board's id matches the one to be updated
                if (board.id === updatedBoard.id) {
                    // Use spread operator to merge new properties
                    return { ...board, ...updatedBoard };
                }
                // If not, return the object unchanged
                return board;
            });
        }
        const updatedBoards = handleBoardUpdate(editingBoard)
        setBoards(() => updatedBoards)
    } // to update the boards in the board

    const handleStopTaskEdit = (editingTasks: Task[], boardId: Board['id']) => {
        const handleTaskUpdate = (editingTasks: Task[], boardId: Board['id']) => (
            boards.map(board => {
                if (board.id === boardId) {
                    const updatedTasks = board.tasks.map(task => {
                        const updatedTask = editingTasks.find(editingTask => editingTask.id === task.id);
                        return updatedTask ? { ...task, ...updatedTask } : task;
                    });
                    return { ...board, tasks: updatedTasks };
                }
                return board;
            })
        );
        const updatedBoards = handleTaskUpdate(editingTasks, boardId);
        setBoards(updatedBoards);
    }

    return (
        <>
            <Box sx={sectionStyle}>
                {boards.map((board) => (
                    <BoardComponents key={board.id}
                        board={board}
                        onStopBoardEdit={handleStopBoardEdit}
                        onDelete={handleDelete}
                        sx={boardStyle}
                        onStopTaskEdit={handleStopTaskEdit} />
                ))}
                <CreateBoard setBoards={setBoards} sx={boardStyle} />
            </Box >
        </>
    )
}

export default DashboardSegment