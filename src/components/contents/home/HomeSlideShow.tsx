import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography } from '@mui/material'
import Cover1 from '../../../assets/cover1.png'
import Cover2 from '../../../assets/cover2.png'
import Cover3 from '../../../assets/cover3.png'
import Cover4 from '../../../assets/cover4.png'

export default function HomeSlideShow() {
    const items = [
        {
            name: "TaskBoard",
            text: "Simplify collaboration, amplify productivity.",
            image: Cover1,
            textAlign: "flex-start",
        },
        {
            name: "Collaboration",
            text: "Your tasks, your team, one seamless platform.",
            image: Cover2,
            textAlign: "flex-end",
        },
        {
            name: "Organization",
            text: "Turn chaos into clarity with TaskBoard.",
            image: Cover3,
            textAlign: "flex-start",
        },
        {
            name: "Teamwork",
            text: "Where teamwork meets task mastery.",
            image: Cover4,
            textAlign: "flex-end",
        },
    ]

    return (

        <Carousel
            sx={{ width: '100vw' }}
            indicatorContainerProps={{
                style: {
                    position: 'absolute',
                    bottom: 10,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1,
                }
            }}
        >
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item({ item }: any) {
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                aspectRatio: '32/9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: `${item.textAlign}`,
                color: '#fff',
                p: 4
            }}
        >
            <Typography variant="h3">{item.name}</Typography>
            <Typography variant="h6">{item.text}</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Learn More
            </Button>
        </Paper>
    )
}