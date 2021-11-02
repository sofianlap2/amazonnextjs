import { Button, List, ListItem, TextField, Typography, Link } from '@material-ui/core'
import React, {useState} from 'react'
import Layout from '../components/Layout'
import useStyles from '../utils/styles'
import NextLink from 'next/link';
import axios from 'axios';

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/users/login', {email, password})
            alert('success login')
        } catch (err) {
            alert(err.response.date ? err.response.data.message : err.message);
        }
        
    }

    return (
        <Layout title="Login">
            <form onSubmit={submitHandler}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem>
                        <TextField 
                        variant="outlined"
                        fullWidth id="email" 
                        label="Email"
                        inputProps={{type: 'email'}}
                        onChange={e => setEmail(e.target.value)}
                        >
                        </TextField>

                        <TextField 
                        variant="outlined"
                        fullWidth id="password" 
                        label="Password"
                        inputProps={{type: 'password'}}
                        onChange={e => setPassword(e.target.value)}
                        >
                        </TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>
                    <ListItem>
                        Don't have an account? <NextLink href="/register" passHref><Link>Register</Link></NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
