{
  'targets': [
    {
      'target_name': 'lightning-spell-native',
      'sources': [ 
        'src/lightning_spell.cc',
        'src/SymSpellPlusPlus/src/editdistance.cpp',
        'src/SymSpellPlusPlus/src/suggestionstage.cpp',
        'src/SymSpellPlusPlus/src/suggestitem.cpp',
        'src/SymSpellPlusPlus/src/symspell.cpp',
        'src/SymSpellPlusPlus/src/utils.cpp',
        'src/SymSpellPlusPlus/src/wordsegmentationitem.cpp',
      ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")", "src/SymSpellPlusPlus/include"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions','-std=c++2a' ],
      'cflags_cc!': [ '-fno-exceptions','-std=c++2a' ],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}