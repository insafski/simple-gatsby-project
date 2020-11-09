import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import hash from "crypto-js";

import Api from "../../configs/api";
import useInput from "../../components/CustomHooks";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export function SignIn() {
    window.ss = hash;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const [loginInput, loginClear] = useInput();
    const [passwordInput, passwordClear] = useInput();
    const [nameInput, nameClear] = useInput();

    const login = loginInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;

    const authApi = new Api();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSignIn = () => {
        const onSuccess = (data) => {
            setDisabled(false);
            if (data.auth) {
                setOpen(false);
                loginClear();
                passwordClear();
            }
        };
        const onError = () => {
            setDisabled(false);
        };

        if (login && password) {
            setDisabled(true);

            authApi
                .signIn({ login, password })
                .then(onSuccess)
                .catch(onError);
        }
    };

    const onSignUp = () => {
        authApi
            .signUp({ login, password, name })
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (login && password && disabledButton) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [login, password]);

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Sign in
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid
                            container
                            direction={"column"}
                            alignItems={"center"}
                        >
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    {/* <LockOutlinedIcon /> */}
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                            </Grid>
                        </Grid>
                        <FormControl className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                disabled={disabled}
                                {...loginInput}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                disabled={disabled}
                                {...passwordInput}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="Name"
                                type="text"
                                id="name"
                                autoComplete="text"
                                disabled={disabled}
                                {...nameInput}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={disabledButton}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSignIn();
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSignUp();
                                }}
                            >
                                Sign Up
                            </Button>
                            <Grid
                                container
                                direction={"column"}
                                alignItems={"center"}
                            >
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
