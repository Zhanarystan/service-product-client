import { observer } from "mobx-react-lite";
import { useEffect, useReducer, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from "../../../app/stores/store";
import { PredictSalesForDaysRequestData, SalesForPeriodRequestData } from "../../../app/models/dataset";
import { formatDate } from "../../../app/dateHelpers";



export default observer(function PredictSalesForDays() {

    const { analyticsStore } = useStore();

    const [days, setDays] = useState<string>("");
    
    useEffect(() => {

    }, [analyticsStore.salesForPeriod])
    
    const submitPredictSalesForDaysRequestData = () => {
        const requestData: PredictSalesForDaysRequestData = {
            establishmentId: 5,
            days: +days
        };
        analyticsStore.predictSalesForDays(requestData);
    }
    
    return (
        <>
            <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control" type="number" value={days} onChange={e => setDays(e.target.value)} />
                        </div>
                        <div className="col-4">
                            <button className="ui button" onClick={submitPredictSalesForDaysRequestData}>Отправить</button>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <LineChart
                        width={1000}
                        height={600}
                        data={analyticsStore.salesForPeriod}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date"
                            tickFormatter={(date) => formatDate(date)}    
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className="col-1"></div>
            </div>
        </>
    )
});