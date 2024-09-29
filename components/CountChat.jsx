'use client'
import React from 'react'
import { RadialBar, RadialBarChart, ResponsiveContainer, Legend } from 'recharts';

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
        <div className='h-[75%]'>
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
        </div>
    )
}

export default CountChat;