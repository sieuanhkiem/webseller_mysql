
export class Common {
    static CheckVariableNotNull (variable:unknown): boolean {
        return variable != undefined && variable != null;
    }
};