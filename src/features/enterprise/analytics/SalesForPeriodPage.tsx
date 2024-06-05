import { observer } from "mobx-react-lite";
import { useEffect, useReducer, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from "../../../app/stores/store";
import { SalesForPeriodRequestData } from "../../../app/models/dataset";
import { formatDate } from "../../../app/dateHelpers";
// import { DateRangeInput, FocusedInput, OnDatesChangeProps } from "@datepicker-react/styled";
const data = [
    {
        date: "2024-05-01",
        sales: 7000
    },
    {
        date: "2024-05-02",
        sales: 3000
    },
    {
        date: "2024-05-03",
        sales: 1433
    },
    {
        date: "2024-05-04",
        sales: 2301
    },
    {
        date: "2024-05-05",
        sales: 7653
    },
    {
        date: "2024-05-06",
        sales: 2320
    },
    // {
    //   date: "2024-05-01",
    //   sales: 7000
    // }
  ];


//   const initialState : OnDatesChangeProps = {
//     startDate: new Date(),
//     endDate: new Date(),
//     focusedInput: null,
//   }
  
//   function reducer(state : OnDatesChangeProps, action: any) {
//     switch (action.type) {
//       case 'focusChange':
//         return {...state, focusedInput: action.payload}
//       case 'dateChange':
//         return action.payload
//       default:
//         throw new Error()
//     }
//   }



export default observer(function SalesForPeriodPage() {

    const { analyticsStore } = useStore();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {

    }, [analyticsStore.salesForPeriod])
    
    const submitSalesForPeriodRequestData = () => {
        const requestData: SalesForPeriodRequestData = {
            establishmentId: 5,
            start: startDate,
            end: endDate
        }
        analyticsStore.getSalesForPeriod(requestData);
    }
    
    return (
        <>
            <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-control">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date!)} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-control">
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date!)} />
                            </div>
                        </div>
                        <div className="col-4">
                            <button className="ui button" onClick={submitSalesForPeriodRequestData}>Отправить</button>
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