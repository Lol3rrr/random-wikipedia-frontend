export interface List {
  ID: string;
  Title: string;
}

export interface Settings {
  NotificationTime: number;
}

export interface User {
  ID: string;
  Subscription: string;
  Settings: Settings;
  Lists: Array<number>;
}
