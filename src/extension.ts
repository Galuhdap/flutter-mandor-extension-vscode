import * as vscode from "vscode";

// Import command
import { pasangModeCommand } from "./commands/mandorModeCommand";

export function activate(context: vscode.ExtensionContext) {

  // Command utama untuk pilih mode arsitektur
  const pasangMode = vscode.commands.registerCommand(
    "flutterMandor.pasangMode",
    pasangModeCommand
  );

  context.subscriptions.push(
    pasangMode,
  );

  vscode.window.showInformationMessage(
    "Flutter Mandor siap kerja boss! 🔧"
  );
}

export function deactivate() {}
