const addon = require('../build/Release/lightning-spell-native');

interface ILightningSpellNative
{
    getSuggestions(strName: string): string;
    isCorrectlySpelled(strName: string): boolean;
    createDictionaryEntry(strName: string, count: number): boolean;
};

class LightningSpell {
    constructor(name: string) {
        this._addonInstance = new addon.LightningSpell(name)
    }

    getSuggestions (strName: string) {
        return this._addonInstance.getSuggestions(strName);
    }
    isCorrectlySpelled (strName: string) {
        return this._addonInstance.isCorrectlySpelled(strName);
    }
    createDictionaryEntry(strName: string, count: number): boolean {
        return this._addonInstance.createDictionaryEntry(strName, count)
    }
    // private members
    private _addonInstance: ILightningSpellNative;
}

export = LightningSpell;
