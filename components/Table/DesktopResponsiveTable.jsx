'use client'
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Dialog from "../Dialog";
import moment from 'moment';
import PaginationControlled from "./newPagination";
import { InputAdornment, TextField, FormControlLabel, Menu, MenuItem, Button, Switch } from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import Spinner from "../Spinner";

const columnData = (row, RenderCell) => <RenderCell {...row} />;

const DesktopResponsiveTable = (props) => {
    const { 
        title, columns, dialogTitle, table, type, navigateOnRowClickEndpoint, 
        endPoint, dataPosition, rowId, reRender, setReRender
    } = props;

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [searchFor, setSearchFor] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.field));
    const [anchorEl, setAnchorEl] = useState(null);

    const fetchData = async (page) => {
        setLoading(true);
        const params = new URLSearchParams({ searchFor, page, limit: 10 });
        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}?${params.toString()}`);
            const result = await apiResponse.json();
            setData(result?.data);
            setLoading(false);
            return result?.data;
        } catch (error) {
            setLoading(false);
            throw new Error(error);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, [searchFor, reRender]);

    const dateFormat = (row, field) => moment(row?.[field]).format('MMM DD, YYYY h:mm:ss A');

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

    const toggleColumn = (field) => {
        setVisibleColumns(prev => 
            prev.includes(field) ? prev.filter(col => col !== field) : [...prev, field]
        );
    };

    return (
        <div className="w-full mt-3">
            <div className="flex justify-between mb-3">
                <button
                    type='button' 
                    className="px-6 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition rounded-full text-[14px] font-semibold shadow-lg"
                    onClick={onOpen}
                >{dialogTitle}</button>

                {/* Column Visibility Toggle */}
                <Button
                    aria-controls="column-menu"
                    aria-haspopup="true"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    variant="contained"
                    startIcon={<Visibility />}
                    className="px-4 py-2 bg-[#5ABBC2] text-white hover:bg-[#4AA3A9] transition-all rounded-full shadow-md flex items-center capitalize"
                >
                    Manage Columns
                </Button>
                
                <Menu
                    id="column-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    {columns.map((column) => (
                        <MenuItem key={column.field}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={visibleColumns.includes(column.field)}
                                        onChange={() => toggleColumn(column.field)}
                                        color="primary"
                                    />
                                }
                                label={column.headerName}
                            />
                        </MenuItem>
                    ))}
                </Menu>
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
                            {columns
                                .filter(column => visibleColumns.includes(column.field))
                                .map((column, index) => (
                                    <th key={index} className="px-[15px] py-[10px] text-[14px] text-start" 
                                        style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                                        {column?.headerName}
                                    </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.[dataPosition]?.map((row) => (
                            <tr key={row?.[rowId]} className="border-b border-gray-300 cursor-pointer group">
                                {columns
                                    .filter(column => visibleColumns.includes(column.field))
                                    .map((column, index) => (
                                        <td 
                                            key={index} 
                                            className="p-4 text-sm bg-white text-start font-sans group-hover:bg-[#f6f5f5]"
                                        >
                                            {getCellValue(row, column)}
                                        </td>
                                    ))
                                }
                            </tr>                                        
                        ))}
                    </tbody>
                </table>

                {loading ? <Spinner /> : null}

                {/* Pagination Controls */}
                <div className="p-4 flex justify-between bg-white">
                    <p className="text-[13px] text-[#c7c4c4] flex items-center font-[500]">
                        Showing 
                        <span className="text-[#34bff3]">&nbsp;1-{data?.[dataPosition]?.length}</span>&nbsp;from
                        <span className="text-[#34bff3]">&nbsp;{data?.totalRows}</span>&nbsp;Data
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
};

export default DesktopResponsiveTable;