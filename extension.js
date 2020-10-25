const vscode = require('vscode');
const fs = require('fs');
const path =  require('path');


/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	let disposable = vscode.commands.registerCommand('deletehotupdate.run', function () {

		const rootPath = vscode.workspace.rootPath;

		if (!rootPath) return;

		fs.readdir(rootPath, (err, files) => {
			if(err) {
				vscode.window.showInformationMessage(err);
			}

			files
				.filter(filePath => filePath.includes('.hot-update.'))
				.forEach(filePath => {
					fs.unlink(path.join(rootPath, filePath), (err) => {
						if (err) throw err;
						vscode.window.showInformationMessage(`${filePath} was deleted`);
					});
				});
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
