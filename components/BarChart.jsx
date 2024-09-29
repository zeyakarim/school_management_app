'use client'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


const data = [
    {
        "name": "Mon",
        "present": 60,
        "absent": 40
    },
    {
        "name": "Tue",
        "present": 30,
        "absent": 70
    },
    {
        "name": "Wed",
        "present": 50,
        "absent": 50
    },
    {
        "name": "Thr",
        "present": 20,
        "absent": 80
    },
    {
        "name": "Fri",
        "present": 98,
        "absent": 2
    },
    {
        "name": "Sat",
        "present": 90,
        "absent": 10
    }
]
  

const BarChartData = () => {
    return (
        <ResponsiveContainer width='100%' height='90%'>
            <BarChart width={500} height={300} data={data} barSize={10}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tick={{ fill: "#d1d5db" }}
                    tickLine={false}
                />
                <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                <Tooltip
                    contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
                />
                <Legend
                    align="left"
                    verticalAlign="top"
                    wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
                />
                <Bar
                    dataKey="present"
                    fill="#FAE27C"
                    legendType="circle"
                    radius={[10, 10, 0, 0]}
                />
                <Bar
                    dataKey="absent"
                    fill="#C3EBFA"
                    legendType="circle"
                    radius={[10, 10, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartData;