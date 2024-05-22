import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import Loading from "../../common/Loading";

export default observer(function ManufacturerListPage() {

    const {adminStore: {getManufacturers, currentPage, setCurrentPage, maxPage, manufacturers, loading}} = useStore();
    const [searchingString, setSearchString] = useState<string>("");
    useEffect(() => {
        getManufacturers();
        setCurrentPage(1);
    }, [])

    return (
        <>
            <h1>Производители</h1>
            <Link to={`/admin/manufacturer-create`}>
                <button className="medium green ui button">
                    <div className="d-flex">
                        <i className="plus icon"></i>
                        <p>Добавить</p>
                    </div>
                </button>
            </Link>
            <div className="ui fluid icon input" style={{marginTop: "10px"}}>
                <input type="text" placeholder="Имя производителя..." onChange={(e) => setSearchString(e.target.value)} />
                <i className="search icon"></i>
            </div>
            {loading ? <Loading/> : ""}
            <table className="ui striped table">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.slice(currentPage * 10 - 10, currentPage * 10).map(m => (
                        <tr>
                            <td>{m.name}</td>
                            <td>{m.description}</td>
                            <td>
                                <Link to={`/admin/manufacturers/${m.id}`}>
                                    <button className="ui icon button">
                                        <div className="d-flex">
                                            <i className="pencil alternate icon"></i>
                                            <p>Изменить</p>
                                        </div>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="ui left labeled icon button" onClick={() => setCurrentPage(currentPage - 1)}>
                <i className="left arrow icon"></i>
                Предыдущая
            </button>
            <div className="ui input labeled icon" style={{width: "100px"}}>
                <input type="number" value={currentPage} onChange={(e) => setCurrentPage(+e.target.value)}/>
            </div>
            <button className="ui right labeled icon button" onClick={() => setCurrentPage(currentPage + 1)}>
                <i className="right arrow icon"></i>
                Следующая
            </button>
        </>
    )
})