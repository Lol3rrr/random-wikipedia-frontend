import { eventBus, NotificationEvent } from "@/eventBus";

export function displayPopup(content: string) {
  eventBus.$emit("notifyPopup", {
    Content: content
  } as NotificationEvent);
}
