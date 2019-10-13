#pragma once

#include <napi.h>
#include <cmath>
#include <string>
#include <vector>
#include "symspell.h"

class LightningSpell : public Napi::ObjectWrap<LightningSpell>
{
public:
    LightningSpell(const Napi::CallbackInfo&);
    Napi::Value GetSuggestions(const Napi::CallbackInfo&);
    Napi::Value IsCorrectlySpelled(const Napi::CallbackInfo&);
    Napi::Value CreateDictionaryEntry(const Napi::CallbackInfo& info);

    static Napi::Function GetClass(Napi::Env);

private:
    symspell::SymSpell symSpell;
};
