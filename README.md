# DEMO CubeMonitor UI with Vue

Create dashboard to CubeMonitor application with custom UI elements with no minimal node-red diagram fiddling.

- This part contains the CubeMonitor JSON file and Vue UI source code. Check the documentation on [this repository github page](https://panvicka.github.io/CubeMonitor-VUE-Demo-CM/) 
- The second part with MCU program can be found here [CubeMonitor-VUE-Demo-MCU](https://github.com/panvicka/CubeMonitor-VUE-Demo-MCU)

This is how the NodeRed diagram looks like. You only need to adjust the left part of it to filter and variables that should be send to the UI.
<img src="./docs/assets/screen_shot_with_notes.svg" alt="NodeRed diagram" width="800"/>


## Monitor outputs online

<img src="./docs/assets/screen_recording/UI_outputs.gif" alt="Monitoring selected outputs" width="700"/>

## Monitor or rewrite inputs with forced values

<img src="./docs/assets/screen_recording/UI_button.gif" alt="Input manipulation" width="700"/>

## Plot graphs

<img src="./docs/assets/screen_recording/UI_graph.gif" alt="Graphs" width="700"/>

## Create pre-defined actions to test your system

- define actions that will save you time when testing your system ()
- check how your system react to unexpected resets or endless loops (in the example is the watchdog not running)

<img src="./docs/assets/screen_recording/UI_actions.gif" alt="Action" width="700"/>

## ...implement your own elements to make your embedded engineer life easier!



Documentation build: 
[![Node.js CI](https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/actions/workflows/node.js.yml/badge.svg)](https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/actions/workflows/node.js.yml)