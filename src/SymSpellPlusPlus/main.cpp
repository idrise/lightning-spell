#include <cmath>
#include <string>
#include <vector>
#include "symspell.h"

int main (int argc, char *argv[]) {
    symspell::SymSpell *symSpell = new symspell::SymSpell();
    symSpell->CreateDictionaryEntry("united states",1);
    symSpell->CreateDictionaryEntry("united kingdom",1);

    vector<string> lookupStrings = {"united sta","united stte","united king"};
    for (int f=0;f<1000;f++) {
        vector< std::unique_ptr<symspell::SuggestItem>> items;
        string lookupString = "united sta";
        symSpell->Lookup(lookupStrings[f%3], symspell::Verbosity::All,2,items);
        items.clear();
    }
    return 0;
}
