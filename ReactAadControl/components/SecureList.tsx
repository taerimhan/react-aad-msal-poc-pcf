import * as React from "react";
import { useState } from "react";
import { AuthenticationState } from "react-aad-msal";
import { IColumn, SelectionMode } from "@fluentui/react/lib/DetailsList";
import { ShimmeredDetailsList } from "@fluentui/react/lib/ShimmeredDetailsList";
import { useAppContext } from "../AppContext";
import { ISecureRecord } from "../interfaces/ISecureRecord";

export const SecureList: React.FC = () => {
    const { componentContext, msalAuthProvider } = useAppContext();
    const [columns] = useState<IColumn[]>(getColumns());
    const [items, setItems] = useState<ISecureRecord[]>([]);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [accessToken, setAccessToken] = useState<string>();
    const apiUrl = componentContext.parameters.apiUrl.raw!;

    React.useEffect(() => {
        const isAuthenticated 
            = msalAuthProvider.authenticationState === AuthenticationState.Authenticated;

        if (isAuthenticated) {
            msalAuthProvider.getAccessToken().then((accessTokenResponse) => {
                setAccessToken(accessTokenResponse.accessToken);
            });
        }
    }, [msalAuthProvider, msalAuthProvider.authenticationState]);

    React.useEffect(() => {
        if (accessToken) {
            getSecureValues(apiUrl, accessToken).then((values) => {
                setItems(values);
                setIsDataLoaded(true);
            }, (err) => {
                console.log(err);
            })
        }
    }, [accessToken]);

    return (
        <React.Fragment>
            <ShimmeredDetailsList
                setKey="items"
                items={items}
                columns={columns}
                selectionMode={SelectionMode.none}
                enableShimmer={!isDataLoaded}
            />
        </React.Fragment>
    );
}

const getSecureValues = async (apiUrl: string, accessToken: string): Promise<ISecureRecord[]> => {
    const response = await fetch(apiUrl + "/api/Secure", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
    });
    return response ? await response.json() : [];
}

const getColumns = () => {
    const defaultProps = { 
        isResizable: true, 
        isPadded: true, 
        isRowHeader: true, 
        minWidth: 200 
    };

    const columns: IColumn[] = [
        { key: "column0", name: "Name", fieldName: "name", data: "string", ...defaultProps },
        { key: "column1", name: "Value", fieldName: "value", data: "string", ...defaultProps }
    ];

    return columns;
}