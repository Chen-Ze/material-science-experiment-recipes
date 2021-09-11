import { AvailableVariables, Recipe } from './recipe';

const DEFAULT_WAIT = 100;
const DEFAULT_START = '0';
const DEFAULT_STEP = '1e-6';
const DEFAULT_STOP = '1e-5';

export enum SMUMode {
    Off = 'Off',
    Free = 'Free',
    FixedCurrent = 'Fixed Current',
    SweepCurrent = 'Sweep Current',
    FixedVoltage = 'Fixed Voltage',
    SweepVoltage = 'Sweep Voltage',
}

interface Keithley2636SMURecipe {
    smuMode: SMUMode;
    turnOffAfterDone: boolean;
}

export interface OffChannelRecipe extends Keithley2636SMURecipe {
    smuMode: SMUMode.Off;
    turnOffAfterDone: true;
}

export function isOffChannelRecipe(recipe: Keithley2636SMURecipe): recipe is OffChannelRecipe {
    return recipe.smuMode === SMUMode.Off;
}

function defaultOffChannelRecipe(): OffChannelRecipe {
    return {
        smuMode: SMUMode.Off,
        turnOffAfterDone: true,
    };
}

export interface FreeChannelRecipe extends Keithley2636SMURecipe {
    smuMode: SMUMode.Free;
    turnOffAfterDone: false;
}

export function isFreeChannelRecipe(recipe: Keithley2636SMURecipe): recipe is FreeChannelRecipe {
    return recipe.smuMode === SMUMode.Free;
}

function defaultFreeChannelRecipe(): FreeChannelRecipe {
    return {
        smuMode: SMUMode.Free,
        turnOffAfterDone: false,
    };
}

export interface FixedChannelRecipe extends Keithley2636SMURecipe {
    smuMode: SMUMode.FixedCurrent | SMUMode.FixedVoltage;
    value: string;
}

export function isFixedChannelRecipe(recipe: Keithley2636SMURecipe): recipe is FixedChannelRecipe {
    return recipe.smuMode === SMUMode.FixedCurrent || recipe.smuMode === SMUMode.FixedVoltage;
}

function defaultFixedChannelRecipe(smuMode: SMUMode.FixedCurrent | SMUMode.FixedVoltage): FixedChannelRecipe {
    return {
        smuMode,
        turnOffAfterDone: false,
        value: '0',
    };
}

export interface SweepChannelRecipe extends Keithley2636SMURecipe {
    smuMode: SMUMode.SweepCurrent | SMUMode.SweepVoltage;
    start: string;
    stop: string;
    step: string;
}

export function isSweepChannelRecipe(recipe: Keithley2636SMURecipe): recipe is SweepChannelRecipe {
    return recipe.smuMode === SMUMode.SweepCurrent || recipe.smuMode === SMUMode.SweepVoltage;
}

function defaultSweepChannelRecipe(smuMode: SMUMode.SweepCurrent | SMUMode.SweepVoltage): SweepChannelRecipe {
    return {
        smuMode,
        turnOffAfterDone: false,
        start: DEFAULT_START,
        stop: DEFAULT_STOP,
        step: DEFAULT_STEP,
    };
}

export type SMURecipe = OffChannelRecipe | FreeChannelRecipe | FixedChannelRecipe | SweepChannelRecipe;

export function defaultChannelRecipe(smuMode: SMUMode) {
    switch (smuMode) {
        case SMUMode.Off:
            return defaultOffChannelRecipe();
        case SMUMode.Free:
            return defaultFreeChannelRecipe();
        case SMUMode.FixedVoltage:
        case SMUMode.FixedCurrent:
            return defaultFixedChannelRecipe(smuMode);
        case SMUMode.SweepCurrent:
        case SMUMode.SweepVoltage:
            return defaultSweepChannelRecipe(smuMode);
    }
}

export interface Keithley2636SimpleRecipe extends Recipe {
    type: 'Keithley2636Simple';
    smuARecipe: SMURecipe;
    smuBRecipe: SMURecipe;
    wait: number;
}

export function isKeithley2636SimpleRecipe(entity: Recipe): entity is Keithley2636SimpleRecipe {
    return entity.type === 'Keithley2636Simple';
}

export function defaultKeithley2636SimpleRecipe(): Keithley2636SimpleRecipe {
    return {
        type: 'Keithley2636Simple',
        smuARecipe: defaultOffChannelRecipe(),
        smuBRecipe: defaultOffChannelRecipe(),
        wait: DEFAULT_WAIT,
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getRandomNumberRecipeVariables(recipe: Keithley2636SimpleRecipe): AvailableVariables {
    return {
        private: ["SMU A Voltage", "SMU A Current", "SMU B Voltage", "SMU B Current"],
        public: ["SMU A Voltage[]", "SMU A Current[]", "SMU B Voltage[]", "SMU B Current[]"],
    };
}
