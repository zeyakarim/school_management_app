import { Pagination } from "@nextui-org/react";

const PaginationComponent = (props) => {
    const { page, pages, setPage } = props;
    return (
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
    )
}

export default PaginationComponent;