import React, { useState, useEffect } from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText, Option } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Tulos";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Moment from './Moment';
import ShearForce from './ShearForce';


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
    nimi: '',
    pituusL: '',
    pituusA: '',
    pituusB: '',
    kuormaTV: '',
    kuormaPK: '',
    kuormaPM: '',
    barType: '',
    maxM: '',
    maxV: '',
    dateOfJoining: '',
    photoFileName: ''
}

const TulosForm = ({ classes, ...props }) => {

    const [arvot, setArvot] = useState();
    const [maxMomentChange_backend, setMaxMomentChange_backend] = useState("");
    const [maxShearChange_backend, setMaxShearChange_backend] = useState("");
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
        if ('nimi' in fieldValues)
            temp.nimi = fieldValues.nimi ? "" : "This field is required."
        if ('pituusL' in fieldValues)
            temp.pituusL = fieldValues.pituusL ? "" : "This field is required."
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

    // Lisätään tähän muuttujat, joita tarvitaan maxM ja maxV laskentaan
    const calculateParameterForm = () => {
        setArvot({
            ...values
        })
        console.log("values: ", values);
        console.log("values.pituusL: ", values.pituusL);
    }

    // haetaan maksimi momentin arvo Moment.js:stä
    const handleMaxMomentChange_backend = (newMoment) => {
        console.log("newMoment (handleMaxMomentChange):", newMoment);
        setMaxMomentChange_backend(newMoment);
    }

    // haetaan maksimi momentin arvo Moment.js:stä
    const handleMaxShearChange_backend = (newShearForce) => {
        console.log("newShearForce (handleMaxShearChange):", newShearForce);
        setMaxShearChange_backend(newShearForce);
    }

    return (
        <div>

            <Moment
                arvot={arvot}
                maxMomentChange_backend={handleMaxMomentChange_backend}
            />

            <ShearForce
                arvot={arvot}
                maxShearChange_backend={handleMaxShearChange_backend} />

            <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} >
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            name="nimi"
                            variant="outlined"
                            label="Nimi"
                            value={values.nimi}
                            onChange={handleInputChange}
                            {...(errors.nimi && { error: true, helperText: errors.nimi })}
                        />
                        <TextField
                            name="pituusL"
                            variant="outlined"
                            label="PituusL"
                            value={values.pituusL}
                            onChange={handleInputChange}
                            {...(errors.pituusL && { error: true, helperText: errors.pituusL })}
                        />

                        <TextField
                            name="pituusA"
                            variant="outlined"
                            label="pituusA"
                            value={values.pituusA}
                            onChange={handleInputChange}
                            {...(errors.pituusA && { error: true, helperText: errors.pituusA })}
                        />
                        <TextField
                            name="pituusB"
                            variant="outlined"
                            label="pituusB"
                            value={values.pituusB}
                            onChange={handleInputChange}
                            {...(errors.pituusB && { error: true, helperText: errors.pituusB })}
                        />
                        <TextField
                            name="kuormaTV"
                            variant="outlined"
                            label="kuormaTV"
                            value={values.kuormaTV}
                            onChange={handleInputChange}
                            {...(errors.kuormaTV && { error: true, helperText: errors.kuormaTV })}
                        />
                        <TextField
                            name="kuormaPK"
                            variant="outlined"
                            label="kuormaPK"
                            value={values.kuormaPK}
                            onChange={handleInputChange}
                            {...(errors.kuormaPK && { error: true, helperText: errors.kuormaPK })}
                        />
                        <TextField
                            name="kuormaPM"
                            variant="outlined"
                            label="kuormaPM"
                            value={values.kuormaPM}
                            onChange={handleInputChange}
                            {...(errors.kuormaPM && { error: true, helperText: errors.kuormaPM })}
                        />
                        {/*
                        <TextField
                        name="forceType"
                        variant="outlined"
                        label="forceType"
                        value={values.forceType}
                        onChange={handleInputChange}
                        {...(errors.forceType && { error: true, helperText: errors.forceType })}
                    />
                     */}




                        <FormControl variant="outlined"
                            className={classes.formControl}
                            {...(errors.forceType && { error: true })}
                        >
                            <InputLabel >ForceType</InputLabel>
                            <Select
                                name="forceType"
                                defaultValue=""
                                value={values.forceType ?? ""}
                                onChange={handleInputChange}
                            >

                                {props.KuormaTyyppiList.map((record, index) => {
                                    return (
                                        <MenuItem key={index} value={record.tyyppi}>
                                            {record.tyyppi}
                                        </MenuItem>)
                                })}
                            </Select>

                        </FormControl>

                        <TextField
                            name="maxM"
                            variant="outlined"
                            label="maxM"
                            value={maxMomentChange_backend}
                            onChange={handleInputChange}
                            {...(errors.maxM && { error: true, helperText: errors.maxM })}
                        />
                        <TextField
                            name="maxV"
                            variant="outlined"
                            label="maxV"
                            value={maxShearChange_backend}
                            onChange={handleInputChange}
                            {...(errors.maxV && { error: true, helperText: errors.maxV })}
                        />
                        <TextField
                            name="dateOfJoining"
                            variant="outlined"
                            label="dateOfJoining"
                            value={values.dateOfJoining}
                            onChange={handleInputChange}
                            {...(errors.dateOfJoining && { error: true, helperText: errors.dateOfJoining })}
                        />
                        <TextField
                            name="photoFileName"
                            variant="outlined"
                            label="photoFileName"
                            value={values.photoFileName}
                            onChange={handleInputChange}
                            {...(errors.photoFileName && { error: true, helperText: errors.photoFileName })}
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
                            <Button
                                variant="contained"
                                className={classes.smMargin}
                                onClick={calculateParameterForm}
                            >
                                CalculateParameter
                            </Button>
                        </div>

                    </Grid>



                </Grid>
            </form>

        </div>
    );
}

const mapStateToProps = state => ({
    TulosList: state.Tulos.list,
    KuormaTyyppiList: state.KuormaTyyppi.list2
})

const mapActionToProps = {
    createTulos: actions.create,
    updateTulos: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TulosForm));
