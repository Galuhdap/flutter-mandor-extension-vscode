export const envTemplate = `
import 'flavor_config.dart';

class Env {
  Env._();

  static String get baseUrl {
    switch (FlavorConfig.instance.flavor) {
      case Flavor.development:
        return 'https://dev.api.example.com';
      case Flavor.staging:
        return 'https://staging.api.example.com';
      case Flavor.production:
        return 'https://api.example.com';
    }
  }
}
`;
