'use client'
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import Dialog from "../Dialog";
import moment from 'moment';
import PaginationControlled from "./newPagination";

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
            const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}${endPoint}?page=${page}&limit=${10}`);
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