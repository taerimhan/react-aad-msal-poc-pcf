import { IInputs, IOutputs } from "./generated/ManifestTypes";
import React = require("react");
import ReactDOM = require("react-dom");
import { initializeIcons } from '@uifabric/icons';
import { App, IAppProps } from "./App";
import { IConfig } from "./interfaces/IConfig";
import { createMsalAuthProvider } from "./MsalAuthProvider";

initializeIcons();

export class ReactAadControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _props: IAppProps;

	constructor() {}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;

		this._props = {
			componentContext: context,
			msalAuthProvider: createMsalAuthProvider({
					appId: context.parameters.azureADAppId.raw!,
					appRedirectUrl: context.parameters.azureADAppRedirectUrl.raw!,
					appAuthority: context.parameters.azureADAppAuthority.raw!,
					appScopes: (context.parameters.azureADAppScopes.raw || "").split(";"),
					cacheLocation: context.parameters.cacheLocation.raw || "sessionStorage"
				} as IConfig),
			forceLogin: context.parameters.forceLogin.raw == "true"
		};
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._props.componentContext = context;

		ReactDOM.render(
			React.createElement(App, this._props),
			this._container
		);
	}

	public getOutputs(): IOutputs {
		return {};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}
}