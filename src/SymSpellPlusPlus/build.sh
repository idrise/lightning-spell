rm main
clang++ -Wall -Wextra -std=c++17 main.cpp ./src/editdistance.cpp ./src/suggestionstage.cpp ./src/suggestitem.cpp ./src/symspell.cpp ./src/utils.cpp ./src/wordsegmentationitem.cpp -I ./include -o main

