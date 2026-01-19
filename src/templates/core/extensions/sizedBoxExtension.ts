export const sizeBoxExtensionTemplate = `
import 'package:flutter/material.dart';

extension EmptySpace on num {
  SizedBox get height => SizedBox(height: toDouble());

  SizedBox get width => SizedBox(width: toDouble());
}

//How to make

//example:
//2.height
//120.width
`;
