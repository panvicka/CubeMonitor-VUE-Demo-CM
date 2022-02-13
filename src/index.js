/* jshint browser: true, esversion: 5, asi: true */
/*globals Vue, uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2021 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import Vue from 'vue'

import { analog_inputs_def, analogInputsReact } from "./mcu_variable_definitions/analog_inputs";
import { analog_outputs_def } from "./mcu_variable_definitions/analog_outputs";
import { inputReact, inputs_def } from "./mcu_variable_definitions/inputs_vars";
import { outputs_def } from "./mcu_variable_definitions/outputs_vars";
import { back_door_def } from "./mcu_variable_definitions/back_door";
import { programm_variables_def } from "./mcu_variable_definitions/programm_variables";

import StatusPanel from "./pages/StatusPanel.vue";

import VariableGraph from "./components/VariableGraph.vue";
import RangeInputSlider from "./components/RangeInputSlider.vue";
import Collapsable from "./components/Collapsable.vue";
import ButtonGroup from "./components/ButtonGroup.vue";
import DigitalInput from "./components/DigitalInput.vue";
import DigitalOutput from "./components/DigitalOutput.vue";
import NumberInput from "./components/NumberInput.vue";
import RangeSignalNameValue from "./components/RangeSignalNameValue.vue";
import ForcingCheckBox from "./components/ForcingCheckBox.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronUp,
  faChevronDown,
  faArrowsAlt,
  faMicrochip,
  faPlayCircle,
  faStopCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronUp, faChevronDown, faArrowsAlt, faMicrochip, faPlayCircle, faStopCircle, faTrash);

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "../sass/main.scss"

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

("use strict")

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  el: "#app",
  components: {
    "button-group": ButtonGroup,
    "variable-graph": VariableGraph,
     collapsable: Collapsable,
    "status-panel": StatusPanel,
    "digital-output": DigitalOutput,
    "digital-input": DigitalInput,
    "number-input": NumberInput,
    "range-signal-name-value": RangeSignalNameValue,
    "forcing-checkbox": ForcingCheckBox,
    "range-input-slider": RangeInputSlider,
  },
  data: {
    feVersion: "",
    inputs: [...inputs_def],
    analogInputs: [...analog_inputs_def],
    analogOutputs: [...analog_outputs_def],
    outputs: [...outputs_def],
    backdoorActions: [...back_door_def],
    programmVariables: [...programm_variables_def],

    liveCounterVal: 0,
    lastLiveCounterVal: 0,
    connectionMcu: false,
    connectionOK: true,
    socketConnectedState: false,

    serverTimeOffset: "[unknown]",

    inputId: "",
  }, // --- End of data --- //
  methods: {
    analogInputsReact,
    inputReact,

    setForcingEnabledAndSendRequest: function(reactFunction, variableArray, id, value) {
      variableArray[id].forced = value;
      reactFunction(variableArray);
      console.log(`forcing array index ${id} to a value ${value}`);
    },

    setForcedValueAndSendRequest: function(reactFunction, variableArray, id, value) {
      variableArray[id].forcedValue = value;
      reactFunction(variableArray);
      console.log(`setting array with id ${id} to a new value of ${value}`);
    },

    measurementStart: function(event) {
      console.log("Measurement start requested");
      uibuilder.send({
        topic: "start",
      });
    },
    measurementStop: function(event) {
      console.log("Measurement stop requested");
      uibuilder.send({
        topic: "stop",
      });
    },
    setBackDoor: function(valueToSet) {
      console.log("backdoor value " + valueToSet);
      var payload = [];
      payload.push({
        variable: "mx_back_door_adr",
        valueToset: valueToSet,
      });
      uibuilder.send({
        topic: "backdoor",
        payload,
      });
    },
  }, // --- End of methods --- //

  // Available hooks: beforeCreate,created,beforeMount,mounted,beforeUpdate,updated,beforeDestroy,destroyed, activated,deactivated, errorCaptured

  /** Called after the Vue app has been created. A good place to put startup code */
  created: function() {
    /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
     * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
     * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
     * e.g. uibuilder.start('/uib', '/uibuilder/vendor/socket.io') // change to use your paths/names
     * @param {Object=|string=} namespace Optional. Object containing ref to vueApp, Object containing settings, or String IO Namespace override. changes self.ioNamespace from the default.
     * @param {string=} ioPath Optional. changes self.ioPath from the default
     * @param {Object=} vueApp Optional. Reference to the VueJS instance. Used for Vue extensions.
     */
    uibuilder.start(this); // Single param passing vue app to allow Vue extensions to be used.
    this.interval = setInterval(() => {
      if (this.liveCounterVal != this.lastLiveCounterVal) {
        this.connectionMcu = true;
      } else {
        this.connectionMcu = false;
      }
      this.lastLiveCounterVal = this.liveCounterVal;
      if (this.connectionMcu == true && this.socketConnectedState == true) {
        this.connectionOK = true;
      } else {
        this.connectionOK = false;
      }
    }, 3000);
  },

  /** Called once all Vue component instances have been loaded and the virtual DOM built */
  mounted: function() {
    //console.debug('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

    var app = this; // Reference to `this` in case we need it for more complex functions

    // If msg changes - msg is updated when a standard msg is received from Node-RED over Socket.IO
    // newVal relates to the attribute being listened to.
    uibuilder.onChange("msg", function(msg) {
      app.msgRecvd = msg;
      app.msgsReceived = uibuilder.get("msgsReceived");
      app.payload = msg.payload;

      if (msg.topic == "inputs") {
        for (var i = 0; i < msg.payload.length; i++) {
          app.inputs[i].value = msg.payload[i].value;
        }
      } else if (msg.topic == "analog_inputs") {
        for (var i = 0; i < msg.payload.length; i++) {
          app.analogInputs[i].value = msg.payload[i].value;
        }
      } else if (msg.topic == "outputs") {
        for (var i = 0; i < msg.payload.length; i++) {
          app.outputs[i].value = msg.payload[i].value;
        }
      } else if (msg.topic == "analog_outputs") {
        for (var i = 0; i < msg.payload.length; i++) {
          app.analogOutputs[i].value = msg.payload[i].value;
        }
      } else if (msg.topic == "live_counter") {
        app.liveCounterVal = msg.payload[0].value;
      } else if (msg.topic == "counter") {
        app.programmVariables[0].value = msg.payload[0].value;
      }
    });

    /** If Socket.IO connects/disconnects, we get true/false here */
    uibuilder.onChange("ioConnected", function(connected) {
      //console.info('[indexjs:uibuilder.onChange:ioConnected] Socket.IO Connection Status Changed to:', connected)
      app.socketConnectedState = connected;
    });
  },
});
