import DesktopResponsiveTable from "./DesktopResponsiveTable";
import { useEffect, useState } from "react";
import MobileResponsiveTable from "./MobileResponsiveTable";

export default function Table(props) {
    const [isMobile, setIsMobile] = useState(false); // Avoid SSR issue by setting a safe default

    useEffect(() => {
        // Ensure this runs only on the client side
        const handleResize = () => {
            setIsMobile(window.innerWidth < 540);
        };

        handleResize(); // Set initial state on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const {
        title, columns, dialogTitle, table, type, checkBoxSelection, navigateOnRowClickEndpoint, 
        version, columnVisibilityModel, endPoint, dataPosition, rowId, reRender, setReRender, mobileResponsive
    } = props;

    return (
        <div>
            {mobileResponsive ? (
                isMobile ? (
                    <div className='mobile-responsive-table'>
                        <MobileResponsiveTable
                            columns={columns}
                            dataPosition={dataPosition}
                            endPoint={endPoint}
                            rowId={rowId}
                            title={title}
                            dialogTitle={dialogTitle}
                            table={table}
                            type={type}
                            navigateOnRowClickEndpoint={navigateOnRowClickEndpoint}
                            reRender={reRender}
                            setReRender={setReRender}
                            //   redirectUrlOnSnackBarClick={redirectUrlOnSnackBarClick}
                            version={version}
                            columnVisibilityModel={columnVisibilityModel}
                        />
                    </div>
                ) : (
                    <div className='desktop-responsive-table'>
                        <DesktopResponsiveTable {...props} />
                    </div>
                )
            ) : (
                <div className='desktop-responsive-table'>
                    <DesktopResponsiveTable {...props} />
                </div>
            )}
        </div>
    );
}