import listAreadyAdded from "@/util/listAlreadyAdded";
import { User, UserList } from '@/api/types';

describe("ListAlreadyAdded", () => {
  it("ID is in the List", () => {
    const inList = [
      { ID: 123 },
      { ID: 234 },
      { ID: 345 }
    ];
    const inID = "234";

    const user = {
      Lists: inList
    } as User;

    expect(listAreadyAdded(user, inID)).toEqual(true);
  });

  it("ID is not in the List", () => {
    const inList = [
      { ID: 123 },
      { ID: 234 },
      { ID: 345 }
    ];
    const inID = "235";

    const user = {
      Lists: inList
    } as User;

    expect(listAreadyAdded(user, inID)).toEqual(false);
  });
});