import { AccessTime } from '@mui/icons-material';
import Image from 'next/image';
import {Time} from "@internationalized/date";
import InputField from '../formsFields/InputField';
import SelectField from '../formsFields/SelectField';
import DatePickerField from '../formsFields/DatePickerField';
import TimeInputField from '../formsFields/TimeInputField';

const teachers = [
    { "label": "JOHN", "key": "john"},
    { "label": "ARHAM", "key": "arham" },
    { "label": "RAYAN", "key": "rayan"},
    { "label": "POLLARD", "key": "pollard"},
    { "label": "ROBERT", "key": "robert" },
    { "label": "LARA", "key": "lara"},
    { "label": "MICHEAL", "key": "micheal" },
    { "label": "NICK", "key": "nick" }
]

const ExamForm = () => {

    return (
        <div>
            <form action="" method="post">
                <div className="flex gap-3 flex-wrap justify-between">
                    <InputField
                        type="text"
                        label="Subject Name"
                        className="w-[32%] mt-1"
                        isRequired={true}
                        icon={ <Image src="/subject.png" alt="" width={16} height={16} /> }
                    />
                    <InputField
                        type="text"
                        label="Class Name"
                        className="w-[32%] mt-1"
                        isRequired={true}
                        icon={ <Image src="/class.png" alt="" width={18} height={18} /> }
                    />
                    <SelectField
                        isRequired={true}
                        selectionMode="multiple"
                        label="Teacher"
                        className="w-[32%] mt-1"
                        datas={teachers}
                        icon={ <Image src="/teacher.png" alt="" width={16} height={16} /> }
                    />
                    <DatePickerField
                        isRequired={true}
                        label='Date'
                        className="w-[32%] mt-1"
                    />
                    <TimeInputField
                        isRequired={true}
                        label="Start Time" 
                        defaultValue={new Time(9, 0)} 
                        className="w-[32%] mt-1"
                        icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                    <TimeInputField
                        isRequired={true}
                        label="End Time" 
                        defaultValue={new Time(12)} 
                        className="w-[32%] mt-1"
                        icon={<AccessTime className="text-xl text-default-400 pointer-events-none flex-shrink-0" /> }
                    />
                </div>
            </form>
        </div>
    )
}

export default ExamForm;