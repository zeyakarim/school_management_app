'use client'
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Dialog from "../Dialog";
import moment from 'moment';
import PaginationControlled from "./newPagination";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const columnData = (row, RenderCell)=> {
    return (
        <RenderCell {...row}/>
    )
}

const Table = (props) => {
    const { 
        title, columns, dialogTitle, table, type, checkBoxSelection, navigateOnRowClickEndpoint, 
        version, columnVisibilityModel, endPoint, dataPosition, rowId, reRender, setReRender
    } = props;
    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [searchFor, setSearchFor] = useState('');
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [limit, setLimit] = useState(1);
    const [data, setData] = useState([]);
    const [rowsData,setRowsData] = useState([]);
    const [columnVisibilityModelTable,setColumnVisibilityModel] = useState(columnVisibilityModel ||  {});

    const defaultVersion = 'version-1'
    const versionMap = {
        "version-1": {
            initialSortState: { field: 'created_at', sort: 'desc' }
        },
        "version-2": {
            initialSortState: { field: 'alter_at', sort: 'desc' }
        },
        "version-3": {
            initialSortState: { field: "name", sort: "asc" }
        },
    }
    const initialSortState = versionMap?.[version]?.initialSortState
    const [sort, setSort] = useState(initialSortState)

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
    }, [searchFor, reRender])

    const dateFormat = (row, field) => {
        return moment(row?.[field]).format('MMM DD, YYYY h:mm:ss A')
    }

    const dateField = ['created_at', 'updated_at', 'date', 'birth_date', 'start_time', 'end_time', 'submit_date', 'given_date'];

    const getCellValue = (row, column) => {
        const fieldValue = row[column?.field];
    
        switch (true) {
            case column?.renderCell !== undefined:
                return columnData(row, column?.renderCell);
    
            case dateField.includes(column?.field):
                return dateFormat(row, column?.field);
    
            case typeof fieldValue === "boolean":
                return fieldValue ? "Yes" : "No";
    
            case fieldValue === null || fieldValue === undefined:
                return "N/A";
    
            default:
                return fieldValue;
        }
    };
    
    return (
        <div className="w-full mt-3">
            <div className="flex justify-end mb-3">
                <Button 
                    variant="contained" 
                    className="font-semibold capitalize"
                    onClick={onOpen}
                >{dialogTitle}</Button>
            </div>
        
            <div className="shadow overflow-hidden rounded-md bg-[#fff] pt-[15px]">
                <div className="flex justify-between mb-3 mx-4">
                    <h2 className="font-semibold">{title}</h2>
                    <div style={{width:'250px'}}>
                        <TextField 
                            id='last'
                            name='last'
                            label='Search'
                            autoComplete='off'
                            size='small'
                            placeholder='Search Record...'
                            value={searchFor}
                            onChange={(event) => setSearchFor(event?.target?.value)}
                            sx={{ width: '100%'}}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    
                </div>
                <table className="styled-table mx-auto" style={{ width:'98%' }}>
                    <thead>
                        <tr className="header-row bg-[#C3EBFA] text-[#000000c4]">
                            {columns?.map((column, index) => (
                                <th key={index} className="px-[15px] py-[10px] text-[14px] text-start" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>{column?.headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.[dataPosition]?.map((row) => (
                            <tr 
                                key={row?.[rowId]} 
                                style={{ borderBottom: "1px solid #ddd", cursor:'pointer' }} 
                                onClick={() => {
                                // const permissible = CheckRoleBasedPermission(auth?.user, services?.[service], permission?.read);
                                    if (navigateOnRowClickEndpoint) {
                                        const url = `${navigateOnRowClickEndpoint}/${row?.id || row?.[rowId]}`;
                                        window.open(url, '_blank');
                                    }
                                }}
                            >
                                {columns?.map((column, index) => (
                                    <td key={index} className="p-[15px] text-[14px] bg-white text-start" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                                        {getCellValue(row, column)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="p-4 flex justify-between bg-white">
                    <p className="text-[13px] text-[#c7c4c4] flex items-center font-[500]">Showing 
                        <span className="text-[#34bff3]">&nbsp;1-{data?.[dataPosition]?.length}</span>&nbsp;from<span className="text-[#34bff3]">&nbsp;{data?.totalRows}</span>&nbsp;Data
                    </p>
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
    );
}

export default Table;