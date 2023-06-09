import React, { useState, useContext } from 'react';
import { makeStyles, Box, Typography, Badge, Button } from '@material-ui/core';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import LoginDialog from '../Dialogs/LoginDialog';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';
import Profile from './Profile';

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    wrapper: {
        margin: '0 5% 0 auto', 
        display: 'flex',    
        '& > *': {
            marginRight: 50,
            textDecoration: 'none',
            color: '#FFFFFF',
            fontSize: 12,
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                color: '#2874f0',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10
            }      
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }   
    },
    login: {
        color: '#2874f0',
        background: '#FFFFFF',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        padding: '5px 40px',
        height: 32,
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            background: '#2874f0',
            color: '#FFFFFF'
        }   
    }
}));


const CustomButtons = () => {
    const classes = useStyle();
    const [ open, setOpen ] = useState(false);
    const { account, setAccount } = useContext(LoginContext);
    console.log("CustomButton")
    var x = JSON.stringify(account)
    if (account) console.log(account.user.username)
    var myObject = JSON.parse(x)
    var a = myObject.user
    
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    // let { path, url } = useRouteMatch();
    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
    // console.log(path)
    // console.log(url)
    
    const location = useLocation();
    
    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account.user.username} setAccount={setAccount} /> : 
                <Link to={`${location.pathname}`}>
                    <Button className={classes.login} variant="contained" onClick={() => openDialog() }>Login</Button>
                </Link>
            }
            { <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} /> }
        </Box>
    )
}

export default CustomButtons;