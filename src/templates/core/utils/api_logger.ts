export const apiLoggerTemplate = `
class ApiLogger {
  /// Log request dan response untuk debugging API
  static void logResponse({
    required String url,
    required int statusCode,
    required String responseBody,
  }) {
    print('🔗 Request URL Remote: $url');
    print('📡 Status Code: $statusCode');
    print('📦 Response Body: $responseBody');
  }

  /// Kalau mau log juga request sebelum dikirim
  static void logRequest({
    required String url,
    String method = 'GET',
    Map<String, dynamic>? headers,
    dynamic body,
  }) {
    print('🚀 API Request [$method]');
    print('🔗 URL: $url');
    if (headers != null && headers.isNotEmpty) {
      print('🧾 Headers: $headers');
    }
    if (body != null) {
      print('📨 Body: $body');
    }
  }
}
`