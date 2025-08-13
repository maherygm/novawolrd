import { useEffect, useState } from "react"


import { PinSection } from "../components/traggerContent"
import "./style.scss"
export function LandingRevel3D(){
    const [percent, setPercent] = useState(0)
    const setValPercent = (n:number)=>{
        setPercent(n)
    }
    useEffect(()=>{
        console.log(percent)
    },[percent])
    return(
        <>
           
            <PinSection setPercent={setValPercent}/>

        </>
    )
}