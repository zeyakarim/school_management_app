import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

export default function PaginationControlled({ data, fetchData }) {
    const [currentPage, setCurrentPage] = React.useState(1);
    let setSearchParams;

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                // Try using React Router hooks if inside a Router
                const urlParams = new URLSearchParams(window.location.search);
                const page = parseInt(urlParams.get("page")) || 1;
                setCurrentPage(page);
            } catch (error) {
                console.warn("React Router is not available, using fallback.");
            }
        }
    }, []);

    const handleChange = (event, value) => {
        if (!isNaN(value)) {
            setCurrentPage(value);

            if (typeof window !== "undefined") {
                if (setSearchParams) {
                    setSearchParams({ page: value });
                } else {
                    const newUrl = new URL(window.location);
                    newUrl.searchParams.set("page", value);
                    window.history.pushState({}, "", newUrl);
                }
            }

            fetchData(value);
        }
    };

    return (
        <Stack spacing={2}>
            <Pagination 
                count={data?.maxPage} 
                page={currentPage} 
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