# Motivation 

Check this video:


The [STM32CubeMonitor](https://www.st.com/en/development-tools/stm32cubemonitor.html) tool enables program runtime monitoring using NodeRed. With the NodeRed 'function-block-like' programming and preconfigured elements (like LEDs for input status or dial for analog input and even a write table for variable setting) it is possible to create simple dashboards. As long as you want only few inputs and you do not really care about setting a lot of variables manually, this is completely fine.

I did not really like the dashboard (it got pretty full and laggy after a while) and the way how it is created (I guess a lot of C/C++ programmers somehow dislike visual programing and wiring function blocks with mouse). I was also missing a simple way how to set variables using graphical elements like toggle switching.

That is why I decided to use the NodeRed ui-builder plugin to create a custom UI with all the inputs/outputs/information I want. It started as a small personal project. I wanted to learn more about front-end developement and at the same time create something useful for me. I used it in my work as embedded engineer and it has saved me ton of time and trouble. 

# Usage 

My favorite uses cases in no particular order: 

- you do not have the HW yet, but you have to start with integration tests
- there is a part of a system (like sensor or switch) missing (broken, not delivered on time) but you want to keep on testing without simulating it with potentiometer and a duct tape 
- the sensor/switch is in unreachable position (too high, deep or behind a cage) or it is not possible/safe/cheap to simulate the conditions you want to try (pressure/oxygen sensors)
- you need to simulate situations that should never occur in real-life to test edge cases
- your marketing team is making a video and they have a very clear idea what and when should the system do even it is not it's standard way of operation 