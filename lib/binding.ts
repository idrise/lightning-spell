const addon = require('../build/Release/lightning-spell-native.node');

export interface ILightningSpellNative
{
    getSuggestions(strName: string, parameters:object): string[];
    isCorrectlySpelled(strName: string,parameters:object): boolean;
    createDictionaryEntry(strName: string, count: number): boolean;
};

export class LightningSpell {
    constructor(name: string) {
        this._addonInstance = new addon.LightningSpell(name)
    }

    getSuggestions (strName: string, parameters: object = {}):string[] {
        return this._addonInstance.getSuggestions(strName,parameters);
    }
    isCorrectlySpelled (strName: string, parameters: object = {}) {
        return this._addonInstance.isCorrectlySpelled(strName,parameters);
    }
    createDictionaryEntry(strName: string, count: number): boolean {
        return this._addonInstance.createDictionaryEntry(strName, count)
    }
    // private members
    private _addonInstance: ILightningSpellNative;
}
