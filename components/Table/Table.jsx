'use client'
import React, { useState } from "react";
import {
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Spinner, 
    Input
} from "@nextui-org/react";
import Image from "next/image";
import PaginationComponent from "./Pagination";
import AddNewUserBtn from "../AddNewUserBtn";

const TableComponent = (props) => {
    const { title, columns, data, dialogTitle } = props;
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

    const renderCell = (row, columnKey) => {
        const column = columns?.find((column) => column?.field === columnKey);
        return (
            column?.renderCell ? column?.renderCell(row) : row[columnKey]
        )
    };

    return (
        <div className="w-full">
            <div className=" bg-white shadow-small rounded-large">
                <div className="flex justify-between items-center px-4 pt-4">
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
                        <AddNewUserBtn dialogTitle={dialogTitle} />
                    </div>

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
                            key={column.field}
                            align={column.field === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.headerName}
                        </TableColumn>
                        )}
                    </TableHeader>

                    <TableBody
                        items={data ?? []}
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
