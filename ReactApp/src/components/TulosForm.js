import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Tulos";
import { ToastProvider, useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})


const initialFieldValues = {
    tyyppi: '',
    kuvaus: ''
}

const TulosForm = ({ classes, ...props }) => {

    //toast msg.
    // const { addToast } = useToasts()
    /*
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        console.log("values: ", values);
    }
    */
    //validate()
    //validate({fullName:'jenny'})
    // Syötettävien arvojen validointi
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tyyppi' in fieldValues)
            temp.tyyppi = fieldValues.tyyppi ? "" : "This field is required."
        if ('kuvaus' in fieldValues)
            temp.kuvaus = fieldValues.kuvaus ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values);

        if (validate()) {
            const onSuccess = () => {
                resetForm()
                // addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createTulos(values, onSuccess)
            else
                props.updateTulos(props.currentId, values, onSuccess)
        }

    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.TulosList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="tyyppi"
                        variant="outlined"
                        label="Tyyppi"
                        value={values.tyyppi}
                        onChange={handleInputChange}
                        {...(errors.tyyppi && { error: true, helperText: errors.tyyppi })}
                    />
                    <TextField
                        name="kuvaus"
                        variant="outlined"
                        label="Kuvaus"
                        value={values.kuvaus}
                        onChange={handleInputChange}
                        {...(errors.kuvaus && { error: true, helperText: errors.kuvaus })}
                    />

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>

                </Grid>



            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    TulosList: state.Tulos.list
})

const mapActionToProps = {
    createTulos: actions.create,
    updateTulos: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TulosForm));
