import { Recipe } from "./recipe";


interface RandomNumberGeneratorRecipe {
    name: string,
    min: number,
    max: number,
}

export interface RandomNumberRecipe extends Recipe {
    type: 'RandomNumber';
    generators: RandomNumberGeneratorRecipe[],
    count: number
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
        count: 0
    };
}
