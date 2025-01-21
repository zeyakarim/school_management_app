'use client'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


const data = [
    {
        "name": "Mon",
        "Present": 60,
        "Absent": 40
    },
    {
        "name": "Tue",
        "Present": 30,
        "Absent": 70
    },
    {
        "name": "Wed",
        "Present": 50,
        "Absent": 50
    },
    {
        "name": "Thr",
        "Present": 20,
        "Absent": 80
    },
    {
        "name": "Fri",
        "Present": 98,
        "Absent": 2
    },
    {
        "name": "Sat",
        "Present": 90,
        "Absent": 10
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
                    dataKey="Present"
                    fill="#FAE27C"
                    legendType="circle"
                    radius={[10, 10, 0, 0]}
                />
                <Bar
                    dataKey="Absent"
                    fill="#C3EBFA"
                    legendType="circle"
                    radius={[10, 10, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartData;