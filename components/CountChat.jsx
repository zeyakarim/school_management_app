'use client'
import Image from 'next/image';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

const CountChat = () => {
    const data = [
        {
          name: "Total",
          count: 260,
          fill: "white",
        },
        {
          name: "Girls",
          count: 253,
          fill: "#FAE27C",
        },
        {
          name: "Boys",
          count: 207,
          fill: "#C3EBFA",
        },
    ];

    return (
        <div className='relative h-[65%]'>
            <ResponsiveContainer>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="100%"
                    barSize={32}
                    data={data} 
                >
                    <RadialBar 
                        background 
                        dataKey='count' 
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            <Image
                src="/maleFemale.png"
                alt=""
                width={50}
                height={50}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    )
}

export default CountChat;