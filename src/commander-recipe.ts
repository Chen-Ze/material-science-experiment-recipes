import { Recipe } from './recipe';

export interface CommanderRecipe extends Recipe {
    type: 'Commander';
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
};

export function defaultCommanderRecipe(): CommanderRecipe {
    return DEFAULT_COMMANDER_RECIPE;
}
