import * as React from "react";
import { createContext, useContext } from "react";
import { IInputs } from "./generated/ManifestTypes";
import { IAppProps } from "./App";
import { MsalAuthProvider } from "react-aad-msal";

export interface IAppContext {
    msalAuthProvider: MsalAuthProvider;
    componentContext: ComponentFramework.Context<IInputs>;
    forceLogin: boolean;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProps> = (props) => {
    const { msalAuthProvider, componentContext, forceLogin } = props;
    return (
        <AppContext.Provider value={{ msalAuthProvider, componentContext, forceLogin }} >
            {props.children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);