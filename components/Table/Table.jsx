'use client'
import React, { useCallback, useMemo, useState } from "react";
import {
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Spinner, 
    getKeyValue,
    Input,
    User,
    Chip,
    Tooltip
} from "@nextui-org/react";
import useSWR from "swr";
import Image from "next/image";
import PaginationComponent from "./Pagination";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { ViewIcon } from "./ViewIcon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TableComponent = (props) => {
    const { title, columns, users } = props;
    const [page, setPage] = useState(1);
    const pages = 250;
    const [filterValue, setFilterValue] = useState("");
    const [sortDescriptor,setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    })

    const onSearchChange = ((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = (()=>{
        setFilterValue("")
        setPage(1)
    },[])

    // const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    //     keepPreviousData: true,
    // });

    // const rowsPerPage = 10;

    // const pages = useMemo(() => {
    //     return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    // }, [data?.count, rowsPerPage]);

    // const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    const statusColorMap = {
        active: "success",
        paused: "danger",
        vacation: "warning",
    };
    
    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
            case "name":
                return (
                <User
                    avatarProps={{radius: "lg", src: user.avatar}}
                    description={user.email}
                    name={cellValue}
                >
                    {user.email}
                </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                );
            case "status":
                return (
                <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                    {cellValue}
                </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2 justify-center">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <ViewIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
          default:
            return cellValue;
        }
    }, []);

    return (
        <div className="w-full">
            <div className=" bg-white shadow-small rounded-large">
                <div className="flex justify-between items-center px-4 pt-4">
                    <h6 className="pl-2 font-semibold">{title}</h6>
                    <Input
                        isClearable
                        // className="w-full sm:max-w-[44%]"
                        className="w-[24%]"
                        placeholder="Search by name..."
                        startContent={<Image src='/search.png' alt="" width={14} height={14} />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                        variant="bordered"
                    />
                </div>
                <Table
                    // aria-label="Example table with client async pagination"
                    aria-label="Example table with custom cells"
                    className="table-custom-css"
                    style={{borderRadius:'0px 0px 14px 14px'}}
                    isHeaderSticky
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                        <TableColumn  
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody
                        // items={data?.results ?? []}
                        items={users}
                        // items={sortedItems}
                        // loadingContent={<Spinner />}
                        // loadingState={loadingState}
                        emptyContent={"No rows to display."}
                    >
                        {(item) => (
                            <TableRow className="even:bg-[#F1F0FF]" key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <PaginationComponent page={page} pages={pages} setPage={setPage} />
        </div>
    );
}

export default TableComponent;
