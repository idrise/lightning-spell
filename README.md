IN DEVELOPMENT DON'T USE !

# lightning-spell
Spell checker and suggestions with lightning fast c++ sym spell engine.

Installing

```npm install --save lightning-spell```

Usage

```
const lightningSpell = new LightningSpell("test");
        
lightningSpell.createDictionaryEntry('united state',1);
lightningSpell.createDictionaryEntry('united kingdom',1);

lightningSpell.isCorrectlySpelled('united state')
// Returns true

lightningSpell.isCorrectlySpelled('united stte')
// Returns false

lightningSpell.getSuggestions('united stte')
// Returns ["united state"]

```
