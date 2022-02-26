
You can also check this video:

## Getting things to work

### Setting the MCU part

First you need a board with STM32 MCU. It doesn't matter which MCU you have as long as it has enabled SWCLK/SWDIO STLink debugging interface. I have created a demo for STM32F4 Discovery board that can be found [here](https://github.com/panvicka/CubeMonitor-VUE-Demo-MCU). If you have a different Discovery/Nukleo board you can port the example program quite easily as long as it has 1 button, 3 LEDs, 2 ADC/DAC channels and at least 3 timers. The libraries and the program doesn't depend on the MCU type, you just need to take care about the HW setting on your board.

Follow instructions on how to set up the MCU part in the [CubeMonitor-VUE-Demo-MCU README](https://github.com/panvicka/CubeMonitor-VUE-Demo-MCU/blob/master/README.md). The project is documented using Doxygen, you can check the build documentation [here](https://panvicka.github.io/CubeMonitor-VUE-Demo-MCU/).

### Getting CubeMonitor ready

1. Install [CubeMonitor](https://www.st.com/en/development-tools/stm32cubemonitor.html) on your PC. You need to create STM account if you do not have one.
2. Install [Node.js](https://nodejs.org/en/) (needed by the ui-builder extension and also for building the VUE project)
3. Open CubeMonitor and go the **Settings->Palette->Install** and install `node-red-contrib-uibuilder` (I am using version 4.1.4)

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/ui-builder.PNG" alt="installing ui-builder" width="500"/>

4. In the repository root there is a file `DEMO-MX-Cube-Vue.json`. Go **Settings->Import** and import it.



5. Open the ui-builder node (light purple with name `DEMO-MX-Cube-Vue`) and check **Advanced Settings**. In the Template input _dist_ must be selected.
6. Locate the folder the `ui-builder` is using. You can check it in the ui-builder note under _uibuilder details_ option. For me it was `C:\Users\panvicka\.STMicroelectronics\stm32cubemonitor\uibuilder`. I recommend cloning the GIT repository to this folder. This should create a folder named `DEMO-MX-Cube-Vue`.
7. In this folder run `npm install` and `npm build`. This should create files in the `dist` folder.
8. Deploy the node (ignore the warning about the other nodes for now) and try `http://localhost:1880/DEMO-MX-Cube-Vue/`. UI should load and in the upper right corner, you should see `socket OK` status.

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/ui_socket_ok.PNG" alt="Connection to Socket Status OK" width="500"/>

### Connection to MCU

1. In the node-red flow diagram there are two `myProbe_Out` and one `myProbe_In` nodes. Connect STLink probe to your PC, open the individual nodes and select the connected probe. After you are done it should look like this.

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/probes.PNG" alt="Probes connected" width="500"/>

2. Open the `myVariablesWrite` block and in the **Executable** input navigate the the .elf file from the previous session. The click on the pen icon next to the field. You should get all the available variables listed. Use the filter in the right lower corner and search for `mx_`. I add the `mx` prefix to all variables I want to use in the CubeMonitor so I can import them all at one. Click **select all** and **Update** and **Done**. Deploy. There should be no more warnings.

<div>
    <img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/variables0.PNG" alt="Variable import" width="400"/> 
    <img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/variables.PNG" alt="Variable import" width="400"/> 
</div>

3. Go to the UI on `http://localhost:1880/DEMO-MX-Cube-Vue/` and click the green start icon. The grey background color should change to white and the status in the upper right corner should now say `MCU OK` as well. Try pressing the user button.

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/connection_to_mcu.PNG" alt="Connection to MCU" width="400"/>


4. This is how the node-red diagram should look like when you are done. 

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/screen_node_red.PNG" alt="NodeRed diagram after import" width="800"/>

## DEMO Program function

In order to demonstrate how to use this project I am using:

- one toggle button (on the Discovery Board)
- three LEDs (on the Discovery Board)
  - Blue
  - Orange
  - Red
- two ADC and DAC channels (connected to 2 potentiometer on breadboard)
- two digital inputs (connected to 2 switches on breadboard)
- one counter variable

Program logic:

- short toggle button press increases counter by one
- long toggle button press causes the counter to increase continually
- double press sets the counter to 0
- first ADC is reading a value between 0-3.3V
- second ADC is reading a value between 0-5V
- first DAC is outputting a reversed value of the first ADC
- blue LED is ON if counter is even, OFF if counter is odd
- red LED is ON if both digital inputs are on
- orange LED is toggling on/off

More details can be found in the [MCU program repository](https://panvicka.github.io/CubeMonitor-VUE-Demo-MCU/index.html#autotoc_md3)

### UI usage

Open the UI and try pushing the user button. You should see the state of the input changing and counter value increasing. You can also check the state of the orange diode (going on and off). Try overwriting the input values and observe the program behavior.

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/ui_function.PNG" alt="Connection to MCU" width="800"/>


## Monitor outputs online
<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/UI_outputs.gif" alt="Monitoring selected outputs" width="700"/>

## Monitor or rewrite inputs with forced values
<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/UI_button.gif" alt="Input manipulation" width="700"/>

## Plot graphs
<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/UI_graph.gif" alt="Graphs" width="700"/>

## Create pre-defined actions to test your system
- define actions that will save you time when testing your system ()
- check how your system react to unexpected resets or endless loops (in the example is the watchdog not running)

<img src="https://github.com/panvicka/CubeMonitor-VUE-Demo-CM/blob/main/docs/assets/UI_actions.gif" alt="Action" width="700"/>