
import {LightningSpell} from './binding'

describe('LightningSpell', () => {
    it('should allow a custom dictionary to be constructed', () => {
        const lightningSpell = new LightningSpell("test");
        
        lightningSpell.createDictionaryEntry('united state',1);
        lightningSpell.createDictionaryEntry('united states',1);
        lightningSpell.createDictionaryEntry('united kingdom',1);

        expect(lightningSpell.getSuggestions('united stte')).toEqual(["united state"])
        expect(lightningSpell.getSuggestions('united stte',{ distance:2 })).toEqual(["united state","united states"])

    })
    
    it('should spell check a word', () => {
        const lightningSpell = new LightningSpell("test");
        
        lightningSpell.createDictionaryEntry('united state',1);
        lightningSpell.createDictionaryEntry('united kingdom',1);

        expect(lightningSpell.isCorrectlySpelled('united state')).toEqual(true)
        expect(lightningSpell.isCorrectlySpelled('united stte')).toEqual(false)
    });

    it('should work with 0f', () => {
        const lightningSpell = new LightningSpell("test");
        
        lightningSpell.createDictionaryEntry('of',1);
        lightningSpell.createDictionaryEntry('if',1);
        lightningSpell.createDictionaryEntry('0d',1);
        lightningSpell.createDictionaryEntry('0s',1);
        lightningSpell.createDictionaryEntry('off',1);
        lightningSpell.createDictionaryEntry('raf',1);
        lightningSpell.createDictionaryEntry('orf',1);
        lightningSpell.createDictionaryEntry('oof',1);

        expect(lightningSpell.getSuggestions('0f', {maxResults: 8, distance: 2})).toEqual(["of",
        "if",
        "0d",
        "0s",
        "off",
        "raf",
        "orf",
        "oof"])
    })
});