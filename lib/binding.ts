const addon = require('../build/Release/lightning-spell-native.node');

export interface ILightningSpellNative
{
    getSuggestions(strName: string, parameters:object): any[];
    isCorrectlySpelled(strName: string,parameters:object): boolean;
    createDictionaryEntry(strName: string, count: number): boolean;
};

export class LightningSpell {
    constructor(name: string) {
        this._addonInstance = new addon.LightningSpell(name)
    }

    getSuggestions (strName: string, parameters: object = {}):string[] {
        const suggestions = this._addonInstance.getSuggestions(strName,parameters);

        const sortedSuggestions = suggestions.sort((a:any,b:any): any => {
            if (a.distance !== b.distance)
            {
                return a.distance-b.distance
            }
            if (a.count !== b.count)
            {
                return b.count-a.count
            }
            return b.word.localeCompare(a.word)
        })
        console.log(sortedSuggestions)
        return sortedSuggestions.map(a=>a.word)
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
