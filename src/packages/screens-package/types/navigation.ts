export interface Navigation {
  navigate: (screenName: string) => void;
  goBack: () => void;
  canGoBack: () => boolean;
  currentScreen: string;
}
