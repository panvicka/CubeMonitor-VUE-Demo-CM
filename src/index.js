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

import { analog_inputs_def, analogInputsReact } from "./mcu_variable_definitions/analog_inputs";
import { analog_outputs_def } from "./mcu_variable_definitions/analog_outputs";
import { inputReact, inputs_def } from "./mcu_variable_definitions/inputs_vars";
import { outputs_def } from "./mcu_variable_definitions/outputs_vars";
import { back_door_def } from "./mcu_variable_definitions/back_door";

import ControlValueChart from "./components/ControlValueChart.vue";
import ChartThreeValues from "./components/ChartThreeValues.vue";

import TextOutput from "./components/TextOutput.vue";
import RangeInputSlider from "./components/RangeInputSlider.vue";
import Collapsable from "./components/Collapsable.vue";
import ButtonGroup from "./components/ButtonGroup.vue";
import StatusPanel from "./components/StatusPanel.vue";
import DigitalInput from "./components/DigitalInput.vue";
import Event from "./components/Event.vue";
import DigitalOutput from "./components/DigitalOutput.vue";
import NumberInput from "./components/NumberInput.vue";
import RangeSignalNameValue from "./components/RangeSignalNameValue.vue";
import RangeSignalNameForcedValue from "./components/RangeSignalNameForcedValue.vue";
import ForcingCheckBox from "./components/ForcingCheckBox.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp, faChevronDown, faArrowsAlt, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronUp, faChevronDown, faArrowsAlt, faMicrochip);


("use strict");

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */
Vue.component('font-awesome-icon', FontAwesomeIcon) 
// eslint-disable-next-line no-unused-vars
new Vue({
  el: "#app",
  components: {
    // "font-awesome-icon": FontAwesomeIcon,
    "button-group": ButtonGroup,
    "chart-3-values": ChartThreeValues,
    "text-output": TextOutput,
    collapsable: Collapsable,
    "status-panel": StatusPanel,
    "digital-output": DigitalOutput,
    "digital-input": DigitalInput,
    "number-input": NumberInput,
    "range-signal-name-value": RangeSignalNameValue,
    "range-signal-name-forced-value": RangeSignalNameForcedValue,
    "forcing-checkbox": ForcingCheckBox,
    "range-input-slider": RangeInputSlider,
    event: Event,
  },
  data: {
    startMsg: "Vue has started, waiting for messages",
    feVersion: "",
    inputs: [...inputs_def],
    analogInputs: [...analog_inputs_def],
    analogOutputs: [...analog_outputs_def],
    outputs: [...outputs_def],
    backdoorActions: [...back_door_def],

    heartBeat: 0,
    counter: 0,

    socketConnectedState: false,
    serverTimeOffset: "[unknown]",
    imgProps: { width: 75, height: 75 },

    msgRecvd: "[Nothing]",
    msgsReceived: 0,
    msgCtrl: "[Nothing]",
    msgsControl: 0,

    msgSent: "[Nothing]",
    msgsSent: 0,
    msgCtrlSent: "[Nothing]",
    msgsCtrlSent: 0,

    isLoggedOn: false,
    userId: null,
    userPw: null,
    inputId: "",
  }, // --- End of data --- //
  computed: {
    hLastRcvd: function() {
      var msgRecvd = this.msgRecvd;
      if (typeof msgRecvd === "string") return "Last Message Received = " + msgRecvd;
      else return "Last Message Received = " + this.syntaxHighlight(msgRecvd);
    },
    hLastSent: function() {
      var msgSent = this.msgSent;
      if (typeof msgSent === "string") return "Last Message Sent = " + msgSent;
      else return "Last Message Sent = " + this.syntaxHighlight(msgSent);
    },
    hLastCtrlRcvd: function() {
      var msgCtrl = this.msgCtrl;
      if (typeof msgCtrl === "string") return "Last Control Message Received = " + msgCtrl;
      else return "Last Control Message Received = " + this.syntaxHighlight(msgCtrl);
    },
    hLastCtrlSent: function() {
      var msgCtrlSent = this.msgCtrlSent;
      if (typeof msgCtrlSent === "string") return "Last Control Message Sent = " + msgCtrlSent;
      //else return 'Last Message Sent = ' + this.callMethod('syntaxHighlight', [msgCtrlSent])
      else return "Last Control Message Sent = " + this.syntaxHighlight(msgCtrlSent);
    },
  }, // --- End of computed --- //
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
        variable: "back_door_mx_adr",
        valueToset: valueToSet,
      });
      uibuilder.send({
        topic: "backdoor",
        payload,
      });
    },

    doLogon: function() {
      uibuilder.logon({
        id: this.inputId,
      });
    }, // --- End of doLogon --- //

    doLogoff: function() {
      uibuilder.logoff();
    }, // --- End of doLogon --- //

    // return formatted HTML version of JSON object
    syntaxHighlight: function(json) {
      json = JSON.stringify(json, undefined, 4);
      json = json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      json = json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
          var cls = "number";
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if (/true|false/.test(match)) {
            cls = "boolean";
          } else if (/null/.test(match)) {
            cls = "null";
          }
          return '<span class="' + cls + '">' + match + "</span>";
        }
      );
      return json;
    }, // --- End of syntaxHighlight --- //
  }, // --- End of methods --- //

  // Available hooks: beforeCreate,created,beforeMount,mounted,beforeUpdate,updated,beforeDestroy,destroyed, activated,deactivated, errorCaptured

  /** Called after the Vue app has been created. A good place to put startup code */
  created: function() {
    // Example of retrieving data from uibuilder
    this.feVersion = uibuilder.get("version");

    /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
     * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
     * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
     * e.g. uibuilder.start('/uib', '/uibuilder/vendor/socket.io') // change to use your paths/names
     * @param {Object=|string=} namespace Optional. Object containing ref to vueApp, Object containing settings, or String IO Namespace override. changes self.ioNamespace from the default.
     * @param {string=} ioPath Optional. changes self.ioPath from the default
     * @param {Object=} vueApp Optional. Reference to the VueJS instance. Used for Vue extensions.
     */
    uibuilder.start(this); // Single param passing vue app to allow Vue extensions to be used.

    //console.log(this)
  },

  /** Called once all Vue component instances have been loaded and the virtual DOM built */
  mounted: function() {
    //console.debug('[indexjs:Vue.mounted] app mounted - setting up uibuilder watchers')

    var app = this; // Reference to `this` in case we need it for more complex functions

    // If msg changes - msg is updated when a standard msg is received from Node-RED over Socket.IO
    // newVal relates to the attribute being listened to.
    uibuilder.onChange("msg", function(msg) {
      //console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
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
      } else if (msg.topic == "heartbeat") {
        app.heartBeat = msg.payload[0].value;
      } else if (msg.topic == "counter") {
        app.counter = msg.payload[0].value;
      }
    });

    //#region ---- Debug info, can be removed for live use ---- //

    /** You can use the following to help trace how messages flow back and forth.
     * You can then amend this processing to suite your requirements.
     */

    // If we receive a control message from Node-RED, we can get the new data here - we pass it to a Vue variable
    uibuilder.onChange("ctrlMsg", function(msg) {
      //console.info('[indexjs:uibuilder.onChange:ctrlMsg] CONTROL msg received from Node-RED server:', msg)
      app.msgCtrl = msg;
      app.msgsControl = uibuilder.get("msgsCtrl");
    });

    /** You probably only need these to help you understand the order of processing
     * If a message is sent back to Node-RED, we can grab a copy here if we want to
     */
    uibuilder.onChange("sentMsg", function(msg) {
      //console.info('[indexjs:uibuilder.onChange:sentMsg] msg sent to Node-RED server:', msg)
      app.msgSent = msg;
      app.msgsSent = uibuilder.get("msgsSent");
    });

    /** If we send a control message to Node-RED, we can get a copy of it here */
    uibuilder.onChange("sentCtrlMsg", function(msg) {
      //console.info('[indexjs:uibuilder.onChange:sentCtrlMsg] Control message sent to Node-RED server:', msg)
      app.msgCtrlSent = msg;
      app.msgsCtrlSent = uibuilder.get("msgsSentCtrl");
    });

    /** If Socket.IO connects/disconnects, we get true/false here */
    uibuilder.onChange("ioConnected", function(connected) {
      //console.info('[indexjs:uibuilder.onChange:ioConnected] Socket.IO Connection Status Changed to:', connected)
      app.socketConnectedState = connected;
    });
    /** If Server Time Offset changes */
    uibuilder.onChange("serverTimeOffset", function(serverTimeOffset) {
      //console.info('[indexjs:uibuilder.onChange:serverTimeOffset] Offset of time between the browser and the server has changed to:', serverTimeOffset)
      app.serverTimeOffset = serverTimeOffset;
    });

    /** If user is logged on/off */
    uibuilder.onChange("isAuthorised", function(isAuthorised) {
      //console.info('[indexjs:uibuilder.onChange:isAuthorised] isAuthorised changed. User logged on?:', isAuthorised)
      //console.log('authData: ', uibuilder.get('authData'))
      //console.log('authTokenExpiry: ', uibuilder.get('authTokenExpiry'))
      app.isLoggedOn = isAuthorised;
    });

    //#endregion ---- Debug info, can be removed for live use ---- //
  }, // --- End of mounted hook --- //
}); // --- End of app1 --- //

// EOF
