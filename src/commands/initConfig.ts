import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createFile } from "../utils/fileUtils";
import {
  flavorConfigTemplate,
  envTemplate,
  appConfigTemplate,
  configExportTemplate,
} from "../templates/config";

import {
  mainDevTemplate,
  mainStagingTemplate,
  mainProdTemplate,
  mainPageTemplate,
} from "../templates/main";

export async function initConfigCommand() {
  const workspace = vscode.workspace.workspaceFolders;
  if (!workspace) {
    vscode.window.showErrorMessage("No workspace opened");
    return;
  }

  const rootPath = workspace[0].uri.fsPath;
  const libPath = path.join(rootPath, "lib");
  const pubspec = path.join(rootPath, "pubspec.yaml");

  if (!fs.existsSync(pubspec)) {
    vscode.window.showErrorMessage("Not a Flutter project");
    return;
  }

  const confirm = await vscode.window.showWarningMessage(
    "Generate Flutter config structure?",
    { modal: true },
    "Yes"
  );

  if (confirm !== "Yes") return;

  const files: Record<string, string> = {
    "core/config/flavor_config.dart": flavorConfigTemplate,
    "core/config/env.dart": envTemplate,
    "core/config/app_config.dart": appConfigTemplate,
    "core/config/config.dart": configExportTemplate,
  };

  Object.entries(files).forEach(([relativePath, content]) => {
    const fullPath = path.join(libPath, relativePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    createFile(fullPath, content);
  });

    const mainFiles: Record<string, string> = {
    'main_dev.dart': mainDevTemplate,
    'main_staging.dart': mainStagingTemplate,
    'main_prod.dart': mainProdTemplate,
    'main_page.dart': mainPageTemplate,
  };

  Object.entries(mainFiles).forEach(([fileName, content]) => {
    const fullPath = path.join(libPath, fileName);
    createFile(fullPath, content);
  });

  vscode.window.showInformationMessage("Flutter Mandor: Config generated!");
}
