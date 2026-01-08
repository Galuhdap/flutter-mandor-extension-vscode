import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export function initAssetsFolder(rootPath: string) {
  const assetsRoot = path.join(rootPath, "assets");

  const folders = ["assets/images", "assets/icons", "assets/fonts"];

  folders.forEach((folder) => {
    const full = path.join(rootPath, folder);
    if (!fs.existsSync(full)) {
      fs.mkdirSync(full, { recursive: true });
    }
  });

  return assetsRoot;
}

export function copyMandorImage(rootPath: string, context: vscode.ExtensionContext) {
  // Path file sumber di extension

  //Development
  //   const sourceImage = path.join(
  //     "/Users/galuhdap/Development/flutter_mandor/flutter-mandor/src/templates/asset/images/flutter_mandor.png"
  //   );

  const sourceImage = path.join(
    context.extensionPath,
    "out/templates/asset/images/flutter_mandor.png" // <- copy dulu src -> out saat build
  );

  console.log("Source image path:", sourceImage);
  const destDir = path.join(rootPath, "assets/images");
  const destFile = path.join(destDir, "flutter_mandor.png");

  // Pastikan folder assets/images ada
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copy file
  fs.copyFileSync(sourceImage, destFile);
  console.log("flutter_mandor.png berhasil disalin ke", destFile);
  vscode.window.showInformationMessage(
    "Flutter Mandor: flutter_mandor.png berhasil ditambahkan ke assets/images/"
  );
}
