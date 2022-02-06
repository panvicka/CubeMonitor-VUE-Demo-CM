export var analog_inputs_def = [
  {
    min: 0,
    max: 330,
    unit: "V",
    scale: 100,
    name: "AI 1",
    value: 0,
    step: 0.1,
    description: "Analog input 1",
    forced: false,
    forcedValue: false,
    variableWithForcedValue: "analog_inputs[0].mx_value_adr",
    variableWithForcedEnable: "analog_inputs[0].mx_rewrites_adr",
  },
  {
    min: 0,
    max: 330,
    unit: "V",
    scale: 100,
    name: "AI 2",
    value: 0,
    step: 0.1,
    description: "Analog input 2",
    forced: false,
    forcedValue: false,
    variableWithForcedValue: "analog_inputs[1].mx_value_adr",
    variableWithForcedEnable: "analog_inputs[1].mx_rewrites_adr",
  },
];

function analogInputsReact(analogInputArr) {
  var payload = [];
  for (var i = 0; i < analogInputArr.length; i++) {
    payload.push({
      variable: analogInputArr[i].variableWithForcedEnable,
      valueToset: analogInputArr[i].forced ? 1 : 0,
    });
    payload.push({
      variable: analogInputArr[i].variableWithForcedValue,
      valueToset: parseInt(analogInputArr[i].forcedValue) || 0,
    });
  }
  uibuilder.send({
    topic: "analog input change",
    payload,
  });
  console.log("sending analog input change request");
}

export { analogInputsReact };
