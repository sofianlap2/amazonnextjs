import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core'
import React, {useState, useContext} from 'react'
import { useRouter } from 'next/router';
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link';
import axios from 'axios';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import {useSnackbar} from 'notistack';

export default function Login() {
    const {handleSubmit, control, formState: {errors}} = useForm();
    const { enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    const {state, dispatch} = useContext(Store);
    const {userInfo} = state;
    if (userInfo) {
        router.push('/');
    }
    const classes = useStyles();

    const submitHandler = async({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await axios.post('/api/users/login', {email, password})
            dispatch({type: 'USER_LOGIN', payload: data})
            Cookies.set('userInfo', data);
            router.push(redirect || '/');
            
        } catch (err) {
            enqueueSnackbar(err.response.date ? err.response.data.message : err.message, {
                variant: 'error'
            });
        }
        
    }

    return (
        <Layout title="Login">
            <form onSubmit={handleSubmit(submitHandler)}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required:true,
                                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            }}
                            render={({ field }) => (
                                <TextField 
                                    variant="outlined"
                                    fullWidth id="email" 
                                    label="Email"
                                    inputProps={{type: 'email'}}
                                    error={Boolean(errors.email)}
                                    helperText=
                                    {
                                        errors.email? 
                                        errors.email.type === 'pattern' ? 
                                        'Email is not valid' : 
                                        'Email is required' : ''
                                    }
                                    {...field}
                                    >
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                    <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required:true,
                                minLength: 6
                            }}
                            render={({ field }) => (
                                <TextField 
                                    variant="outlined"
                                    fullWidth id="password" 
                                    label="Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.password)}
                                    helperText=
                                    {
                                        errors.password? 
                                        errors.password.type === 'minLength' ? 
                                        'Password length is more than 5' : 
                                        'Password is required' : ''
                                    }
                                    {...field}
                                    >
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account? <NextLink href={`/register?redirect=${redirect || '/'}`} passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
