'use client'

import { createContext, useState, useContext } from 'react';
import SnackBar from './snackbar';

const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
    const [snackBar, setSnackBar] = useState({
        display: false,
        message: '',
        type: 'success', // success, error, warning, info
        // redirectUrl: '',
    });

    return (
        <SnackBarContext.Provider value={{ snackBar, setSnackBar }}>
            {children}
            <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
        </SnackBarContext.Provider>
    );
};

// Custom hook for easy access to the SnackBar context
export const useSnackBar = () => useContext(SnackBarContext);