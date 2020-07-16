import { CacheLocation } from "msal";

export interface IConfig {
    appId: string;
    appRedirectUrl: string;
    appScopes: string[];
    appAuthority: string;
    cacheLocation: CacheLocation;
}