Check this video:


The [STM32CubeMonitor](https://www.st.com/en/development-tools/stm32cubemonitor.html) tool enables STM32 MCU program runtime monitoring using NodeRed. With the NodeRed 'function-block-like' programming and preconfigured elements (like LEDs for input status or dial for analog input and even a write table for variable setting) it is possible to create simple dashboards.

The potential of this tool is endless, but the lack of documentation and examples for usage with STM MCU is scaring people away (or back to [STMStudio](https://www.st.com/en/development-tools/stm-studio-stm32.html)). Moreover the dashboard layout is inefficent, ugly (ok, that is subjective) and laggy (when handling a lot of inputs) and the way how it is created is not appealing (I guess a lot of C/C++ programmers somehow dislike visual programing and wiring function blocks with mouse). To set varible values you need to use a table... It did not impress me and I was not using it after trying it once. 

Later in life I wanted to learn more about front-end developement and at the same time create something useful (I like to optimize everything). That is why I decided to use the NodeRed `ui-builder` plugin to create a custom UI with all the inputs/outputs/information I want, learning JS/VUE in the progress. No more ugly laggy dashboard, much less visual programming (hell) and variables are settable using custom UI elements (toggle switches, range inputs...).

It started as a small personal project but I also aplied it to a programs in my work as embedded engineer and it has saved me ton of time and trouble. 

### Technology 

I have based this project on <a href="https://github.com/TotallyInformation/node-red-contrib-uibuilder/tree/main/templates/vue"> Julian Knight uibuilder Vue Template</a>. He has done a great work developing the *node-red-contrib-uibuilder* and providing examples of use with different frameworks.

Used technology: 
- [CubeMonitor](https://www.st.com/en/development-tools/stm32cubemonitor.html) from STM, providing node-red blocks for STLink probes 
- [NodeRed](https://nodered.org/)
- [Vue](https://vuejs.org/) for the UI
- [Vue Stylequidist](https://vue-styleguidist.github.io/) for automatic documentation generation
- [Bootstrap](https://getbootstrap.com/) to make it look nicer 
- [React](https://reactjs.org/) only used because [Vue Stylequidist](https://vue-styleguidist.github.io/) needs it, feel free to remove it 


## Usage 

My favorite uses cases in no particular order: 

- you do not have the HW yet, but you have to start with integration tests
- there is a part of a system (like sensor or switch) missing (broken, not delivered on time) but you want to keep on testing without simulating it with potentiometer, duct tape or wires 
- the sensor/switch is in unreachable position (too high, deep or behind a cage) or it is not possible/safe/cheap/mess-free to simulate the conditions you want to try (pressure/oxygen/liquid/flamable gas sensors).
- you would like to simulate situations, that should (teoretically) never occur in real-life operation to test edge cases
- you have to take care of a legacy code and you have no idea what it really does. Toggling inputs and observing all relevant outputs at the same time can give you basic idea. 
- your marketing team is making a video/photos and they have a very clear idea how the system should look like (even it is a unnatural state). Instead of creating a *marketing program release* you can manipulate the system externally  


## How not to use it  

There are few points to mention:

- this is not a replacement of your unit tests! 
- you still **must** test **all** possible cases in real live scenarious (like letting a pressure/temperature get really high)! But this time you know how your SW behaves. 
- the idea is to change the input/outputs value as close to the HW manipulation as possible. Using only the manual input overwrite for a long time can hide a HW problem with the input (scaling, debouncing, EMV problems etc.). Make sure your HW is working correctly.
- in this DEMO example I have only shown how to directly manipulate inputs. It is quite easy to implement the same logic for outputs as well (I do use it for testing of low volume PCBs that do not have dedicated test equipment). But be very carefull if you are working with actors like motors or heaters. **Turning them on/off manually can be dangerous** 
- STlink probes can only work with one program at the time so you can not debug our program and use CubeMonitor at the same time 


## Known problems

- STlink probes can only work with one program at the time. It also takes some times for the probes to switch the connection from one program to another. If you are using CubeMonitor and want to switch to the CubeIDE or Atollic to flash a new program, you need to stop the data aquision and wait for a moment. Otherwise you will get error when connecting to MCU (Atollic handles this condition much better then CudeIDE). The other way around you may end up looking at "old" data even after pressing the start icon. That is why I like to have a counter variable that increases. This way I can tell if the connection the MCU is active (in my example I am using it to switch UI background colors to indicate the connection to MCU but a simple counter print will do). 
- The implementation costs some memory as you need to create more variables in RAM (CubeMonitor doesnt work with static variables). This may not be a problem on STM32F4 series, but may get annoying when working with tiny STM3F0. In my program I use `#define ALLOW_CUBEMX_OVERWRITE` to disable the functionally when working on memory constrained platform or/and when building a production version. 