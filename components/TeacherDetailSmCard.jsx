import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

const TeacherDetailSmCard = ({icon, number, title}) => {
    return (
        <Card className="p-2 rounded-md flex w-full md:w-[48%] xl:w-[48%]">
            <CardBody className="flex flex-row gap-4">
                <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className="w-6 h-6"
                />
                <div>
                    <h1 className="text-[16px] font-semibold">{number}</h1>
                    <span className="text-sm text-gray-400">{title}</span>
                </div>
            </CardBody>
        </Card>
    )
}

export default TeacherDetailSmCard;