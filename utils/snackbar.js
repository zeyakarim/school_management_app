import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { useRouter } from 'next/router';

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ snackBar, setSnackBar }) => {
    // const router = useRouter();

    const handleSnackBarClose = () => {
        setSnackBar((prev) => ({ ...prev, display: false }));
    };

    const handleAlertClick = () => {
        if (snackBar?.redirectUrl) {
            // router.push(snackBar.redirectUrl);
            setSnackBar((prev) => ({ ...prev, display: false }));
        }
    };

    return (
        <Snackbar 
            open={snackBar?.display} 
            autoHideDuration={3000} 
            onClose={handleSnackBarClose}
        >
            <Alert 
                onClose={handleSnackBarClose} 
                severity={snackBar?.type} 
                sx={{ width: '100%' }} 
                onClick={handleAlertClick}
            >
                {snackBar?.message}
            </Alert>
        </Snackbar>
    );
};

export default SnackBar;