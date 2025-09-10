// Add this file to log all errors globally for debugging
window.addEventListener('error', function(event) {
  console.error('Global Error:', event.error || event.message);
});
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled Promise Rejection:', event.reason);
});
