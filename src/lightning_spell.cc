#include "lightning_spell.h"
#include <iostream>
using namespace Napi;
using namespace symspell;

LightningSpell::LightningSpell(const Napi::CallbackInfo& info) : ObjectWrap(info) {
    Napi::Env env = info.Env();


}

Napi::Value LightningSpell::CreateDictionaryEntry(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();    
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "Word to add must be a string")
          .ThrowAsJavaScriptException();
        return env.Null();
    }
    if (!info[1].IsNumber()) {
        Napi::TypeError::New(env, "Count must be a number")
          .ThrowAsJavaScriptException();
        return env.Null();
    }
    std::string name = info[0].As<Napi::String>();
    int count = info[1].As<Napi::Number>();

    if (count == 0) { 
        Napi::TypeError::New(env, "Count must be greater than zero")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    this->symSpell.CreateDictionaryEntry(name, count);

    return Napi::Boolean::New(env,true);
}

Napi::Value LightningSpell::GetSuggestions(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {
        Napi::TypeError::New(env, "No word to get suggestions for")
          .ThrowAsJavaScriptException();
        return env.Null();
    }
    double distance = 1;
    if (info[1].IsObject()) {
        if (info[1].As<Napi::Object>().Get("distance").IsNumber()) {
            distance = info[1].As<Napi::Object>().Get("distance").As<Napi::Number>();
        }
    }

    Napi::String name = info[0].As<Napi::String>();
    std::string searchTerm = name;


    vector< std::unique_ptr<symspell::SuggestItem>> items;
    this->symSpell.Lookup(searchTerm, symspell::Verbosity::All, distance, items);
    
    Napi::Array suggestions = Napi::Array::New(env,items.size());
    int i = 0;
    for(auto const& item: items) {
        Napi::Object suggestionObject = Napi::Object::New(env);
        suggestionObject.Set("distance", Napi::Number::New(env, item->distance));
        suggestionObject.Set("count", Napi::Number::New(env, item->count));
        suggestionObject.Set("word", Napi::String::New(env, item->term));
        suggestions[i] = suggestionObject;
        i++;
    }
    items.clear();
    return suggestions;
}

Napi::Value LightningSpell::IsCorrectlySpelled(const Napi::CallbackInfo& info) {

    Napi::Env env = info.Env();

    if (info.Length() < 1) {

        Napi::TypeError::New(env, "Wrong number of arguments")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    if (!info[0].IsString()) {

        Napi::TypeError::New(env, "Pass a string to spell check")
          .ThrowAsJavaScriptException();
        return env.Null();
    }

    Napi::String name = info[0].As<Napi::String>();


    std::string searchTerm = name;
    vector< std::unique_ptr<symspell::SuggestItem>> items;


    this->symSpell.Lookup(searchTerm, symspell::Verbosity::Top, 0, items);
    size_t itemSize = items.size();
    
    items.clear();    

    if (itemSize > 0 ) {

        return Napi::Boolean::New(env,true);
    }

    return Napi::Boolean::New(env,false);

}



Napi::Function LightningSpell::GetClass(Napi::Env env) {
    return DefineClass(env, "LightningSpell", {
        LightningSpell::InstanceMethod("getSuggestions", &LightningSpell::GetSuggestions),
        LightningSpell::InstanceMethod("isCorrectlySpelled", &LightningSpell::IsCorrectlySpelled),
        LightningSpell::InstanceMethod("createDictionaryEntry", &LightningSpell::CreateDictionaryEntry),        
    });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    Napi::String name = Napi::String::New(env, "LightningSpell");
    exports.Set(name, LightningSpell::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)
