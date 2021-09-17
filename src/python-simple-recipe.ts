import { AvailableVariables, Recipe } from "./recipe";

export interface PythonSimpleRecipe extends Recipe {
    type: 'PythonSimple';
    command: string;
}

export function isPythonRecipe(entity: Recipe): entity is PythonSimpleRecipe {
    return entity.type === 'PythonSimple';
}

export function defaultPythonSimpleRecipe(): PythonSimpleRecipe {
    return {
        type: 'PythonSimple',
        command: '',
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getPythonSimpleRecipeVariables(recipe: PythonSimpleRecipe): AvailableVariables {
    return {
        private: [],
        public: [],
    };
}
