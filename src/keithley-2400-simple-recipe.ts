import { AvailableVariables, Recipe } from './recipe';

const DEFAULT_WAIT = 100;
const DEFAULT_INTEGRATION_TIME = 10;
const DEFAULT_START = '0';
const DEFAULT_STEP = '1e-6';
const DEFAULT_STOP = '1e-5';

export enum SMUMode {
    Off = 'Off',
    FixedCurrent = 'Fixed Current',
    SweepCurrent = 'Sweep Current',
    FixedVoltage = 'Fixed Voltage',
    SweepVoltage = 'Sweep Voltage',
}

interface Keithley2400SMURecipe {
    smuMode: SMUMode;
    turnOffAfterDone: boolean;
    compliance: string;
}

export interface OffChannelRecipe extends Keithley2400SMURecipe {
    smuMode: SMUMode.Off;
    turnOffAfterDone: true;
}

export function isOffChannelRecipe(recipe: Keithley2400SMURecipe): recipe is OffChannelRecipe {
    return recipe.smuMode === SMUMode.Off;
}

function defaultOffChannelRecipe(): OffChannelRecipe {
    return {
        smuMode: SMUMode.Off,
        turnOffAfterDone: true,
        compliance: '',
    };
}

export interface FixedChannelRecipe extends Keithley2400SMURecipe {
    smuMode: SMUMode.FixedCurrent | SMUMode.FixedVoltage;
    value: string;
}

export function isFixedChannelRecipe(recipe: Keithley2400SMURecipe): recipe is FixedChannelRecipe {
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

export interface SweepChannelRecipe extends Keithley2400SMURecipe {
    smuMode: SMUMode.SweepCurrent | SMUMode.SweepVoltage;
    start: string;
    stop: string;
    step: string;
    interval: string;
}

export function isSweepChannelRecipe(recipe: Keithley2400SMURecipe): recipe is SweepChannelRecipe {
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

export type SMURecipe = OffChannelRecipe | FixedChannelRecipe | SweepChannelRecipe;

export function defaultChannelRecipe(smuMode: SMUMode) {
    switch (smuMode) {
        case SMUMode.Off:
            return defaultOffChannelRecipe();
        case SMUMode.FixedVoltage:
        case SMUMode.FixedCurrent:
            return defaultFixedChannelRecipe(smuMode);
        case SMUMode.SweepCurrent:
        case SMUMode.SweepVoltage:
            return defaultSweepChannelRecipe(smuMode);
    }
}

export interface Keithley2400SimpleRecipe extends Recipe {
    type: 'Keithley2400Simple';
    smuRecipe: SMURecipe;
    wait: number;
    integrationTime: number;
    name: string;
}

export function isKeithley2400SimpleRecipe(entity: Recipe): entity is Keithley2400SimpleRecipe {
    return entity.type === 'Keithley2400Simple';
}

export function defaultKeithley2400SimpleRecipe(): Keithley2400SimpleRecipe {
    return {
        type: 'Keithley2400Simple',
        smuRecipe: defaultOffChannelRecipe(),
        wait: DEFAULT_WAIT,
        integrationTime: DEFAULT_INTEGRATION_TIME,
        name: '',
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getRandomNumberRecipeVariables(recipe: Keithley2400SimpleRecipe): AvailableVariables {
    return {
        private: ['Voltage', 'Current'],
        public: ['Voltage[]', 'Current[]'],
    };
}
