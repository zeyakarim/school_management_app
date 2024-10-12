import { DeleteIcon, EditIcon, ViewIcon } from "@/lib/icons";
const { User, Chip, Tooltip } = require("@nextui-org/react");

export const InfoRenderCell = (row) => {
    return (
        <User
            name={row?.name}
            description={row?.email}
            avatarProps={{ src: row?.avatar }}
        />
    );
};
  
export const SubjectsRenderCell = (row) => {
    return (
        <div>
            {row?.subjects?.slice(0,2)?.map((subject, index) => (
                <Chip key={index} color="warning" variant='flat' className="mr-1">{subject}</Chip>
            ))}
            {row?.subjects?.length > 2 ? (
                <Tooltip content={
                    <div>
                        {row?.subjects?.slice(2)?.map((subject, index) => (
                            <p key={index}>{subject},</p>
                        ))}
                    </div>
                    } arrow
                >
                <Chip color="warning" variant="flat">{`+ ${row?.subjects?.length - 2} `}</Chip>
                </Tooltip>
            ) : null}
        </div>
    )
};

export const ActionRenderCell = (row) => {
    return (
        <div className="relative flex items-center gap-2 justify-center" id={row?.id}>
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
}