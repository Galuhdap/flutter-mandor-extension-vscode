export const mainProdTemplate = `
import 'package:flutter/material.dart';

import 'core/config/flavor_config.dart';
import 'core/config/config.dart';
import 'main_page.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  FlavorConfig(
    flavor: Flavor.production,
    baseUrl: Env.baseUrl,
  );

  runApp(const MainPage());
}
`;
