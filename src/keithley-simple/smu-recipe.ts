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

interface KeithleySMURecipe {
    smuMode: SMUMode;
    turnOffAfterDone: boolean;
    compliance: string;
}

export interface OffChannelRecipe extends KeithleySMURecipe {
    smuMode: SMUMode.Off;
    turnOffAfterDone: true;
}

export function isOffChannelRecipe(recipe: KeithleySMURecipe): recipe is OffChannelRecipe {
    return recipe.smuMode === SMUMode.Off;
}

function defaultOffChannelRecipe(): OffChannelRecipe {
    return {
        smuMode: SMUMode.Off,
        turnOffAfterDone: true,
        compliance: '',
    };
}

export interface FreeChannelRecipe extends KeithleySMURecipe {
    smuMode: SMUMode.Free;
    turnOffAfterDone: false;
}

export function isFreeChannelRecipe(recipe: KeithleySMURecipe): recipe is FreeChannelRecipe {
    return recipe.smuMode === SMUMode.Free;
}

function defaultFreeChannelRecipe(): FreeChannelRecipe {
    return {
        smuMode: SMUMode.Free,
        turnOffAfterDone: false,
        compliance: '',
    };
}

export interface FixedChannelRecipe extends KeithleySMURecipe {
    smuMode: SMUMode.FixedCurrent | SMUMode.FixedVoltage;
    value: string;
}

export function isFixedChannelRecipe(recipe: KeithleySMURecipe): recipe is FixedChannelRecipe {
    return recipe.smuMode === SMUMode.FixedCurrent || recipe.smuMode === SMUMode.FixedVoltage;
}

function defaultFixedChannelRecipe(smuMode: SMUMode.FixedCurrent | SMUMode.FixedVoltage): FixedChannelRecipe {
    return {
        smuMode,
        turnOffAfterDone: false,
        value: '0',
        compliance: '',
    };
}

export interface SweepChannelRecipe extends KeithleySMURecipe {
    smuMode: SMUMode.SweepCurrent | SMUMode.SweepVoltage;
    start: string;
    stop: string;
    step: string;
    interval: string;
}

export function isSweepChannelRecipe(recipe: KeithleySMURecipe): recipe is SweepChannelRecipe {
    return recipe.smuMode === SMUMode.SweepCurrent || recipe.smuMode === SMUMode.SweepVoltage;
}

function defaultSweepChannelRecipe(smuMode: SMUMode.SweepCurrent | SMUMode.SweepVoltage): SweepChannelRecipe {
    return {
        smuMode,
        turnOffAfterDone: false,
        start: DEFAULT_START,
        stop: DEFAULT_STOP,
        step: DEFAULT_STEP,
        interval: '',
        compliance: '',
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
