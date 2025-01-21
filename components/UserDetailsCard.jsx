import {Card, CardBody} from "@nextui-org/react";
import Image from "next/image";
import { LocationOn } from '@mui/icons-material';

const UserDetailsCard = ({ name, title, bloodGroup, dateOfJoing, email, phone, address, gender }) => {
    return (
        <Card className="flex flex-1 rounded-md">
            <CardBody className="bg-lamaSky py-6 px-4 flex flex-col lg:flex-row gap-4">
            <div className="w-1/3">
                <Image src='/user.jpg' alt='' width={144} height={144} className="w-36 h-36 rounded-full object-cover"/>
            </div>

            <div className="md:w-full w-2/3 flex flex-col justify-between gap-4">
                <p className="font-semibold">{name}</p>
                <p className="text-xs text-gray-500">{title}</p>

                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Image src='/blood.png' alt='' width={14} height={14} />
                        <span className="text-xs text-gray-500">{bloodGroup}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Image src='/date.png' alt='' width={14} height={14} />
                        <span className="text-xs text-gray-500">{dateOfJoing}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Image src='/mail.png' alt='' width={14} height={14} />
                        <span className="text-xs text-gray-500">{email}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Image src='/phone.png' alt='' width={14} height={14} />
                        <span className="text-xs text-gray-500">{phone}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <LocationOn style={{ fontSize: '16px'}} />
                        {/* <Image src='/location.png' alt='' width={14} height={14} /> */}
                        <span className="text-xs text-gray-500">{address}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Image src='/phone.png' alt='' width={14} height={14} />
                        {/* <PinDrop /> */}
                        <span className="text-xs text-gray-500">{gender}</span>
                    </div>
                </div>
            </div>
            </CardBody>
        </Card>
    )
}

export default UserDetailsCard;