export const mainDevTemplate = `
import 'package:flutter/material.dart';

import 'core/config/flavor_config.dart';
import 'core/config/config.dart';
import 'main_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  FlavorConfig(
    flavor: Flavor.development,
    baseUrl: Env.baseUrl,
  );

  runApp(const MainPage());
}
`;
