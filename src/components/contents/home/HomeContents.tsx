import { styled } from '@mui/material/styles';
import HomeSlideShow from './HomeSlideShow';
import DemoDashboard from './DemoDashboard';
import Box from '@mui/material/Box';

const Content = styled('div')(({ theme }) => ({
    marginTop: theme.mixins.toolbar.minHeight,
}));

function MainContents() {
    return (
        <Content>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                <HomeSlideShow />
                <DemoDashboard />
            </Box>
        </Content >
    )
}

export default MainContents