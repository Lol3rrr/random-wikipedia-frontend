import validateTime from "@/util/validateTime";

describe("ValidateTime", () => {
  it("Cycles hours when greater or equal to 24", () => {
    const inHour = 50;
    const inMinute = 0;

    const result = {
      Hour: 2,
      Minute: 0
    };

    expect(validateTime(inHour, inMinute)).toStrictEqual(result);
  });
  it("Cycles hours when smaller than 0", () => {
    const inHour = -26;
    const inMinute = 0;

    const result = {
      Hour: 22,
      Minute: 0
    };

    expect(validateTime(inHour, inMinute)).toStrictEqual(result);
  });

  it("The Hour should increase when Minutes is greater than 60", () => {
    const inHour = 0;
    const inMinute = 70;

    const result = {
      Hour: 1,
      Minute: 10
    };

    expect(validateTime(inHour, inMinute)).toStrictEqual(result);
  });
  it("The Hour should decrease when Minutes is less than 0", () => {
    const inHour = 0;
    const inMinute = -50;

    const result = {
      Hour: 23,
      Minute: 10
    };

    expect(validateTime(inHour, inMinute)).toStrictEqual(result);
  });
});
