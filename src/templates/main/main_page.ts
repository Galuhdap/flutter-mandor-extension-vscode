export const mainPageTemplate = `
import 'package:flutter/material.dart';

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {

    return  MaterialApp(
        color: Colors.white,
        title: 'Flutter Demo',
        home: SplashPage(),
      );
  }
}
`;
