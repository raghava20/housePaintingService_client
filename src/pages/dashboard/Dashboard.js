import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

// material ui
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material'

// redux
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../redux/actions/authActions';

// components
import Items from '../../components/Items';

// images
import image from "../../images/landingimage.jpg"
import img1 from "../../images/img1.jpg";
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg";
import img4 from "../../images/img4.jpg";
import img5 from "../../images/img5.jpg";
import img6 from "../../images/img6.jpg";
import img7 from "../../images/img7.jpg";
import img8 from "../../images/img8.jpg";

const useStyles = makeStyles((theme) => ({
    presentation: {
        display: "flex",
        width: "90%",
        margin: "auto",
        minHeight: "80vh",
        alignItems: "center",
        // eslint-disable-next-line
        ["@media (max-width:1024px)"]: {
            flexDirection: "column",
        },
    },
    introduction: {
        flex: 1,
        paddingLeft: 60,
        height: "340px",
        // eslint-disable-next-line
        ["@media (max-width:600px)"]: {
            paddingLeft: 10,
        },
    },
    painting: {
        fontSize: 64,
        fontWeight: 400,
        marginTop: 10,
        // eslint-disable-next-line
        ["@media (max-width:600px)"]: {
            fontSize: 40,

        },
    },
    delivery: {
        color: "#157a21",
        fontSize: 64,
        fontWeight: "bold",
        marginTop: -30,
        marginBottom: 20,
        // eslint-disable-next-line
        ["@media (max-width:600px)"]: {
            fontSize: 40,
        },
    },
    paragraph: {
        width: 400,
        fontSize: 14.5,
        // eslint-disable-next-line
        ["@media (max-width:600px)"]: {
            fontSize: 11,
            width: 280
        },
    },
    cover: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        height: "72vh",
    },
    coverImg: {
        height: "100%",
        width: "90%",
    },
    ctaOrder: {
        fontSize: 18,
        marginTop: 30,
        // eslint-disable-next-line
        ["@media (max-width:600px)"]: {
            fontSize: 12,
        },
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserData())
    }, [])
    const { authenticated, cart: { items } } = useSelector(state => state.auth)

    const totalItems = [{
        id: "621cb1bccdcf98c58184a34b",
        image: img1,
        title: "Interior painting",
        price: 1500,
    }, {
        id: "621cb22ecdcf98c58184a34c",
        image: img2,
        title: "Exterior painting",
        price: 2000,
    }, {
        id: "621cb27acdcf98c58184a34d",
        image: img3,
        title: "Textures & Stencils",
        price: 3500,
    }, {
        id: "621cb2a7cdcf98c58184a34e",
        image: img4,
        title: "Metal Painting",
        price: 2000
    }, {
        id: "621cb2cacdcf98c58184a34f",
        image: img5,
        title: "Wood painting",
        price: 1000
    }, {
        id: "621cb2dccdcf98c58184a350",
        image: img7,
        title: "Standard 1HBK",
        price: 3000,
    }, {
        id: "621d27c0e418d7e9e4cd2d39",
        image: img6,
        title: "Standard 2HBK",
        price: 4000,
    }, {
        id: "621d27dbe418d7e9e4cd2d3a",
        image: img8,
        title: "Standard 3HBK",
        price: 6000,
    }
    ]
    return (
        authenticated ?
            (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, gap: 16, flexWrap: 'wrap' }}>
                {totalItems.map((item) => <Items existItems={items} item={item} key={item.id} />)}
            </div>
            ) :
            <section className={classes.presentation
            } >
                <div className={classes.introduction}>
                    <Typography className={classes.painting} >
                        House Painting
                    </Typography>
                    <Typography className={classes.delivery} >
                        Service
                    </Typography>
                    <Typography variant="body2" className={classes.paragraph}>
                        We Pick Colours Matching Your Personality And Give A Perfect Finish That Blends - With Curtains, Floors, Furniture And Lighting.
                    </Typography>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button variant="outlined" className={classes.ctaOrder}>
                            Book NOW
                        </Button>
                    </Link>
                </div>
                <div className={classes.cover}>
                    <img src={image} alt="safe-delivery" className={classes.coverImg} />
                </div>
            </section >
    )
}
