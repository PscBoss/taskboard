import { Box } from "@mui/material";
import { mockBoards } from "../../../assets/mockupBoard";
import DashboardSegment from "../common/dashboard/DashboardSegment";
import { Board } from "../../../types/interfaces";

function MemberDashBoard() {
    // Filter boards created by "Me"
    const myBoards: Board[] = mockBoards.filter((board: Board) => board.creator === "Me");

    // Get a list of unique creators (excluding "Me")
    const uniqueCreators: string[] = mockBoards
        .map((board: Board) => board.creator)
        .filter((creator, index, self) => creator !== "Me" && self.indexOf(creator) === index);

    return (
        <Box
            sx={{
                background: "linear-gradient(to right, rgb(228, 204, 232), rgb(255, 229, 229), #ffebee)",
                width: 1,
                p: 2,
            }}
        >
            {/* My Boards Segment */}
            <DashboardSegment segmentName="My Boards" boardsData={myBoards} />

            {/* Other Creators' Boards */}
            {uniqueCreators.map((creator) => {
                const creatorBoards = mockBoards.filter((board: Board) => board.creator === creator);
                return (
                    <DashboardSegment
                        key={creator}
                        segmentName={`${creator}'s Boards`}
                        boardsData={creatorBoards}
                    />
                );
            })}
        </Box>
    );
}

export default MemberDashBoard;