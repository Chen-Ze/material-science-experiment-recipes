import { SMUMode, defaultChannelRecipe, SMURecipe } from './keithley-simple/smu-recipe';
import { AvailableVariables, Recipe } from './recipe';

const DEFAULT_WAIT = "100";
const DEFAULT_INTEGRATION_TIME = "10";

export interface Keithley2400SimpleRecipe extends Recipe {
    type: 'Keithley2400Simple';
    smuRecipe: SMURecipe;
    /**
     * Wait time in millisecond.
     */
    wait: string;
    /**
     * Integration time in millisecond.
     */
    integrationTime: string;
    name: string;
}

export function isKeithley2400SimpleRecipe(entity: Recipe): entity is Keithley2400SimpleRecipe {
    return entity.type === 'Keithley2400Simple';
}

export function defaultKeithley2400SimpleRecipe(): Keithley2400SimpleRecipe {
    return {
        type: 'Keithley2400Simple',
        smuRecipe: defaultChannelRecipe(SMUMode.Off),
        wait: DEFAULT_WAIT,
        integrationTime: DEFAULT_INTEGRATION_TIME,
        name: '',
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getKeithley2400SimpleRecipeVariables(recipe: Keithley2400SimpleRecipe): AvailableVariables {
    return {
        private: ['Voltage', 'Current'],
        public: ['Voltage[]', 'Current[]'],
    };
}
