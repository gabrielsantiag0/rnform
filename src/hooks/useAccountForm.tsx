import { useContext } from "react";


import { AccountFormContext } from "../context/AccountFormContext";

export function useAccountForm() {
 
    const context = useContext(AccountFormContext);
    
    return context;

}