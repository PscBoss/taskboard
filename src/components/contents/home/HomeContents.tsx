import { styled } from '@mui/material/styles';
import HomeSlideShow from './HomeSlideShow';
import DemoDashboard from './DemoDashboard';
import { Stack } from '@mui/material';

const Content = styled('div')(({ theme }) => ({
    marginTop: theme.mixins.toolbar.minHeight,
}));

function HomeContents() {
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
                <HomeSlideShow />
                <DemoDashboard />
            </Stack>
        </Content >
    )
}

export default HomeContents