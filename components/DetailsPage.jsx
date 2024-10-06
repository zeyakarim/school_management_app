import {Card, CardBody} from "@nextui-org/react";
import Image from "next/image";
import TeacherDetailSmCard from "./TeacherDetailSmCard";
import { teacherDetailsItems } from "@/lib/data";
import BigCalendar from "./BigCalendar";

const DetailsPage = () => {
    return (
      <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col lg:flex-row gap-2">
            <Card className="flex flex-1 rounded-md">
              <CardBody className="bg-lamaSky py-6 px-4 flex flex-col lg:flex-row gap-4">
                <div className="sm:w-full md:w-full md:flex md:justify-center w-1/3">
                  <Image src='/user.jpg' alt='' width={144} height={144} className="w-36 h-36 rounded-full object-cover"/>
                </div>

                <div className="md:w-full w-2/3 flex flex-col justify-between gap-4">
                  <p className="font-semibold">Zeya Karim</p>
                  <p className="text-xs text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src='/blood.png' alt='' width={14} height={14} />
                      <span className="text-xs text-gray-500">A+</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src='/date.png' alt='' width={14} height={14} />
                      <span className="text-xs text-gray-500">10/10/2024</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src='/mail.png' alt='' width={14} height={14} />
                      <span className="text-xs text-gray-500">zeya.karim87@gmail.com</span>
                    </div>

                    <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                      <Image src='/phone.png' alt='' width={14} height={14} />
                      <span className="text-xs text-gray-500">136-467-365</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="flex-1 flex gap-2 justify-between flex-wrap">
              {/* CARD */}
              {teacherDetailsItems?.map(({icon, number, title}) => (
                <TeacherDetailSmCard key={title} icon={icon} number={number} title={title} />
              ))}
            </div>
          </div>

          <div className="mt-4 bg-white rounded-md p-4 h-[800px] shadow-small">
            <h1>Teacher&apos;s Schedule</h1>
            <BigCalendar type="teacherId" />
          </div>
        </div>

        <div className='w-full lg:w-[29%]'>

        </div>
      </div>
    )
}

export default DetailsPage