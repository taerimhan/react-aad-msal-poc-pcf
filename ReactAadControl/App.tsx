import * as React from "react";
import AzureAD, { MsalAuthProvider, IAzureADFunctionProps } from "react-aad-msal";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { IInputs } from "./generated/ManifestTypes";
import { AppProvider } from "./AppContext";
import { Login } from "./components/Login";
import { SecureList } from "./components/SecureList";

export interface IAppProps {
    componentContext: ComponentFramework.Context<IInputs>;
    msalAuthProvider: MsalAuthProvider;
    forceLogin: boolean;
}

export const App: React.FC<IAppProps> = (props: IAppProps) => {
    const [forceLogin, setForceLogin] = React.useState(props.forceLogin);
    return (
        <AppProvider {...props}>
            <AzureAD provider={props.msalAuthProvider} forceLogin={forceLogin}>
                {({ error, accountInfo }: IAzureADFunctionProps) => {
                    if (error && forceLogin == true) {
                        setForceLogin(false);
                    }
                    return (<React.Fragment>
                        {error && (
                            <MessageBar messageBarType={MessageBarType.error}>
                                {error.errorMessage}
                            </MessageBar>
                        )}
                        <Login></Login>
                        {accountInfo
                            ? <SecureList></SecureList>
                            : <div>Please sign in to see secure content</div>
                        }
                    </React.Fragment>)
                }}
            </AzureAD>
        </AppProvider>
    );
}