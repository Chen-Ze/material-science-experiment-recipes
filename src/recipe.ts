export interface Variable {
    name: string;
    alias: string;
}

export interface Recipe {
    type: string;
    privateVariables: Variable[];
    publicVariables: Variable[];
}
