import { useState } from "react"

interface EnvironmentSettingsProps{
    shadowplaneActive: boolean,
    setshadowplaneActive : React.Dispatch<React.SetStateAction<boolean>>
}

const EnvironmentSettings = ({shadowplaneActive, setshadowplaneActive} : EnvironmentSettingsProps) => {

    return (
        <div className="text-white">
            <h3>ENVIRONMENT</h3>
            <hr/>
            <ul>
                <li>
                    <span className="property-title">Plane: </span>
                    <input type='checkbox' checked={shadowplaneActive} onChange={(e) => setshadowplaneActive(e.target.checked)}/>
                </li>
            </ul>
        </div>
    )
}

export default EnvironmentSettings