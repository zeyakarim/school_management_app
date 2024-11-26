import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function PaginationControlled({ data, fetchData }) {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination 
                count={10} 
                page={page} 
                onChange={handleChange}
                slots={{
                    previous: ArrowLeftIcon,
                    next: ArrowRightIcon,
                }}
                sx={{ 
                    "& .Mui-selected": {
                        border: "2px solid #4F45B5 !important", 
                        color: "#4F45B5 !important",
                        backgroundColor: 'transparent !important' 
                    },
                    "& .Mui-selected:hover": {
                        backgroundColor: 'transparent !important'
                    },
                    "& .MuiPaginationItem-root": {
                        // color: 'gray',
                        height: '36px',
                        minWidth: '36px'
                    },
                    "& .MuiPaginationItem-page": {
                        border: "1px solid #ddd",  // Add border to only numbered buttons
                        borderRadius: "13px",
                        fontWeight:'600',
                        color:'gray'      // Optional: rounded corners for numbers
                    },
                    "& .MuiPaginationItem-page:hover": {
                        backgroundColor: 'transparent !important'
                    }
                }}
            />
        </Stack>
    );
}