export const flavorConfigTemplate = `
enum Flavor {
  development,
  staging,
  production,
}

class FlavorConfig {
  final Flavor flavor;
  final String baseUrl;

  static FlavorConfig? _instance;

  factory FlavorConfig({
    required Flavor flavor,
    required String baseUrl,
  }) {
    _instance ??= FlavorConfig._internal(flavor, baseUrl);
    return _instance!;
  }

  FlavorConfig._internal(this.flavor, this.baseUrl);

  static FlavorConfig get instance => _instance!;
}
`;
