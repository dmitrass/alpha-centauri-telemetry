import * as React from 'react';
import {useState, useEffect} from 'react';
import Chart from "./Chart";
import {Row, Badge, Spinner} from "reactstrap";
import Request from "axios-request-handler";

interface StationProps {
    clientKey: string;
    name: string;
    points: number[];
    time: any;
    enabled: boolean;
}

const Station = (props: StationProps) => {
    const {clientKey, name, points, time, enabled} = props
    const [state, setState] = useState(null)
    const [data, setUpdateData] = useState(null)
    const [delta, setDelta] = useState([])

    useEffect(() => {
        // @ts-ignore
        setState(normalizedChartData(points))
    }, [])

    useEffect(() => {
        setTimeout(() => {
            getData()
        }, 3000)
    }, [])

    useEffect(() => {
        if (data) {
            setDelta(data.delta)
            setState(normalizedChartData(delta))
        }
    }, [data])

    const requestErrorHandler = (error) => {
        if (error.response) {
            if (error.response.status == 500) {
                console.log(error.response.data)
            }
        }
    }

    const getData = async () => {
        if (props) {
            let {time} = props
            if (data) {
                time = data.time
            }

            const request = new Request(`/api/v1/client/${clientKey}/delta/${name}/since/${time}`, {errorHandler:(error) => {requestErrorHandler(error)}})

            await request.poll(100).get((res: { data: React.SetStateAction<null> }) => {
                if (res) {
                    setUpdateData(res.data);
                }
            })
        }
    }


    const normalizedChartData = (data: any) => {
        let chartData: { temperature: any; index: any; }[] = []

        data.map((item: any, i: any) => {
            chartData.push(Object.assign({}, {temperature: item, index: i}))
        })

        return chartData
    }

    const renderEnabledBadge = () => {
        if (data) {
            if (data.enabled === true) {
                return <Badge color="success">Enabled</Badge>
            } else {
                return <Badge color="danger">Disabled</Badge>
            }
        }
        return <Badge style={{ display: "inline-flex" }} color="secondary"
        >Receiving status
            <Spinner style={{ width: '1.3rem', height: '1.3rem', marginLeft: '0.5rem', padding: '0' }} />
        </Badge>
    }


    return (
        <>
            <h3>
                Telemetry from station {name}&nbsp;
                {renderEnabledBadge()}
            </h3>
            <Row>
                <Chart data={state}/>
            </Row>
        </>

    );
};

export default Station;