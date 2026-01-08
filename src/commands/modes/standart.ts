import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { createFile } from "../../utils/fileUtils";

// Template config minimal
import { appConfigTemplate } from "../../templates/config";

import { copyMandorImage, initAssetsFolder } from "../../utils/assetUtils";
import { injectAssetsToPubspec } from "../../utils/pubspecUtils";

// Template main standard
import { mainStandardTemplate } from "../../templates/main/main_standard";

// Template tambahan presentation
import { imageWidgetTemplate } from "../../templates/presentations/mandor/widget/image_widget";
import { getFlutterProjectName } from "../../utils/flutterUtils";
import { flutterMandorPageTemplate } from "../../templates/presentations/mandor/page/mandor_page";

export async function initStructureStandard(context: vscode.ExtensionContext) {
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

  const projectName = getFlutterProjectName(rootPath);

  if (!projectName) {
    vscode.window.showErrorMessage("Flutter Mandor: pubspec.yaml invalid");
    return;
  }

  try {
    // pastikan folder lib ada
    if (!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    // =========================
    // Generate Core Config Files
    // =========================

    const coreFiles: Record<string, string> = {
      "core/config/app_config.dart": appConfigTemplate,
      //"core/config/config.dart": configExportTemplate,
    };

    Object.entries(coreFiles).forEach(([relativePath, content]) => {
      const fullPath = path.join(libPath, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      createFile(fullPath, content);
    });

    // =========================
    // Generate Presentation Files
    // =========================

    const presentationsFiles: Record<string, string> = {
      "presentations/mandor/page/flutter_mandor_page.dart":
        flutterMandorPageTemplate(projectName),
      "presentations/mandor/widget/image_widget.dart": imageWidgetTemplate,
    };

    Object.entries(presentationsFiles).forEach(([relativePath, content]) => {
      const fullPath = path.join(libPath, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      createFile(fullPath, content);
    });

    // =========================
    // Replace main.dart
    // =========================

    const mainPath = path.join(libPath, "main.dart");

    fs.writeFileSync(mainPath, mainStandardTemplate);

    // =========================

    // =========================
    // Buat folder assets (memakai util kamu)
    // =========================
    initAssetsFolder(rootPath);

    // =========================
    // Inject assets ke pubspec.yaml (memakai util kamu)
    // =========================
    injectAssetsToPubspec(rootPath);

    // =========================

    // =========================
    // Copy file flutter_mandor.png ke assets/images/
    // =========================
    copyMandorImage(rootPath, context);

    // =========================

    vscode.window.showInformationMessage(
      "Flutter Mandor: Mode Standard (Mode Kuli) berhasil dipasang!"
    );
  } catch (error: any) {
    vscode.window.showErrorMessage(`Flutter Mandor error: ${error.message}`);
  }
}
