export interface List {
  ID: string;
  Title: string;
}

export interface Settings {
  NotificationTime: number;
}

export interface UserList {
  ID: number;
  Name: string;
}

export interface FavArticle {
  ID: string;
  Name: string;
  URL: string;
}

export interface User {
  ID: string;
  Subscription: string;
  Settings: Settings;
  Lists: Array<UserList>;
  Favorites: Array<FavArticle>;
}
