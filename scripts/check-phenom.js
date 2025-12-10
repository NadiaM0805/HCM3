// Check if @phenom/react-ds is available, if not, log a warning
// This allows the build to continue even if the private registry is unreachable

try {
  require.resolve("@phenom/react-ds");
  console.log("✓ @phenom/react-ds is available");
} catch (e) {
  console.warn("⚠ @phenom/react-ds is not available (private registry may be unreachable)");
  console.warn("  The app will use fallback components instead.");
  process.exit(0); // Exit successfully so build continues
}

