import Vue from "vue";
export const eventBus = new Vue();

export interface NotificationEvent {
  Content: string;
}