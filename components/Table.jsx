'use client'
import React from "react";
import {
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Pagination, 
    Spinner, 
    getKeyValue,
    Input
} from "@nextui-org/react";
import useSWR from "swr";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function TableComponent(props) {
    const { title } = props;
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    keepPreviousData: true,
  });

  const rowsPerPage = 10;

  const pages = React.useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

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
                    className="table-custom-css"
                    style={{borderRadius:'0px 0px 14px 14px'}}
                >
                    <TableHeader>
                        <TableColumn key="name">Name</TableColumn>
                        <TableColumn key="height">Height</TableColumn>
                        <TableColumn key="mass">Mass</TableColumn>
                        <TableColumn key="birth_year">Birth year</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data?.results ?? []}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                        emptyContent={"No rows to display."}
                    >
                        {(item) => (
                        <TableRow key={item?.name}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-center mt-4">
                <Pagination 
                    isCompact 
                    showControls 
                    initialPage={1} 
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                />
            </div>
        </div>
  );
}
