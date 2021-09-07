import { Recipe } from './recipe';

export interface RandomNumberGeneratorRecipe {
    name: string;
    min: string;
    max: string;
}

export interface RandomNumberRecipe extends Recipe {
    type: 'RandomNumber';
    generators: RandomNumberGeneratorRecipe[];
    count: string;
}

export function isRandomNumberRecipe(entity: Recipe): entity is RandomNumberRecipe {
    return entity.type === 'RandomNumber';
}

export function defaultRandomNumberRecipe(): RandomNumberRecipe {
    return {
        type: 'RandomNumber',
        privateVariables: [],
        publicVariables: [],
        generators: [],
        count: '0',
    };
}
