import * as fs from 'fs';

export function createFile(path: string, content: string) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content.trim());
  }
}