import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link'
import {AppBar, Container, CssBaseline, createTheme , Link, MuiThemeProvider, Toolbar, Typography} from "@material-ui/core"
import useStyles from '../utils/styles';


export default function Layout({title, description,  children}) {

    const theme = createTheme({
        typography: {
            h1 : {
                fontSize: '1.6rem',
                fontWeight: 400,
                margin: '1rem 0',
            },
            h2 : {
                fontSize: '1.4rem',
                fontWeight: 400,
                margin: '1rem 0',
            }
        },
        palette: {
            type: 'light',
            primary: {
                main: '#f0f000'
            },secondary: {
                main: '#208080',
            }
        }
    })
    const classes = useStyles();

    return (
        <div>
            <Head>
                <title>{title? `${title} - Next Amazona` : 'Next Amazona'}Next Amazona</title>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline /> 
                <AppBar className={classes.navbar} position="static">
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>amazona</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}>
                            <NextLink href="/cart" passHref>
                                <Link>Cart</Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        </div>
                    </Toolbar> 
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>All rights reserved. Next Amazona</Typography>
                </footer>
            </MuiThemeProvider>
        
        </div>
    )
}
