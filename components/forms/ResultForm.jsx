import { Avatar, DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { FactCheck, Percent, TaskAlt } from '@mui/icons-material';
import Image from 'next/image';

const classes = [
    { "label": "1A", "key": "1A"},
    { "label": "1B", "key": "1B" },
    { "label": "2A", "key": "2A"},
    { "label": "2B", "key": "2B"},
    { "label": "3A", "key": "3A" },
    { "label": "3B", "key": "3B"},
    { "label": "4A", "key": "4A" },
    { "label": "4B", "key": "4B" },
    { "label": "5A", "key": "5A"},
    { "label": "5B", "key": "5B"},
    { "label": "6A", "key": "6A" },
    { "label": "6B", "key": "6B"},
    { "label": "7A", "key": "7A" },
    { "label": "7B", "key": "7B" },
    { "label": "8A", "key": "8A" },
    { "label": "8B", "key": "8B"},
    { "label": "9A", "key": "9A" },
    { "label": "9B", "key": "9B" },
    { "label": "10", "key": "10" },
]

const students = [
    { "label": "JOHN", "key": "john", icon: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { "label": "ARHAM", "key": "arham", icon: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { "label": "RAYAN", "key": "rayan", icon: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { "label": "POLLARD", "key": "pollard", icon: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { "label": "ROBERT", "key": "robert", icon: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
    { "label": "LARA", "key": "lara", icon: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { "label": "MICHEAL", "key": "micheal", icon: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { "label": "NICK", "key": "nick", icon: "https://i.pravatar.cc/150?u=a042581f4e29026024d" }
];

const teachers = [
    { "label": "JOHN", "key": "john"},
    { "label": "ARHAM", "key": "arham" },
    { "label": "RAYAN", "key": "rayan"},
    { "label": "POLLARD", "key": "pollard"},
    { "label": "ROBERT", "key": "robert" },
    { "label": "LARA", "key": "lara"},
    { "label": "MICHEAL", "key": "micheal" },
    { "label": "NICK", "key": "nick" }
];

const ResultForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-3 flex-wrap justify-between">
                    <Select
                        isRequired
                        className="w-[48%]"
                        variant="bordered"
                        labelPlacement="outside"
                        label="Class Name"
                        endContent={
                            <Image src="/class.png" alt="" width={18} height={18} />
                        }
                    >
                        {classes.map((classData) => (
                            <SelectItem key={classData.key}>
                                {classData.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <Select
                        isRequired
                        label="Student"
                        className="w-[48%]"
                        variant="bordered"
                        labelPlacement="outside"
                        endContent={
                            <Image src="/teacher.png" alt="" width={16} height={16} />
                        } 
                    >
                        {students.map((student) => (
                            <SelectItem 
                                key={student.key}
                                startContent={<Avatar alt="" className="w-6 h-6" src={student.icon} />}
                            >
                                {student.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        isRequired
                        type="text"
                        label="Grade"
                        endContent={
                            <Image src="/assignment.png" alt="" width={16} height={16} />
                        }
                        variant="bordered"
                        className="w-[48%]"
                        labelPlacement="outside"
                    />
                
                    <Input
                        isRequired
                        type="text"
                        label="Percentage"
                        endContent={
                            <Percent style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[48%]"
                        labelPlacement="outside"
                    />
                    <Input
                        isRequired
                        type="text"
                        label="Mark"
                        endContent={
                            <FactCheck style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[48%]"
                        labelPlacement="outside"
                    />

                    <Input
                        isRequired
                        type="text"
                        label="Total"
                        endContent={
                            <TaskAlt style={{fontSize:'20px'}} className="text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        variant="bordered"
                        className="w-[48%]"
                        labelPlacement="outside"
                    />
                </div>
            </form>
        </div>
    )
}

export default ResultForm;