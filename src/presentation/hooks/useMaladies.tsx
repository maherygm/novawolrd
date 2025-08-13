import { create } from "zustand";

const maladieStore = create((set) => (
    {
        maladies: null,
        setMaladies: (maladies: any) => set({ maladies }),
    }
))

export const useMaladies = () => {
    

    const maladies = maladieStore((state) => state.maladies)
    const setMaladies = maladieStore((state) => state.setMaladies)
    
    return {
        maladies,
        setMaladies
    }
}

