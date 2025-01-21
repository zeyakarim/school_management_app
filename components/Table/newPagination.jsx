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
                        border: "2px solid #34bff3 !important", 
                        color: "#34bff3 !important",
                        backgroundColor: 'transparent !important' 
                    },
                    "& .Mui-selected:hover": {
                        backgroundColor: 'transparent !important'
                    },
                    "& .MuiPaginationItem-root": {
                        height: '36px',
                        minWidth: '36px'
                    },
                    "& .MuiPaginationItem-page": {
                        border: "1px solid #ddd",
                        borderRadius: "13px",
                        fontWeight:'600',
                        color:'gray'    
                    },
                    "& .MuiPaginationItem-page:hover": {
                        cursor: "pointer",
                        backgroundColor: 'transparent !important'
                    },
                    "& .MuiPaginationItem-disabled": {
                        color: "#bbb",
                        borderColor: "#ddd",
                    },
                    "& .MuiPaginationItem-previous, & .MuiPaginationItem-next": {
                        color: "#34bff3 !important",
                    },
                    "& .MuiPaginationItem-previous:hover, & .MuiPaginationItem-next:hover": {
                        backgroundColor: "rgba(52, 191, 243, 0.1)",
                    }
                }}
            />
        </Stack>
    );
}