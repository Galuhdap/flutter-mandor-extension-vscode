export function flutterMandorPageTemplate(projectName: string) {
  return `
import 'package:${projectName}/presentations/mandor/widget/image_widget.dart';
import 'package:flutter/material.dart';

class FlutterMandorPage extends StatefulWidget {
  const FlutterMandorPage({super.key});

  @override
  State<FlutterMandorPage> createState() => _FlutterMandorPageState();
}

class _FlutterMandorPageState extends State<FlutterMandorPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffC1F8F8),
      body: Center(
        child: ImageWidget(),
      ),
    );
  }
}
`;
}
