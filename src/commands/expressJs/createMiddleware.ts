import * as vscode from "vscode";

import {
	copyTemplate,
	getActiveEditorFolderPath,
	getSourceFilePath,
} from "../../utils/fileUtils";
import {
	quickInput,
	quickPickLanguage,
	quickPickOption,
} from "../../utils/selectUtils";

export function registerExpressMiddleware(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"fenishTools.createExpressMiddleware",
		async (uri: vscode.Uri) => {
			const folderPath = uri?.fsPath || getActiveEditorFolderPath();
			if (!folderPath) {
				vscode.window.showErrorMessage(
					"No folder selected or active editor folder not found."
				);
				return;
			}

			const options = ["Lowercase params"];

			const selectedOption = await quickPickOption(options);
			const selectedLanguage = await quickPickLanguage();
			let fileName = await quickInput("Enter a file name");

			if (!selectedOption) {
				vscode.window.showErrorMessage("Please select an option.");
				return;
			}

			if (!selectedLanguage) {
				vscode.window.showErrorMessage("Please select a language.");
				return;
			}

			const sourceFileName = getSourceFileName(
				selectedOption,
				selectedLanguage.extension
			);
			if (!sourceFileName) return;

			const sourceFilePath = getSourceFilePath(
				context,
				selectedLanguage.language,
				sourceFileName
			);

			if (!fileName) {
				fileName = sourceFileName;
			} else {
				fileName = fileName + selectedLanguage.extension;
			}

			await copyTemplate(sourceFilePath, folderPath, fileName);
		}
	);

	context.subscriptions.push(disposable);
}

function getSourceFileName(option: string, extension: string): string | null {
	switch (option) {
		case "Lowercase params":
			return "lowerCase" + extension;
		default:
			vscode.window.showErrorMessage("Invalid option selected.");
			return null;
	}
}
