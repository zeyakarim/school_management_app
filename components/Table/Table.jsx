'use client'
import React, { useEffect, useState } from "react";
import {
    // Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Spinner, 
    Input,
    Button,
    useDisclosure,
    getKeyValue
} from "@nextui-org/react";
import Image from "next/image";
import PaginationComponent from "./Pagination";
import Dialog from "../Dialog";
import moment from 'moment';
import useSWR from "swr";

import { 
    DataGrid, 
    GridToolbarColumnsButton, 
    GridToolbarContainer, 
    GridToolbarFilterButton,
    GridToolbarDensitySelector 
} from '@mui/x-data-grid';
import { Box, Paper } from "@mui/material";
import PaginationControlled from "./newPagination";

const CustomToolbar = () => {
    return (
      <GridToolbarContainer style={{ paddingBottom: '4px' }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        {/* <div
          className={Classes.SearchBox}
          style={{ border: 'none', marginLeft: 'auto',display:'flex' }}
        > */}
          {/* <L3sAutoComplete l3s={l3s} setL3={setL3} l3={l3} setPageNo={setPageNo} />
          <BrandAutoComplete brands={brands} setBrand={setBrand} brand={brand} setPageNo={setPageNo} />
          <AutoComplete franchises={franchises} setFranchise={setFranchise} franchise={franchise} setPageNo={setPageNo} /> */}
          {/* <SearchInput searchFor={searchFor} handleSearch={handleSearch} width={200}/> */}
        {/* </div> */}
      </GridToolbarContainer>
    );
  }
  

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Table = (props) => {
    const { 
        title, columns, dialogTitle, table, type, checkBoxSelection, navigateOnRowClickEndpoint, 
        version, columnVisibilityModel, endPoint, dataPosition, rowId
    } = props;
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [limit, setLimit] = useState(1);
    const [data, setData] = useState([]);
    const [rowsData,setRowsData] = useState([]);
    const [columnData, setColumnsData] = useState([]);
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
        try {
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}?page=${page}`);
            const result = await apiResponse.json();
            setData(result?.data)
            return result?.data;
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        fetchData(1);
    }, [])

    useEffect(() => {
        if (data?.[dataPosition]?.length >= 0) {
            let finalColumns = columns?.length > 0
                ? columns
                : Object.keys(data[dataPosition]?.[0]).map((field) => {
                    return {
                        field: `${field}`,
                        headerName: `${field}`,
                        flex: 1,
                        headerClassName: 'super-app-theme--header',
                        headerAlign: 'center',
                        align: 'center',
                        editable: false,
                        sortable: false,
                        filterable: false,
                    }
                });

            if (!finalColumns[0]?.checkBoxColumn && checkBoxSelection) {

                finalColumns.unshift({
                    flex: 0.5,
                    ...GRID_CHECKBOX_SELECTION_COL_DEF,
                    headerClassName: 'super-app-theme--header',
                    checkBoxColumn: true,
                })
            }

            const formattedData = data?.[dataPosition]?.map((row) => {
                if (row?.created_at) {
                    return {
                        ...row,
                        created_at: moment(row?.created_at).format('MMM DD, YYYY h:mm:ss A'),
                        updated_at: moment(row?.updated_at).format('MMM DD, YYYY h:mm:ss A'),
                        date: moment(row?.date).format('MMM DD, YYYY h:mm:ss A'),
                        birth_date: moment(row?.birth_date).format('MMM DD, YYYY h:mm:ss A'),
                        start_time: moment(row?.start_time).format('MMM DD, YYYY h:mm:ss A'),
                        end_time: moment(row?.end_time).format('MMM DD, YYYY h:mm:ss A'),
                    }
                    
                }
            })

            setRowsData(formattedData)
            setColumnsData(finalColumns)
        }

    }, [data])

    const dateFormat = (row, field) => {
        return moment(row?.[field]).format('MMM DD, YYYY h:mm:ss A')
    }

    const dateField = ['created_at', 'updated_at', 'date', 'birth_date', 'start_time', 'end_time']
    return (
        <div className="w-full">
            <div className="shadow overflow-hidden rounded-md bg-[#fff] pt-[15px]">
                <table className="styled-table" style={{ width:'100%' }}>
                    <thead>
                        <tr className="bg-[#C3EBFA] text-[#000000c4]">
                            {columns?.map((column, index) => (
                                <th key={index} className="p-[15px] text-[14px] text-start" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>{column?.headerName}</th>
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
                                        {column?.renderCell ? columnData(row, column?.renderCell) : dateField.includes(column?.field) ? dateFormat(row, column?.field) : row[column?.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="p-4 flex justify-between bg-white">
                    <p className="text-[13px] text-[#c7c4c4] flex items-center font-[500]">Showing 
                        <span className="text-[#6B8088]">&nbsp;1-{data?.[dataPosition]?.length}</span>&nbsp;from<span className="text-[#6B8088]">&nbsp;{data?.totalRows}</span>&nbsp;Data
                    </p>
                    <PaginationControlled data={data} fetchData={fetchData} />
                </div>
	        </div>

            <Dialog
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                dialogTitle={dialogTitle}
                table={table}
                type={type}
            />
        </div>
    );
}

export default Table;
