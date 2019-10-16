
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
});