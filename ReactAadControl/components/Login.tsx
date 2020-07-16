import * as React from "react";
import { ActionButton, Stack } from "office-ui-fabric-react";
import { AzureAD, IAzureADFunctionProps, AuthenticationState } from "react-aad-msal";
import { useAppContext } from "../AppContext";

export const Login: React.FC = () => {
    const { msalAuthProvider } = useAppContext();
    return (
        <div>
            <AzureAD provider={msalAuthProvider}>
                {({ login, logout, authenticationState, accountInfo }: IAzureADFunctionProps) => {
                    const isInProgress =
                        authenticationState === AuthenticationState.InProgress;
                    const isAuthenticated =
                        authenticationState === AuthenticationState.Authenticated;
                    const isUnauthenticated =
                        authenticationState === AuthenticationState.Unauthenticated;
                    return (
                        <Stack verticalAlign={"center"}
                            horizontalAlign={"end"}
                            horizontal tokens={{ childrenGap: 4 }}>
                            {isAuthenticated && (
                                <ActionButton
                                    iconProps={{ iconName: "Signout" }}
                                    onClick={logout}>
                                    {accountInfo?.account?.name}
                                </ActionButton>
                            )}
                            {(isUnauthenticated || isInProgress) && (
                                <ActionButton
                                    iconProps={{ iconName: "Signin" }}
                                    onClick={login}
                                    disabled={isInProgress}>
                                    Sign in
                                </ActionButton>
                            )}
                        </Stack>
                    )
                }}
            </AzureAD>
        </div>
    );
}