// Safe imports from @phenom/react-ds with fallbacks
// This allows the app to work even if the package isn't installed

"use client";

let Button: any;
let Badge: any;
let Card: any;
let Snackbar: any;
let toast: any;

try {
  const phenomButton = require("@phenom/react-ds/button");
  Button = phenomButton.Button || phenomButton;
} catch {
  const fallbacks = require("./fallbacks");
  Button = fallbacks.Button;
}

try {
  const phenomBadge = require("@phenom/react-ds/badge");
  Badge = phenomBadge.Badge || phenomBadge;
} catch {
  const fallbacks = require("./fallbacks");
  Badge = fallbacks.Badge;
}

try {
  const phenomCard = require("@phenom/react-ds/card");
  Card = phenomCard.Card || phenomCard;
} catch {
  const fallbacks = require("./fallbacks");
  Card = fallbacks.Card;
}

try {
  const phenomSnackbar = require("@phenom/react-ds/snackbar");
  Snackbar = phenomSnackbar.Snackbar || phenomSnackbar;
  toast = phenomSnackbar.toast || phenomSnackbar;
} catch {
  const fallbacks = require("./fallbacks");
  Snackbar = fallbacks.Snackbar;
  toast = fallbacks.toast;
}

export { Button, Badge, Card, Snackbar, toast };

