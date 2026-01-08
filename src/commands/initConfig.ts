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

import { vscodeLaunchTemplate } from "../templates/lunch_json/vscodeConfig";

// 🔥 IMPORT TEMPLATE ANDROID
import { androidFlavorGradleTemplate } from "../templates/gradle/flavoConfigAndroidApp";

// =========================
// Fungsi baru untuk inject gradle
// =========================
async function injectAndroidFlavor(rootPath: string) {
  const gradlePath = path.join(rootPath, "android/app/build.gradle.kts");

  if (!fs.existsSync(gradlePath)) {
    vscode.window.showErrorMessage(
      "Flutter Mandor: build.gradle.kts not found"
    );
    return;
  }

  let content = fs.readFileSync(gradlePath, "utf-8");

  if (content.includes("productFlavors")) {
    vscode.window.showInformationMessage(
      "Flutter Mandor: Android flavor already exists"
    );
    return;
  }

  const marker = "buildTypes {";

  if (!content.includes(marker)) {
    vscode.window.showErrorMessage(
      "Flutter Mandor: Gradle structure not recognized"
    );
    return;
  }

  const injection = `
${androidFlavorGradleTemplate}

${marker}`;

  content = content.replace(marker, injection);

  fs.writeFileSync(gradlePath, content);

  vscode.window.showInformationMessage(
    "Flutter Mandor: Android flavor injected successfully!"
  );
}

// =========================
// COMMAND UTAMA
// =========================
export async function initConfigCommand() {
  const workspace = vscode.workspace.workspaceFolders;

  if (!workspace) {
    vscode.window.showErrorMessage("No workspace opened");
    return;
  }

  const rootPath = workspace[0].uri.fsPath;
  const libPath = path.join(rootPath, "lib");
  const pubspecPath = path.join(rootPath, "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) {
    vscode.window.showErrorMessage("Not a Flutter project");
    return;
  }

  const confirm = await vscode.window.showWarningMessage(
    "Generate Flutter config structure?",
    { modal: true },
    "Yes"
  );

  if (confirm !== "Yes") return;

  try {
    // pastikan folder lib ada
    if (!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    // =========================
    // Core Config Files
    // =========================

    const coreFiles: Record<string, string> = {
      "core/config/flavor_config.dart": flavorConfigTemplate,
      "core/config/env.dart": envTemplate,
      "core/config/app_config.dart": appConfigTemplate,
      "core/config/config.dart": configExportTemplate,
    };

    Object.entries(coreFiles).forEach(([relativePath, content]) => {
      const fullPath = path.join(libPath, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      createFile(fullPath, content);
    });

    // =========================
    // Main Files
    // =========================

    const mainFiles: Record<string, string> = {
      "main_dev.dart": mainDevTemplate,
      "main_staging.dart": mainStagingTemplate,
      "main_prod.dart": mainProdTemplate,
      "main_page.dart": mainPageTemplate,
    };

    Object.entries(mainFiles).forEach(([relativePath, content]) => {
      const fullPath = path.join(libPath, relativePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      createFile(fullPath, content);
    });

    // =========================
    // VS Code launch.json
    // =========================

    const vscodeFolder = path.join(rootPath, ".vscode");

    if (!fs.existsSync(vscodeFolder)) {
      fs.mkdirSync(vscodeFolder, { recursive: true });
    }

    const launchJsonPath = path.join(vscodeFolder, "launch.json");

    await createFile(launchJsonPath, vscodeLaunchTemplate);

    // =========================
    // 🔥 BAGIAN BARU: INJECT ANDROID FLAVOR
    // =========================

    await injectAndroidFlavor(rootPath);

    // =========================

    vscode.window.showInformationMessage(
      "Flutter Mandor: Config generated completely!"
    );
  } catch (error: any) {
    vscode.window.showErrorMessage(`Flutter Mandor error: ${error.message}`);
  }
}
