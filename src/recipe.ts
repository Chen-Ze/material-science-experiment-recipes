export interface Variable {
    name: string;
    type: string;
    alias: string;
}

export interface Recipe {
    type: string;
    privateVariables: Variable[];
    publicVariables: Variable[];
}
