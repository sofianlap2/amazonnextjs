import { Button, Grid, Link, MenuItem, Select, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import React , { useContext } from 'react';


export default function CartScreen() {
    const { state } = useContext(Store);
    const { cart: {cartItems}} = state;
    return <Layout title="Shopping Cart">
        <Typography component="h1" variant="h1">Shopping Cart</Typography>
        {cartItems.length === 0 ? (<div>
            Cart is empty. <NextLink href="/">GO shopping</NextLink>
        </div>) :
        (
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                <Link>
                                                    <Image src={item.image} alt={item.name} width={50} height={50}>
                                                    </Image>
                                                </Link>
                                            </NextLink>
                                        </TableCell>

                                        <TableCell>
                                            <NextLink href={`/product/${item.slug}`} passHref>
                                                <Link>
                                                   <Typography>{item.name}</Typography>
                                                </Link>
                                            </NextLink>
                                        </TableCell>

                                        <TableCell>
                                            <Select value={item.quantity}>
                                                {[...Array(item.countInStock).keys()].map((x)=> (
                                                <MenuItem key={x+1} value={x+1}>
                                                    {x + 1}
                                                </MenuItem>))}
                                            </Select>
                                        </TableCell>

                                        <TableCell>
                                            ${item.price}
                                        </TableCell>

                                        <TableCell>
                                            <Button variant="contained" color="secondary">x</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid md={3} xs={12}>
                    cart actions
                </Grid>
            </Grid>
        )
        }
    </Layout>
}
