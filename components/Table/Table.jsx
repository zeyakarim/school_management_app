'use client'
import React, { useEffect, useState } from "react";
import {
    Table, 
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
import useSWR from "swr";

import { 
    DataGrid, 
    GridToolbarColumnsButton, 
    GridToolbarContainer, 
    GridToolbarFilterButton,
    GridToolbarDensitySelector 
} from '@mui/x-data-grid';
import { Box, Paper } from "@mui/material";

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

const TableComponent = (props) => {
    const { title, columns, data, dialogTitle, table, type, checkBoxSelection, navigateOnRowClickEndpoint, version, columnVisibilityModelTable } = props;
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [limit, setLimit] = useState(1);

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
        console.log(page,'page')
        try {
          const apiResponse = await fetch(`http://localhost:3000/api/students?page=${page}`);
          const result = await apiResponse.json();
          console.log(result?.data,'result?.data')
          return result?.data;
        } catch (error) {
          throw new Error(error)
        }
    }

    useEffect(() => {
        fetchData(1);
    }, [])

    return (
        <div className="w-full">
            <div className=" bg-white shadow-small rounded-large">
                {/* <div className="flex justify-between items-center px-4 pt-4">
                    <h6 className="pl-2 font-semibold">{title}</h6>
                    <div className="flex gap-2 w-full sm:w-[24%] justify-end">
                        <Input
                            isClearable
                            // className="w-full sm:max-w-[44%]"
                            className="w-2/3"
                            placeholder="Search by name..."
                            startContent={<Image src='/search.png' alt="" width={14} height={14} />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                            variant="bordered"
                        />
                        
                        <Button
                            radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                            onClick={onOpen}
                        >
                            ADD
                        </Button>
                    </div>

                </div> */}
                <Box 
                    className="shadow"
                    component={Paper}
                    sx={{
                        '& .super-app-theme--header': {
                            backgroundColor: '#243750',
                            color: '#ffffff',
                            cursor: "default"
                        },
                    }}
                >
                    <DataGrid
                        rows={[]}
                        columns={columns}
                        slots={{ toolbar: CustomToolbar }}
                        filterMode="server"
                        sortingMode="server"
                        paginationMode="server"
                        pageSizeOptions={[10, 25, 35, 50, 100]}
                        disableRowSelectionOnClick
                        checkboxSelection={checkBoxSelection}
                        autoHeight
                        getRowHeight={() => "auto"}
                        sx={{
                            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                                outline: "none !important",
                            },
                            "& .MuiPopper-root-MuiDataGrid-panel": {
                                border: "2px solid green !important",
                            },
                            "& .MuiTablePagination-displayedRows": { display: 'none' },
                            "& .MuiTablePagination-actions": { display: 'none' },
                            ".PrivateSwitchBase-input": {
                                height: "23px",
                                margin: "10px 13px",
                                // width: "20px"
                            },
                            cursor: "pointer",
                            '& .MuiDataGrid-cell': {
                                py: '10px',
                            },
                            '& .MuiDataGrid-sortIcon': {
                                opacity: 1,
                                color: "#fff",
                            },
                        }}
                        onRowClick={(params) => {
                            // const permissible = CheckRoleBasedPermission(auth?.user, services?.[service], permission?.read);
                            if (navigateOnRowClickEndpoint) {
                                const url = `${navigateOnRowClickEndpoint}/${params?.id || params?.[rowId]}`;
                                window.open(url, '_blank');
                            }
                        }}
                        initialState={{
                            columns: { columnVisibilityModel: columnVisibilityModelTable || {} },
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                        onSortModelChange={(sort) => setSort(sort[0])}
                        onPaginationModelChange={({ pageSize }) => {
                            if (pageSize >= 10) {
                                setLimit(pageSize)
                            } else {
                                setLimit(10)
                            }
                        }
                        }
                    />
                </Box>
            </div>
            <PaginationComponent page={page} pages={250} setPage={setPage} fetchData={fetchData} />

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

export default TableComponent;
