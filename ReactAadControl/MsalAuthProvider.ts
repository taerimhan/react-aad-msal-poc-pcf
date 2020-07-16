import { MsalAuthProvider, LoginType } from "react-aad-msal";
import { LogLevel, Logger } from "msal";
import { IConfig } from "./interfaces/IConfig";
import "regenerator-runtime";

export const createMsalAuthProvider = (config: IConfig): MsalAuthProvider => {
   
    return new MsalAuthProvider({
            auth: {
                authority: config.appAuthority,
                clientId: config.appId,
                postLogoutRedirectUri: window.location.href,
                redirectUri: config.appRedirectUrl,
                validateAuthority: true,
                navigateToLoginRequestUrl: false
            },
            system: {
                logger: new Logger((logLevel, message, containsPii) => {
                    console.log("[MSAL]", message);
                },
                {
                    level: LogLevel.Verbose,
                    piiLoggingEnabled: false
                })
            },
            cache: {
                cacheLocation: config.cacheLocation,
                storeAuthStateInCookie: false
            }
        },
        {
            scopes: config.appScopes
        },
        {
            loginType: LoginType.Popup,
            tokenRefreshUri: window.location.origin
        }
    )
};