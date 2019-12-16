# PokerHandAnalyzer
### HandAnalyzer will deal five cards for 3 players and analyze each player hand. 
### There will be Analysis.txt file made after each run. If same named file exists, it will be overwritten.
	
* 1 Analyzed hands contains
	* Pair
	* Three of same
	* Four of same
	* Full house
	* Straight
	* Flush
* 2 Requirements to run pokerHandAnalyzer.js

	Program has been written in Javascript. To run the program, you will need to download Node.js runtime.
	Either search "nodejs" from google or click [link to Node.js homepage](https://nodejs.org/en/)
	
* 3 Guide to run pokerHandAnalyzer in Windows

	* Unzip pokerHandAnalyzer.zip-file to somewhere. Example given: C:\

	* Open Command Prompt (Shortcut is Windows Key+R, type "cmd" and press OK)

	* Navigate to pokerHandAnalyzer folder in Command Prompt. You can navigate folders at Command Prompt with command "cd".
	Example given: cd C:\pokerHandAnalyzer

	* Type "node pokerHandAnalyzer.js" to run program

    * Program will create Analysis.txt to same folder as where pokerHandAnalyzer is located.
    

* Currently pokerHandAnalyzer will add results to Analysis.txt. If you want to change it so it will clear old data after every game, I've made code at bottom of script which is in comment. If you un-comment lines 261-265 and comment lines 257-260, the saving will be changed.
