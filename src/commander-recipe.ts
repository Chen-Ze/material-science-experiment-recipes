import { Recipe } from './recipe';

export interface InstrumentEntry {
    name: string;
    address: string;
    model: string;
}

export interface CommanderRecipe extends Recipe {
    type: 'Commander';
    store: any;
    instruments: InstrumentEntry[];
    columns: string[];
    dataFile: string;
}

export function isCommanderRecipe(entity: Recipe): entity is CommanderRecipe {
    return entity.type === 'Commander';
}

export const DEFAULT_COMMANDER_RECIPE: CommanderRecipe = {
    type: 'Commander',
    privateVariables: [],
    publicVariables: [],
    privateExports: [],
    publicExports: [],
    store: {},
    instruments: [],
    columns: [],
    dataFile: '',
};

export function defaultCommanderRecipe(): CommanderRecipe {
    return DEFAULT_COMMANDER_RECIPE;
}
