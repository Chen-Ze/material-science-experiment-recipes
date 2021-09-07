import { AvailableVariables, Recipe } from './recipe';

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
        privateExports: [],
        publicExports: [],
        generators: [],
        count: '0',
    };
}

export function getRandomNumberRecipeVariables(recipe: RandomNumberRecipe): AvailableVariables {
    return {
        private: recipe.generators.map((generator) => generator.name),
        public: recipe.generators.map((generator) => `${generator.name}[]`),
    };
}
