export interface Variable {
    name: string;
    alias: string;
}

export interface VariableExport {
    name: string;
    column: string;
}

export interface Recipe {
    type: string;
    privateVariables: Variable[];
    publicVariables: Variable[];
    privateExports: VariableExport[];
    publicExports: VariableExport[];
}

export interface AvailableVariables {
    private: string[];
    public: string[];
}
