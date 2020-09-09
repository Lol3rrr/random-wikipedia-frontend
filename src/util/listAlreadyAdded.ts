import { User } from "@/api/types";

export default function listAlreadyAdded(user: User, listID: string): boolean {
  for (const element in user.Lists) {
    if (user.Lists[element].ID.toString() == listID) {
      return true;
    }
  }

  return false;
}
