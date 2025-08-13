import { useFrame } from "@react-three/fiber";
import { Environment,PerspectiveCamera } from "@react-three/drei";

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"

import { World } from "../world";

interface modelScrollProps{
    percent : number
}

export function ModelScroll({ percent } : modelScrollProps){
    const cameraPosition = useRef<|null>(null)
    const tl = useRef<|null>(null)
    
    
    useFrame((_)=>{
        if (tl.current) tl.current.seek(percent * tl.current.duration())

    })
    useLayoutEffect(()=>{
        tl.current = gsap.timeline({
            defaults : {duration:8, ease : "power1.inOut"}
        })
        tl.current
        .to(
            cameraPosition.current.position, {z : 0.5, y:0}, 0
        )
        .to(
            cameraPosition.current.rotation, { x : -Math.PI / 6}, 0
        )
        .to(
            cameraPosition.current.position, {z : 0.35}, 4
        )
        .to(
            cameraPosition.current.rotation, {x : 0}, 4.5
        )
        .to(
            cameraPosition.current.position, { x : -0.4}, 8
        )
        .to(
            cameraPosition.current.position, {y : 0.2}, 10
        )
        .to(
            cameraPosition.current.position, {z : 0}, 14
        )
    },[])

    return(
        <>
            <Environment files={"/hdr/spruit_sunrise_1k.hdr"} />
            <PerspectiveCamera makeDefault fov={50}  ref={cameraPosition} position={[0, 0.4, 0.7]}/>
            <World />
        </>
    )
}
