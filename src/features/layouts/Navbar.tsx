import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";
import Loading from "../common/Loading";

let routes = [
    "/enterprise/cash-register",
    "/enterprise/employees",
    "/enterprise/products",
    "/enterprise/establishment",
    "/profile",
    "/enterprise/sales-for-period",
    "/enterprise/prediction-for-days",
    "/enterprise/parse-data"
]
export default observer(function Navbar() {
    const {userStore: {getUser, logout, user}} = useStore();
    const location = useLocation();
    if(!user) return <Loading />
    return (
        <div className="ui inverted segment" style={{marginBottom: "50px"}}>
            <div className="ui inverted secondary pointing menu">
                {user.roles.includes("establishment_seller") || user.roles.includes("establishment_admin") ? 
                    <Link className={location.pathname === routes[0] ? "item active" : "item"} to={routes[0]}>
                        Касса
                    </Link>
                : ""}
                {user.roles.includes("establishment_admin") ? 
                    <>
                        <Link className={location.pathname === routes[1] ? "item active" : "item"} to={routes[1]}>
                            Сотрудники
                        </Link>
                        <Link className={location.pathname === routes[2] ? "item active" : "item"} to={routes[2]}>
                            Продукты
                        </Link>
                        <Link className={location.pathname === routes[3] ? "item active" : "item"} to={routes[3]}>
                            Заведение
                        </Link>
                        <Link className={location.pathname === routes[5] ? "item active" : "item"} to={routes[5]}>
                            Продажи за период
                        </Link>
                        <Link className={location.pathname === routes[6] ? "item active" : "item"} to={routes[6]}>
                            Прогнозирование продаж
                        </Link>
                        <Link className={location.pathname === routes[7] ? "item active" : "item"} to={routes[7]}>
                            Нахождение товара
                        </Link>
                    </>
                : ""}
                <div className="right menu">
                    <Link className={location.pathname === routes[4] ? "item active" : "item"} to={routes[4]}>
                        {user.username !== null ? user.username : ""}
                    </Link>
                    <a className="ui item" onClick={() => logout()}>
                        Выйти
                    </a>
                </div>
            </div>
        </div>
    )
});