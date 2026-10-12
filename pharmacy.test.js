import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("normal drugs", () => {
    it("decreases benefit and expiresIn by 1 each day", () => {
      const drugs = [new Drug("test", 2, 3)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("test", 1, 2)]);
    });

    it("degrades benefit twice as fast after the expiration date", () => {
      const drugs = [new Drug("test", 0, 10)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("test", -1, 8)]);
    });

    it("never lets benefit go below 0", () => {
      const drugs = [new Drug("test", 5, 0)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("test", 4, 0)]);
    });
  });

  describe("Herbal Tea", () => {
    it("increases benefit by 1 before the expiration date", () => {
      const drugs = [new Drug("Herbal Tea", 10, 5)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Herbal Tea", 9, 6)]);
    });

    it("increases benefit by 2 after the expiration date", () => {
      const drugs = [new Drug("Herbal Tea", 0, 5)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Herbal Tea", -1, 7)]);
    });

    it("never lets benefit go above 50", () => {
      const drugs = [new Drug("Herbal Tea", 5, 50)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Herbal Tea", 4, 50)]);
    });
  });

  describe("Magic Pill", () => {
    it("never expires nor decreases in benefit", () => {
      const drugs = [new Drug("Magic Pill", 15, 40)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Magic Pill", 15, 40)]);
    });
  });

  describe("Fervex", () => {
    it("increases benefit by 1 when more than 10 days remain", () => {
      const drugs = [new Drug("Fervex", 12, 35)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Fervex", 11, 36)]);
    });

    it("increases benefit by 2 when 10 days or less remain", () => {
      const drugs = [new Drug("Fervex", 10, 35)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Fervex", 9, 37)]);
    });

    it("increases benefit by 3 when 5 days or less remain", () => {
      const drugs = [new Drug("Fervex", 5, 35)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Fervex", 4, 38)]);
    });

    it("drops benefit to 0 after the expiration date", () => {
      const drugs = [new Drug("Fervex", 0, 35)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Fervex", -1, 0)]);
    });

    it("never lets benefit go above 50", () => {
      const drugs = [new Drug("Fervex", 5, 49)];

      const result = new Pharmacy(drugs).updateBenefitValue();

      expect(result).toEqual([new Drug("Fervex", 4, 50)]);
    });
  });

});
