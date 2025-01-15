import { createContext, ReactNode, useState } from "react";

export type AccountProps ={
    name?: string;
    email?: string;
    phone?: string;
    birth?: string;
    password?: string;
    passwordConfirm?: string;
}

type AccountFormContextDateProps ={
    accountFormData: AccountProps;
}

type AccountFormProviderProps ={
    children: ReactNode;
}

const accountFormContext = createContext<AccountFormContextDateProps>({} as AccountFormContextDateProps);

function AccountProvider({ children }){

}