import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createFile } from "../../utils/fileUtils";

import {
  appConfigTemplate,
  configExportStandardTemplate,
} from "../../templates/config";

import { mainStandardTemplate } from "../../templates/main/main_standard";

export async function initStructureStandard() {
  const workspace = vscode.workspace.workspaceFolders;

  if (!workspace) {
    vscode.window.showErrorMessage("Flutter Mandor: No workspace opened");
    return;
  }

  const rootPath = workspace[0].uri.fsPath;
  const libPath = path.join(rootPath, "lib");
  const pubspecPath = path.join(rootPath, "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) {
    vscode.window.showErrorMessage("Flutter Mandor: Not a Flutter project");
    return;
  }

  const confirm = await vscode.window.showWarningMessage(
    "Flutter Mandor: Pasang Mode Standard (Mode Kuli)?",
    { modal: true },
    "Yes"
  );

  if (confirm !== "Yes") return;

  try {
    if (!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    const coreFiles: Record<string, string> = {
      "core/config/app_config.dart": appConfigTemplate,
      "core/config/config.dart": configExportStandardTemplate,
    };

    Object.entries(coreFiles).forEach(([relativePath, content]) => {
      const fullPath = path.join(libPath, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      createFile(fullPath, content);
    });

    const mainPath = path.join(rootPath, "lib", "main.dart");

    fs.writeFileSync(mainPath, mainStandardTemplate);

    vscode.window.showInformationMessage(
      "Flutter Mandor: Mode Kuli berhasil dipasang!"
    );

  } catch (error: any) {
    vscode.window.showErrorMessage(`Flutter Mandor error: ${error.message}`);
  }
}
