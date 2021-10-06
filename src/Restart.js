import React from "react"

const Restart=({val,restartFunction})=>{

    return(
        <div onClick={restartFunction}>
            {val}
        </div>
    )
}

export default Restart