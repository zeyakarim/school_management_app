import {Card, CardBody} from "@nextui-org/react";
import Image from "next/image";
import { Bloodtype, CalendarMonth, Email, LocationOn, Man, Phone, Woman } from '@mui/icons-material';

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
                        <Bloodtype style={{fontSize:'20px'}} />
                        <span className="text-xs text-gray-500">{bloodGroup}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <CalendarMonth style={{fontSize:'18px'}} />
                        <span className="text-xs text-gray-500">{dateOfJoing}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <LocationOn style={{ fontSize: '18px'}} />
                        <span className="text-xs text-gray-500">{address}</span>
                    </div>
                    
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Phone style={{fontSize:'18px'}} />
                        <span className="text-xs text-gray-500">{phone}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        <Email style={{fontSize:'18px'}} />
                        <span className="text-xs text-gray-500">{email}</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                        {gender === 'MALE' ? <Man style={{fontSize:'20px'}} /> : <Woman style={{fontSize:'20px'}} /> }
                        <span className="text-xs text-gray-500">{gender}</span>
                    </div>
                </div>
            </div>
            </CardBody>
        </Card>
    )
}

export default UserDetailsCard;