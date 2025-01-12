import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import MemberDashBoard from './MemberDashBoard';

const Content = styled('div')(({ theme }) => ({
    marginTop: theme.mixins.toolbar.minHeight,
}));

function MemberContents() {
    return (
        <Content>
            <Stack
                spacing={0}
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <MemberDashBoard />
            </Stack>
        </Content >
    )
}

export default MemberContents