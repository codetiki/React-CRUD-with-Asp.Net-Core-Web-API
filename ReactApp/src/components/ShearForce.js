import React, { useState } from 'react'


const ShearForce = (props) => {

    const { length,
        lengthA,
        lengthB,
        load,
        pointForce,
        pointMoment,
        force,
        shearChange,
        maxShearChange,
        forceType,
        formData,
        setFormData,
        arvot,
        maxShearChange_backend
    } = props;
    const [maxShearForce, setMaxShearForce] = useState("");
    let [shearForce, setshearForce] = useState([]);
    let s5 = 0;
    let L = Number(lengthA) + Number(lengthB);

    const [maxShear_backend, setMaxShear_backend] = useState("");

    // Palkin momentti
    // tasainen kuorma q [kN/m]
    // V = -q/2 * (L + x)
    const calculateShearForce = () => {
        // Parametri TulosForm.js:stä
        let pituus = arvot.pituusL;
        let kuorma = arvot.kuormaTV;

        // lasketaan leikausvoima-arvot taulukkoon
        let shearForces = [];

        // backend laskenta
        let s5_backend = - kuorma * (pituus) / 2;
        console.log("s5_backend:", s5_backend); // tulee luku
        setMaxShear_backend(s5_backend);
        maxShearChange_backend(s5_backend);

        // TV-mom laskenta kunnossa
        if (forceType == "TV") {
            s5 = - load * (length) / 2;
            console.log("max shearForce:", s5);
            setMaxShearForce(s5);
            // haetaan taulukkoon leikkausvoiman maksimiarvo
            setFormData({ ...formData, maxV: s5 });

            for (var i = 0; i <= 20; i++) {
                let shear = - load * (length - 2 * (i * length / 20)) / 2;
                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shearForces:", shearForces);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }
        // PK-shear laskenta kunnossa
        if (forceType == "PK") {
            if (lengthA > lengthB) {
                s5 = - pointForce * lengthA / L;
                console.log("max shearForce:", s5);
                setMaxShearForce(s5);
                setFormData({ ...formData, maxV: s5 });
            } else if (lengthA < lengthB) {
                s5 = - pointForce * lengthB / L;
                console.log("max shearForce:", s5);
                setMaxShearForce(s5);
                setFormData({ ...formData, maxV: s5 });
            }

            for (var i = 0; i <= 20; i++) {
                let shear = 0;
                if (i * L / 20 <= lengthA) {
                    shear = - pointForce * lengthB / L;
                }
                else if (i * L / 20 >= lengthA) {
                    shear = pointForce * lengthA / L;
                }

                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shear:", shear);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }
        // PM-shear laskenta kunnossa
        if (forceType == "PM") {

            s5 = - pointMoment / L;
            console.log("max shearForce:", s5);
            setMaxShearForce(s5);
            setFormData({ ...formData, maxV: s5 });

            for (var i = 0; i <= 20; i++) {
                let shear = 0;
                shear = - pointMoment / L;
                shearForces.push(shear);
                setshearForce(shearForces);
                console.log("shearForces:", shearForces);
            }

            shearChange(shearForces);
            maxShearChange(s5);
        }


    }


    return (
        <div>
            <button onClick={calculateShearForce}>Laske leikkausvoima</button>



        </div>

    )
}

export default ShearForce
