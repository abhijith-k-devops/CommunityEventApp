import { useContext } from "react";
import { RSVPContext } from "../contexts/RSVPContext";


export function useRSVP() {
    const context = useContext(RSVPContext);
    if (!context) {
        throw new Error("useRSVP must be used within a RSVPContextProvider");
    }
    return context;
}