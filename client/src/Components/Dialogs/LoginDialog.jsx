import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { authenticateLogin, authenticateSignup } from '../../service/api';

const useStyle = makeStyles({
    component: {
        height: '70vh',
        width: '90vh',
        maxWidth: 'unset !important'
    },
    image: {
        backgroundImage: `url(${'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'})`,
        background: '#2874f0',
        backgroundPosition: 'center 85%',
        backgroundRepeat: 'no-repeat',
        height: '70vh',
        width: '40%',
        padding: '45px 35px',
        '& > *': {
            color: '#FFFFFF',
            fontWeight: 600
        }
    },
    login: {
        padding: '25px 35px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        '& > *': {
            marginTop: 20
        }
    },
    loginbtn: {
        textTransform: 'none',
        background: '#FB641B',
        color: '#fff',
        height: 48,
        borderRadius: 2
    },
    requestbtn: {
        textTransform: 'none',
        background: '#fff',
        color: '#2874f0',
        height: 48,
        borderRadius: 2,
        boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)'
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    createText: {
        margin: 'auto 0 5px 0',
        textAlign: 'center',
        color: '#2874f0',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer'
    },
    error: {
        fontSize: 10,
        color: '#ff6161',
        lineHeight: 0,
        marginTop: 10,
        fontWeight: 600
    }
})

const loginInitialValues = {
    email: '',
    password: ''
};

const signupInitialValues = {
    userName: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to Job Posts and Applications'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();  //css styles
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, showError] = useState(false);
    const [ account, toggleAccount ] = useState(accountInitialValues.login);

    const [selectedOption, setSelectedOption] = useState('Employer');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(!response) 
            showError(true);
        else {
            showError(false);
            handleClose();
            setAccount(response.data);
            console.log("response data")
            console.log(response.data)
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(signup);
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent className={classes.component} >
                <Box style={{display: 'flex'}}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === 'login' ? 
                        <Box className={classes.login}>
                            <TextField onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            { error && <Typography className={classes.error} >Please enter valid Email ID/Mobile number</Typography> }
                            <TextField onChange={(e) => onValueChange(e)} name='password' label='Enter Password' />
                            <Typography className={classes.text}>By continuing, you agree to MiniLinkedln's Terms of Use and Privacy Policy.</Typography>
                            <Button className={classes.loginbtn} onClick={() => loginUser()} >Login</Button>
                            <Typography className={classes.text} style={{textAlign:'center'}}>OR</Typography>
                            <Button className={classes.requestbtn}>Request OTP</Button>
                            <Typography className={classes.createText} onClick={() => toggleSignup()}>New to MiniLinkedln? Create an account</Typography>
                        </Box> : 
                        <Box className={classes.login}>
                            <TextField onChange={(e) => onInputChange(e)} name='userName' label='Enter Username' />
                            <TextField onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <TextField onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />
                            <TextField onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                            <label>
                                <input
                                type="radio"
                                name="options"
                                value="Employer"
                                checked={selectedOption === 'Employer'}
                                onChange={handleOptionChange}
                                />
                                Employer
                            </label>
                            <label>
                                <input
                                type="radio"
                                name="options"
                                value="Employee"
                                checked={selectedOption === 'Employee'}
                                onChange={handleOptionChange}
                                />
                                Employee
                            </label>
                            </div>
                            <Button className={classes.loginbtn} onClick={() => signupUser()} >Continue</Button>
                        </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog;