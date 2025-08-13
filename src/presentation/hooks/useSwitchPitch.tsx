import { create } from "zustand";

const maladieStore = create((set) => (
    {
        pitch: 60,
        setPitch: (pitch: any) => set({ pitch }),
    }
))

export const usePitch = () => {
    

    const pitch = maladieStore((state) => state.pitch)
    const setPitch = maladieStore((state) => state.setPitch)
    
    return {
        pitch,
        setPitch
    }
}

