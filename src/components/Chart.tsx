import * as React from 'react';
import {Legend, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartTooltip } from './Tooltip';

const Chart = (props: { data: any} ) => {
    const { data } = props

    return (
        <ResponsiveContainer width='100%' height={500}>
            <LineChart data={data}
                       margin={{top: 10, right: 0, left: -10, bottom: 0}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis />
                <YAxis />
                <Tooltip
                  content={
                    // @ts-ignore
                    <ChartTooltip />
                  }
                />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" isAnimationActive={false}/>
            </LineChart>
        </ResponsiveContainer >
    );
};

export default Chart;
