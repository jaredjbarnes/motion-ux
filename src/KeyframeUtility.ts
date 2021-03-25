import easings, {
  EasingFunction,
  EasingNames as EasingAsStrings,
} from "./easings";
import { KeyframeConfig } from "./Keyframe";
import KeyframeConfigValidator from "./KeyframeConfigValidator";
import ParsedValue from "./ParsedValue";

const validator = new KeyframeConfigValidator();

export interface SimpleKeyframeConfig {
  name: string;
  property: string;
  to: string;
  from: string;
  endAt: number;
  startAt: number;
  controls?: string[];
  easing?: EasingAsStrings | EasingFunction;
  value?: string;
}

export default class KeyframeUtility {
  public config!: SimpleKeyframeConfig;
  public result!: KeyframeConfig;

  private _setConfig(config: SimpleKeyframeConfig) {
    this.config = config;
    this.result = {} as any;
    validator.setConfig(config);
  }

  normalizeConfig(config: SimpleKeyframeConfig) {
    this._setConfig(config);
    this._normalizeName();
    this._normalizeProperty();
    this._normalizeValue();
    this._normalizeFrom();
    this._normalizeControls();
    this._normalizeTo();
    this._normalizeStartAt();
    this._normalizeEndAt();
    this._normalizeEasing();

    return this.result;
  }

  private _normalizeName() {
    this.result.name = this.config.name;
  }

  private _normalizeProperty() {
    this.result.property = this.config.property;
  }

  private _normalizeValue() {
    if (this.config.value != null) {
      this.config.to = this.config.value;
      this.config.from = this.config.value;
    }
  }

  private _normalizeFrom() {
    if (validator.hasValidFromAsString()) {
      this.result.from = new ParsedValue(this.config.from);
    } else {
      validator.validateFromAsString();
    }
  }

  private _normalizeControls() {
    if (!Array.isArray(this.config.controls)) {
      this.config.controls = [];
    }

    if (validator.hasValidControlsAsStrings()) {
      this.result.controls = this.config.controls.map(
        (control: string) => new ParsedValue(control)
      );
    } else {
      validator.validateControlsAsStrings();
    }
  }

  private _normalizeTo() {
    if (validator.hasValidToAsString()) {
      this.result.to = new ParsedValue(this.config.to);
    } else {
      validator.validateToAsString();
    }
  }

  private _normalizeStartAt() {
    if (validator.hasValidStartAt()) {
      this.result.startAt = this.config.startAt;
    } else {
      this.result.startAt = 0;
    }
  }

  private _normalizeEndAt() {
    if (validator.hasValidEndAt()) {
      this.result.endAt = this.config.endAt;
    } else {
      this.result.endAt = 1;
    }
  }

  private _normalizeEasing() {
    if (
      !validator.hasValidEasingString() &&
      !validator.hasValidEasingFunction()
    ) {
      this.result.easing = easings.linear;
    } else if (validator.hasValidEasingString()) {
      this.result.easing =
        (easings as any)[this.config.easing as EasingAsStrings] ||
        easings.linear;
    } else if (validator.hasValidEasingFunction()) {
      this.result.easing = this.config.easing as EasingFunction;
    }
  }
}
