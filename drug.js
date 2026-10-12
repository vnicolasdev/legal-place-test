const MAX_BENEFIT = 50;
const MIN_BENEFIT = 0;

const HERBAL_TEA = "Herbal Tea";
const FERVEX = "Fervex";
const MAGIC_PILL = "Magic Pill";
const DAFALGAN = "Dafalgan";

/**
 * A pharmacy item with an expiration window and benefit strength.
 * Specialized drugs are selected by name via the constructor factory.
 */
export class Drug {
  constructor(name, expiresIn, benefit) {
    if (new.target !== Drug) {
      this.name = name;
      this.expiresIn = expiresIn;
      this.benefit = benefit;
      return;
    }

    switch (name) {
      case HERBAL_TEA:
        return new HerbalTea(name, expiresIn, benefit);
      case FERVEX:
        return new Fervex(name, expiresIn, benefit);
      case MAGIC_PILL:
        return new MagicPill(name, expiresIn, benefit);
      case DAFALGAN:
        return new Dafalgan(name, expiresIn, benefit);
      default:
        this.name = name;
        this.expiresIn = expiresIn;
        this.benefit = benefit;
    }
  }

  /**
   * Increases benefit without exceeding the maximum of 50.
   * @param {number} [amount=1]
   */
  _increaseBenefit(amount = 1) {
    this.benefit = Math.min(MAX_BENEFIT, this.benefit + amount);
  }

  /**
   * Decreases benefit without going below 0.
   * @param {number} [amount=1]
   */
  _decreaseBenefit(amount = 1) {
    this.benefit = Math.max(MIN_BENEFIT, this.benefit - amount);
  }

  /**
   * Ages the drug by one day.
   */
  _age() {
    this.expiresIn -= 1;
  }

  /**
   * Applies one day of updates. Normal drugs lose 1 benefit per day,
   * and 1 more after the expiration date.
   */
  updateBenefitValue() {
    this._decreaseBenefit();
    this._age();

    if (this.expiresIn < 0) {
      this._decreaseBenefit();
    }
  }
}

/**
 * Herbal Tea gains benefit as it ages.
 */
class HerbalTea extends Drug {
  /**
   * Gains 1 benefit per day, and 1 more after expiry.
   */
  updateBenefitValue() {
    this._increaseBenefit();
    this._age();

    if (this.expiresIn < 0) {
      this._increaseBenefit();
    }
  }
}

/**
 * Fervex gains benefit as expiry approaches, then drops to 0 after expiry.
 */
class Fervex extends Drug {
  /**
   * +1 normally, +2 when ≤10 days remain, +3 when ≤5 days remain;
   * benefit becomes 0 after the expiration date.
   */
  updateBenefitValue() {
    this._increaseBenefit();

    if (this.expiresIn < 11) {
      this._increaseBenefit();
    }

    if (this.expiresIn < 6) {
      this._increaseBenefit();
    }

    this._age();

    if (this.expiresIn < 0) {
      this.benefit = 0;
    }
  }
}

/**
 * Magic Pill never expires and never changes benefit.
 */
class MagicPill extends Drug {
  _age() {
    // Magic Pill never expires.
  }

  updateBenefitValue() {
    // Intentionally left unchanged.
  }
}

/**
 * Dafalgan degrades in benefit twice as fast as normal drugs.
 */
class Dafalgan extends Drug {
  /**
   * Loses 2 benefit per day, and 2 more after the expiration date.
   */
  updateBenefitValue() {
    this._decreaseBenefit(2);
    this._age();

    if (this.expiresIn < 0) {
      this._decreaseBenefit(2);
    }
  }
}
