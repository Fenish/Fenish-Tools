import * as vscode from "vscode";

export async function quickPickLanguage(): Promise<{
	extension: string;
	language: string;
}> {
	const languages = ["Javascript", "Typescript"];
	const selectedLanguage = await vscode.window.showQuickPick(languages, {
		placeHolder: "Select a language",
	});

	return {
		extension: selectedLanguage === "Javascript" ? ".js" : ".ts",
		language: selectedLanguage as string,
	};
}

export async function quickPickOption(options: string[]) {
	const selectedOption = await vscode.window.showQuickPick(options, {
		placeHolder: "Select an option",
	});

	return selectedOption;
}

export async function quickInput(placeholder: string = "Enter a value") {
	const selectedOption = await vscode.window.showInputBox({
		placeHolder: placeholder,
	});

	return selectedOption;
}
