import * as vscode from "vscode";
import { initStructureStandard } from "./modes/standart";
import { initStructureGetX } from "./modes/getx";
import { initStructureBloc } from "./modes/bloc";

export async function pasangModeCommand(context: vscode.ExtensionContext) {
  const workspace = vscode.workspace.workspaceFolders;

  if (!workspace) {
    vscode.window.showErrorMessage("No workspace opened");
    return;
  }

  const pilihan = await vscode.window.showQuickPick(
    [
      {
        label: "🪣 Mode Kuli – Standard Flutter",
        description: "Struktur dasar tanpa state management",
        target: "standard",
      },
      {
        label: "🔧 Mode Tukang Kilat – GetX",
        description: "Clean structure berbasis GetX",
        target: "getx",
      },
      {
        label: "📐 Mode Tukang Express – Bloc",
        description: "Clean structure berbasis Bloc",
        target: "bloc",
      },
    ],
    {
      title: "Flutter Mandor – Pilih Gaya Kerja Proyek",
      placeHolder: "Pilih mode arsitektur yang ingin dipasang",
    }
  );

  if (!pilihan) return;

  switch (pilihan.target) {
    case "standard":
      await initStructureStandard(context);
      vscode.window.showInformationMessage(
        "Flutter Mandor: Mode Kuli berhasil dipasang!"
      );
      break;

    case "getx":
      await initStructureGetX();
      vscode.window.showInformationMessage(
        "Flutter Mandor: Mode Tukang GetX berhasil dipasang!"
      );
      break;

    case "bloc":
      await initStructureBloc();
      vscode.window.showInformationMessage(
        "Flutter Mandor: Mode Tukang Bloc berhasil dipasang!"
      );
      break;
  }
}
