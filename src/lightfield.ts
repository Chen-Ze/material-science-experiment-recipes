import { AvailableVariables, Recipe } from './recipe';

export enum LightFieldTask {
    ActivateWindow = 'Activate Window',
    SaveSpectrum = 'Save Spectrum',
}

export interface LightFieldRecipe extends Recipe {
    type: 'LightField';
    task: LightFieldTask;
    payload: {
        [key: string]: string;
    };
}

export function isLightFieldRecipe(entity: Recipe): entity is LightFieldRecipe {
    return entity.type === 'LightField';
}

export function defaultLightFieldRecipe(): LightFieldRecipe {
    return {
        type: 'LightField',
        task: LightFieldTask.ActivateWindow,
        payload: {},
        privateVariables: [],
        publicVariables: [],
        privateExports: [],
        publicExports: [],
    };
}

export function getLightFieldRecipeVariables(recipe: LightFieldRecipe): AvailableVariables {
    return {
        private: [],
        public: [],
    };
}
