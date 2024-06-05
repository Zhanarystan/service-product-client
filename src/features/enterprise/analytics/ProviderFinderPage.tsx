import { observer } from "mobx-react-lite";
import { useEffect, useReducer, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from "../../../app/stores/store";
import { PredictSalesForDaysRequestData, SalesForPeriodRequestData } from "../../../app/models/dataset";
import { formatDate } from "../../../app/dateHelpers";



export default observer(function ProviderFinderPage() {

    const { analyticsStore } = useStore();

    const [query, setQuery] = useState<string>("");
    
    useEffect(() => {

    }, [analyticsStore.wildberriesProducts])
    
    const submitQuery = () => {
        analyticsStore.findProviders(query);
        setQuery("")
    }
    
    return (
        <>
            <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-3">
                    <div className="row">
                        <div className="col-4">
                            <input className="form-control" type="text" value={query} onChange={e => setQuery(e.target.value)} />
                        </div>
                        <div className="col-4">
                            <button className="ui button" onClick={submitQuery}>Отправить</button>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                   <table>
                        <thead>
                            <tr>
                                <th>Название продукта</th>
                                <th>Цена</th>
                                <th>Рейтинг</th>
                                <th>Количество оценок</th>
                                <th>Ссылка на товар</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                analyticsStore.wildberriesProducts.map(p => 
                                    <tr key={p.url}>
                                        <td>{p.name}</td>
                                        <td>{p.price}</td>
                                        <td>{p.rating}</td>
                                        <td>{p.gradeAmount}</td>
                                        <td><a href={p.url!}>Перейти</a></td>
                                    </tr>
                                )
                            }
                            
                        </tbody>
                   </table>
                </div>
                <div className="col-1"></div>
            </div>
        </>
    )
});