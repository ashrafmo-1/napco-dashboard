import React, {useState} from "react";
import man from "../../../assets/mancard.webp"
import {LogoutOutlined} from "@ant-design/icons";

export const UserProfile = () => {
    const [active, setActive] = useState(false);
    const toggleProfileInformation = () => {
        setActive(!active);
    }

    return (
        <div className={"border-red-900 border-solid border-3 cursor-pointer relative"}>
            <img src={man} width={50} className={"rounded-2xl "} onClick={toggleProfileInformation}/>
            {active &&
                <div className={"profile bg-white shadow-2xl p-2 w-60 absolute right-0 top-12 z-50"}>
                    <div className={"flex gap-2 mb-6"}>
                        <img src={man} width={50} className={"rounded-2xl"} onClick={toggleProfileInformation}/>
                        <div className={"user-data"}>
                            <h6 className={"name font-bold"}>{"ashraf mohamed"}</h6>
                            <h6 className={"email"}>{"ashrafmohamed1176@gmail.com".slice(0, 15)}{"..."}</h6>
                        </div>
                    </div>
                    <div className={"log-out flex gap-3 bg-red-800 p-2 rounded-sm text-white"}>
                        {"logout"}
                        <LogoutOutlined/>
                    </div>
                </div>
            }
        </div>
    )
}