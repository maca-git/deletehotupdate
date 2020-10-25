const vscode = require('vscode');
const fs = require('fs');
const path = require('path');


/**
 * @param {vscode.ExtensionContext} context
 */

const rootPath = vscode.workspace.rootPath;

function activate(context) {

	let deleteOnce = vscode.commands.registerCommand('deletehotupdate.deleteOnce', function () {

		if (!rootPath) return;

		fs.readdir(rootPath, (err, files) => {
			if (err) {
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

	let watch = vscode.commands.registerCommand('deletehotupdate.watch', function () {
		if (!rootPath) return;

		fs.watch(rootPath, { encoding: 'utf-8' }, (eventType, filename) => {
			if (filename.includes('.hot-update.')) {
				fs.unlink(path.join(rootPath, filename), (err) => {
					if (err) throw err;
					vscode.window.showInformationMessage(`${filename} was deleted`);
				});
			}
		});
	});

	context.subscriptions.push(deleteOnce);
	context.subscriptions.push(watch);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
