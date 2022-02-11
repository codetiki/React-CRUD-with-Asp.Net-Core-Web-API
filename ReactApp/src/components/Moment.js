import { format } from 'morgan';
import React, { useState, useEffect } from 'react'


const Moment = (props) => {

    const { length,
        lengthA,
        lengthB,
        load,
        pointForce,
        pointMoment,
        force,
        momentChange,
        maxMomentChange,
        forceType,
        formData,
        setFormData,
        arvot,
        maxMomentChange_backend
    } = props;

    /*
    // TESTI POISTA
    useEffect(() => {
        console.log("arvot.pituusL :", arvot.pituusL);
        console.log("arvot.kuormaTV :", arvot.kuormaTV);
        //console.log("arvot.pituusL :", arvot.pituusL);
    }, [arvot])
    */

    const [maxMoment, setMaxMoment] = useState("");
    let [moment, setMoment] = useState([]);
    let [barMomentResults, setBarMomentResults] = useState([{ numero: "", pituus: "", kuorma: "", tyyppi: "", maxM: "" }]); // Tähän laitetaan lasketut tulokset
    let L = Number(lengthA) + Number(lengthB);

    const [maxMoment_backend, setMaxMoment_backend] = useState("");
    // Palkin momentti
    // tasainen kuorma q [kN/m]
    // M = q*x/2 * (x - L)
    // V = -q/2 * (L + x)
    const calculateMomentLineload = () => {
        // Parametri TulosForm.js:stä
        let pituus = arvot.pituusL;
        let kuorma = arvot.kuormaTV;

        // lasketaan momentti-arvot taulukkoon
        let moments = [];

        // backend laskenta
        let m5_backend = kuorma * (5 * pituus / 10) * ((5 * pituus / 10) - pituus) / 2;
        console.log("m5_backend:", m5_backend); // tulee luku
        setMaxMoment_backend(m5_backend);
        maxMomentChange_backend(m5_backend);


        // TV-mom laskenta kunnossa
        if (forceType == "TV") {
            let m5 = load * (5 * length / 10) * ((5 * length / 10) - length) / 2;

            console.log("max moment [q=force] (1/8*q*L^2):", m5);
            setMaxMoment(m5);

            // haetaan taulukkoon momentin maksimiarvo
            setFormData({ ...formData, maxM: m5 });
            console.log("formData: ", formData);


            let numero = 1;

            for (var i = 0; i <= 20; i++) {
                numero = numero + i;
                let mom = load * (i * length / 20) * ((i * length / 20) - length) / 2;
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
                console.log("numero:", numero);
                setBarMomentResults()
            }
            momentChange(moments);
            maxMomentChange(m5);

        }
        // PK-mom laskenta kunnossa
        if (forceType == "PK") {
            let m5 = - pointForce * lengthB * lengthA / L;
            console.log("max moment PK:", m5);
            setMaxMoment(m5);
            setFormData({ ...formData, maxM: m5 });
            console.log("formData: ", formData);
            // lasketaan momentti-arvot taulukkoon
            let mom = 0;
            for (var i = 0; i <= 20; i++) {
                if (i * L / 20 <= lengthA) {
                    mom = - pointForce * lengthB * (i * L / 20) / L;
                }
                else if (i * L / 20 > lengthA) {
                    mom = - pointForce * lengthA * (L - (i * L / 20)) / L;
                }
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
            }

            momentChange(moments);
            maxMomentChange(m5);
        }

        // PM-mom laskenta kunnossa
        if (forceType == "PM") {
            let m5 = 0;
            if (lengthA > lengthB) {
                m5 = - pointMoment * lengthA / L;
                console.log("max moment PM:", m5);
                setMaxMoment(m5);
                setFormData({ ...formData, maxM: m5 });
            } else if (lengthA < lengthB) {
                m5 = - pointMoment * lengthB / L;
                console.log("max moment PM:", m5);
                setMaxMoment(m5);
                setFormData({ ...formData, maxM: m5 });
            }


            // lasketaan momentti-arvot taulukkoon
            let mom = 0;
            for (var i = 0; i <= 20; i++) {
                if (i * L / 20 <= lengthA) {
                    mom = - pointMoment * (i * L / 20) / L;
                }
                else if (i * L / 20 > lengthA) {
                    mom = - pointMoment * ((i * L / 20) - L) / L;
                }
                moments.push(mom);
                setMoment(moments);
                console.log("moments:", moments);
            }

            momentChange(moments);
            maxMomentChange(m5);
        }

    }

    return (
        <div>
            <button onClick={calculateMomentLineload}>Laske momentti</button>

        </div>

    )
}

export default Moment
