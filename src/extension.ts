import * as vscode from "vscode";

import { registerExpressMiddleware } from "./commands/expressJs/createMiddleware";

export function activate(context: vscode.ExtensionContext) {
	registerExpressMiddleware(context);
}

export function deactivate() {}
