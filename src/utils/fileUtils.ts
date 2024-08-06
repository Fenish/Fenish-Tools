import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export async function copyTemplate(
	sourceFilePath: string,
	destinationFolderPath: string,
	fileName: string
) {
	const destinationFilePath = vscode.Uri.file(
		path.join(destinationFolderPath, fileName)
	);

	try {
		const content = fs.readFileSync(sourceFilePath, "utf-8");

		// Remove all lines that contain "// @ts-ignore"
		const cleanedContent = content.replace(/.*\/\/\s*@ts-ignore.*\n?/g, "");

		await vscode.workspace.fs.writeFile(
			destinationFilePath,
			Buffer.from(cleanedContent, "utf-8") // Ensure to specify encoding
		);
		vscode.window.showInformationMessage(`Created template: ${fileName}`);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to create template: ${error}`);
	}
}

export function getActiveEditorFolderPath(): string | undefined {
	const activeEditor = vscode.window.activeTextEditor;
	console.log(activeEditor);
	if (activeEditor) {
		const documentPath = activeEditor.document.fileName;
		return path.dirname(documentPath);
	}
	return undefined;
}

export function getSourceFilePath(
	context: vscode.ExtensionContext,
	language: string,
	fileName: string
): string {
	return path.join(
		context.extensionPath,
		"src",
		"templates",
		"ExpressJS",
		language,
		fileName
	);
}
