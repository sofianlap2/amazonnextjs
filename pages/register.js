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

export default function Register() {
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

    const submitHandler = async({name,email,password, confirmPassword}) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar('passwords dont match', {variant: 'error'});
            return;
        }
        try {
            const {data} = await axios.post('/api/users/register', {name, email, password})
            dispatch({type: 'USER_LOGIN', payload: data})
            Cookies.set('userInfo', data);
            router.push(redirect || '/');
            
        } catch (err) {
            enqueueSnackbar(err.response.date ? err.response.data.message : err.message, {variant: 'error'});
        }
        
    }

    return (
        <Layout title="Register">
            <form onSubmit={handleSubmit(submitHandler)}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List>
                <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required:true,
                                minLength: 2,
                            }}
                            render={({ field }) => (
                                <TextField 
                                    variant="outlined"
                                    fullWidth id="name" 
                                    label="Name"
                                    inputProps={{type: 'name'}}
                                    error={Boolean(errors.name)}
                                    helperText=
                                    {
                                        errors.name? 
                                        errors.name.type === 'minLenth' ? 
                                        'Name length is more than 1' : 
                                        'Name is required' : ''
                                    }
                                    {...field}
                                    >
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>

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
                    <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required:true,
                                minLength: 6
                            }}
                            render={({ field }) => (
                                <TextField 
                                    variant="outlined"
                                    fullWidth id="confirmPassword" 
                                    label="confirm Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.password)}
                                    helperText=
                                    {
                                        errors.confirmPassword? 
                                        errors.confirmPassword.type === 'minLength' ? 
                                        'confirmPassword length is more than 5' : 
                                        'confirmPassword is required' : ''
                                    }
                                    {...field}
                                    >
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Register
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account? <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
