# SnowyRecorder

## Important
App won't work without installed SOX. You need to install SOX and add that to system $PATH variable. Require SOX version 14.4.1 (not higher).  
Link to download SOX -> https://sourceforge.net/projects/sox/files/sox/14.4.1/

## Description
SnowyRecorder is a simple widget which allows you to record your voice.

## Shortcuts
On Windows, Linux:
  - Ctrl+Q - Quit
  - Ctrl+R - Reload
  - Ctrl+Shift+R - App restart
  
On Mac:
  - Command+Q - Quit
  - Command+R - Reload
  - Command+Shift+R - App restart
  
## Command line arguments
snowyrecorder.exe frequency "File output folder"  
Exmaples:  
snowyrecorder.exe 16000 C:\Users\Krzysztof\Videos  
snowyrecorder.exe def C:\Users\Krzysztof\Videos  

When you will give as argument def, default and . program will setup default values.

# Download, Used Modules, Author and other informations
Polish version download -> https://github.com/KrzysztofZawisla/SnowyRecorder/releases/

Authors: Krzysztof Zawisła, Jakub "Logic" Pawelec.  
Used NPM's modules:  
  - electron-packager  
  - electron  
  - node-audiorecorder
