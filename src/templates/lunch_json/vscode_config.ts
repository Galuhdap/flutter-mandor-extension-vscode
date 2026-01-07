export const vscodeLaunchTemplate = `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Development",
      "type": "dart",
      "request": "launch",
      "program": "lib/main_dev.dart",
      "args": ["--flavor", "development"]
    },
    {
      "name": "Run Staging",
      "type": "dart",
      "request": "launch",
      "program": "lib/main_staging.dart",
      "args": ["--flavor", "staging"]
    },
    {
      "name": "Run Production",
      "type": "dart",
      "request": "launch",
      "program": "lib/main_prod.dart",
      "args": ["--flavor", "production"]
    }
  ]
}`;
