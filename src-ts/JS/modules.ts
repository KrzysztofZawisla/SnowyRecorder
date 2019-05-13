const AudioRecorder:any = require('node-audiorecorder');
const fs:any = require(`fs`);
const path:any = require(`path`);
const os:any = require("os");
const electron:any = require("electron");

const { remote, ipcRenderer }:any = electron;