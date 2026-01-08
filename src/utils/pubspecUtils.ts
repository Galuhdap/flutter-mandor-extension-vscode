import * as fs from "fs";
import * as vscode from "vscode";
import * as path from "path";


export function injectAssetsToPubspec(rootPath: string) {
  const pubspecPath = path.join(rootPath, "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) {
    vscode.window.showErrorMessage("Flutter Mandor: pubspec.yaml not found");
    return;
  }

  let content = fs.readFileSync(pubspecPath, "utf-8");

  // Cari section flutter:
  const flutterRegex = /^flutter:/m;
  if (!flutterRegex.test(content)) {
    vscode.window.showErrorMessage("Flutter Mandor: flutter section not found");
    return;
  }

  // Cek apakah flutter: sudah punya assets (abaikan komentar)
  const flutterSectionRegex = /flutter:\s*((?:\n\s*(?!#).*)*)/m;
  const match = flutterSectionRegex.exec(content);

  if (match && /assets:/.test(match[1])) {
    vscode.window.showInformationMessage(
      "Flutter Mandor: assets section already exists – skip inject"
    );
    return;
  }

  // Injection (2 spasi indent dari flutter)
  const injection = `  assets:
    - assets/icons/
    - assets/images/
    - assets/fonts/
`;

  // Inject setelah flutter:
  content = content.replace(flutterRegex, `flutter:\n${injection}`);

  fs.writeFileSync(pubspecPath, content);

  vscode.window.showInformationMessage(
    "Flutter Mandor: assets configuration berhasil ditambahkan ke pubspec.yaml"
  );
}
