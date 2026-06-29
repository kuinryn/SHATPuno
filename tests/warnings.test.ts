import { describe, expect, it } from "vitest";
import { getWarningForStandardDrinks } from "@/lib/alcohol/warnings";

describe("warning thresholds", () => {
  it("changes labels at standard drink thresholds", () => {
    expect(getWarningForStandardDrinks(0).level).toBe("none");
    expect(getWarningForStandardDrinks(0.5).level).toBe("standard");
    expect(getWarningForStandardDrinks(1).level).toBe("standard");
    expect(getWarningForStandardDrinks(1.5).level).toBe("caution");
    expect(getWarningForStandardDrinks(2).level).toBe("caution");
    expect(getWarningForStandardDrinks(2.01).level).toBe("high");
  });
});
