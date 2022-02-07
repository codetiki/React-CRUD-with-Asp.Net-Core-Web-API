import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/Tulos";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import TulosForm from "./TulosForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Tulokset = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    // const [x, setX] = useState(0);
    // setX(5);

    useEffect(() => {
        props.fetchAllTulokset()
    }, []) //componentDidMount


    //toast msg.
    // const { addToast } = useToasts()
    const onEdit = (id) => {
        setCurrentId(id);
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteTulos(id)
    }


    return (
        <Paper className={classes.paper} elevation={3} >
            <Grid container>
                <Grid item xs={6}>
                    <TulosForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Tyyppi</TableCell>
                                    <TableCell>Kuvaus</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.TulosList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.tyyppi}</TableCell>
                                            <TableCell>{record.kuvaus}</TableCell>

                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => onEdit(record.id)} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>


                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    )
        ;
}

const mapStateToProps = state => ({
    TulosList: state.Tulos.list
});

const mapActionToProps = {
    fetchAllTulokset: actions.fetchAll,
    deleteTulos: actions.Delete
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Tulokset)); 