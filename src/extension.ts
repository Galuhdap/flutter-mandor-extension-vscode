import * as vscode from 'vscode';
import { initConfigCommand } from './commands/initConfig';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'flutterMandor.initStructure',
      initConfigCommand
    )
  );
}

export function deactivate() {}
