'use client'
import { useEffect, useState } from 'react';
import { InputAdornment, TextField } from "@mui/material";
import { useDisclosure } from '@nextui-org/react';
import PaginationControlled from "./newPagination";
import Dialog from '../Dialog';
import SearchIcon from "@mui/icons-material/Search";
import moment from 'moment';
import Button from '@mui/material/Button';

const SearchInput = ({ searchFor, handleSearch }) => {
    return (
        <div style={{ width: '100%' }} className='mt-2'>
            <TextField
                id="search"
                type="search"
                label="Search"
                value={searchFor}
                autoFocus={true}
                onChange={(e) => handleSearch(e)}
                autoComplete='off'
                sx={{ width: '100%', "& label": { top: searchFor ? "0%" : "-18%" }, "& .MuiOutlinedInput-input": { padding: "8.5px 14px" } }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}

const dateColumns = ["created_at", "createdAt", "updatedAt", "updated_at"];

const columnData = (row, RenderCell)=> {
    return (
        <RenderCell {...row}/>
    )
}

const RenderData = (row, column) => {
    return (
        <>
            <p style={{marginRight:5,color:'#6c757d'}}>{column?.headerName}:</p>
            <p style={{lineBreak:'anywhere'}}>
                {column?.renderCell ? columnData(row, column?.renderCell) :
                dateColumns.includes(column?.field) ?  
                moment(row[column?.field]).format('MMM DD, YYYY h:mm:ss A') :
                row[column?.field] || 'N/A'}
            </p>
        </>
    )
};


const MobileResponsiveTable = (props) => {
    const [data,setData] = useState([]);
    const [searchFor,setSearchFor] = useState("");
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const {
      dataPosition,
      rowId,
      columns,
      navigateOnRowClickEndpoint,
      type,
      setReRender,
      title,
      dialogTitle,
      table,
      endPoint
    } = props;

    const handleSearch = (event) => {
        setSearchFor(event.target.value);
    }

    const fetchData = async (page) => {
        const params = new URLSearchParams({
            searchFor,
            page,
            limit: 10,
        });
        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}?${params.toString()}`);
            const result = await apiResponse.json();
            setData(result?.data)
            return result?.data;
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        fetchData(1);
    },[searchFor]);


    return (
        <div>
            <div>
                <div className="flex justify-between items-center mb-3 mt-2">
                    <h2 className="font-semibold">{title}</h2>
                    <Button 
                        variant="contained" 
                        className="font-semibold capitalize"
                        onClick={onOpen}
                    >{dialogTitle}</Button>
                </div>

                <SearchInput searchFor={searchFor} handleSearch={handleSearch} />

                {data?.[dataPosition]?.map((row) => (
                    <div 
                        key={row[rowId]} 
                        className='mobile-responsive-box' 
                        onClick={() => {
                            if (navigateOnRowClickEndpoint) {
                                const url = `${navigateOnRowClickEndpoint}/${row?.id || row?.[rowId]}`;
                                window.open(url, '_blank');
                            }
                        }}
                    >
                        {columns?.length !== 0 && columns?.map((column,index) => (
                            <div style={{display:'flex', marginBottom:5}} key={index}>
                               {RenderData(row, column)}
                            </div>
                        ))}
                    </div>
                ))}

                <div className='pb-5 flex justify-center' style={{ margin:'20px auto 0px' }}>
                    <PaginationControlled data={data} fetchData={fetchData} />
                </div>
            </div>

            <Dialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                dialogTitle={dialogTitle}
                onClose={onClose}
                table={table}
                type={type}
                setReRender={setReRender}
            />
        </div>
    )
};

export default MobileResponsiveTable;