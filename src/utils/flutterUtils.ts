import * as fs from "fs";
import * as path from "path";

export function getFlutterProjectName(rootPath: string): string | null {
  const pubspecPath = path.join(rootPath, "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) return null;

  const content = fs.readFileSync(pubspecPath, "utf8");

  const match = content.match(/name:\s*([a-zA-Z0-9_]+)/);

  return match ? match[1] : null;
}
