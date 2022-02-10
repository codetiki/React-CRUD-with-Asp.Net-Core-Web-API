import React, { useState, useEffect } from "react";


const useForm = (initialFieldValues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }

    // Lisätään tähän muuttujat, joita tarvitaan maxM ja maxV laskentaan
    const calculateParameterForm = () => {
        setValues({
            ...values
        })
        console.log("values: ", values);
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        calculateParameterForm
    };
}

export default useForm;