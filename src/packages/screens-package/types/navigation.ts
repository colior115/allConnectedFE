export interface Navigation {
  navigate: (screenName: string, state?: unknown) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  currentScreen: string;
  getState: () => unknown;
}
