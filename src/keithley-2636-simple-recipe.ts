import { SMUMode, defaultChannelRecipe, SMURecipe } from './keithley-simple/smu-recipe';
import { AvailableVariables, Recipe } from './recipe';

const DEFAULT_WAIT = '100';
const DEFAULT_INTEGRATION_TIME = '10';

export interface Keithley2636SimpleRecipe extends Recipe {
    type: 'Keithley2636Simple';
    smuARecipe: SMURecipe;
    smuBRecipe: SMURecipe;
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

export function isKeithley2636SimpleRecipe(entity: Recipe): entity is Keithley2636SimpleRecipe {
    return entity.type === 'Keithley2636Simple';
}

export function defaultKeithley2636SimpleRecipe(): Keithley2636SimpleRecipe {
    return {
        type: 'Keithley2636Simple',
        smuARecipe: defaultChannelRecipe(SMUMode.Off),
        smuBRecipe: defaultChannelRecipe(SMUMode.Off),
        wait: DEFAULT_WAIT,
        integrationTime: DEFAULT_INTEGRATION_TIME,
        name: '',
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getKeithley2636SimpleRecipeVariables(recipe: Keithley2636SimpleRecipe): AvailableVariables {
    return {
        private: ['SMU A Voltage', 'SMU A Current', 'SMU B Voltage', 'SMU B Current'],
        public: ['SMU A Voltage[]', 'SMU A Current[]', 'SMU B Voltage[]', 'SMU B Current[]'],
    };
}
