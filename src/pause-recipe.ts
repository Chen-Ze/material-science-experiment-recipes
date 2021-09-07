import { Recipe } from "./recipe";

export interface PauseRecipe extends Recipe {
    type: 'Pause';
}

export function isPauseRecipe(entity: Recipe): entity is PauseRecipe {
    return entity.type === 'Pause';
}

export function defaultPauseRecipe(): PauseRecipe {
    return {
        type: 'Pause',
        privateVariables: [],
        publicVariables: []
    };
}
