import React from "react";

import { store } from "../actions/store";
import { Provider } from "react-redux";
import Tulokset from './Tulokset';

function Backend() {
    return (

        <Provider store={store}>
            <Tulokset />

        </Provider>

    );
}

export default Backend;