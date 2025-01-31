import { BorderColor, Delete, Visibility } from "@mui/icons-material";
const { User, Chip, Tooltip } = require("@nextui-org/react");

export const InfoRenderCell = (row) => {
    return (
        <User
            name={row?.name}
            description={row?.email}
            avatarProps={{ src: row?.avatar && row?.avatar }}
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
                    <Visibility />
                </span>
            </Tooltip>
            <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <BorderColor />
                </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Delete />
                </span>
            </Tooltip>
        </div>
    );
}

export const StudentRenderCell = (row) => {
    return (
        <div>
            {row?.studentName?.slice(0,2)?.map((student, index) => (
                <Chip key={index} color="warning" variant='flat' className="mr-1">{student}</Chip>
            ))}
            {row?.studentName?.length > 2 ? (
                <Tooltip content={
                    <div>
                        {row?.studentName?.slice(2)?.map((student, index) => (
                            <p key={index}>{student},</p>
                        ))}
                    </div>
                    } arrow
                >
                <Chip color="warning" variant="flat">{`+ ${row?.studentName?.length - 2} `}</Chip>
                </Tooltip>
            ) : null}
        </div>
    )
}

export const TeacherRenderCell = (row) => {
    return (
        <div>
            {row?.teachers?.map((teacher, index) => (
                <Chip key={index} color="warning" variant='flat' className="mr-1">{teacher}</Chip>
            ))}
        </div>
    )
}