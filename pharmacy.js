import { Drug } from "./drug";
/**
 * Pharmacy inventory that advances drug benefit and expiry each day.
 */
export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  /**
   * Applies one day of benefit and expiration updates to every drug.
   * @returns {Array<Drug>}
   */
  updateBenefitValue() {
    for (const drug of this.drugs) {
      drug.updateBenefitValue();
    }

    return this.drugs;
  }
}
