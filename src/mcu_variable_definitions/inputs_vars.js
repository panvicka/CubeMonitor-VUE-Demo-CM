export var inputs_def = [
  {
    name: "Button",
    value: 0,
    description: "Blue user button",
    forced: false,
    forcedValue: false,
    variableWithForcedValue: "inputs[0].mx_value_adr",
    variableWithForcedEnable: "inputs[0].mx_rewrites_adr",
  },
  {
    name: "DI1 (PE7)",
    value: 0,
    description: "Input 1",
    forced: false,
    forcedValue: false,
    variableWithForcedValue: "inputs[1].mx_value_adr",
    variableWithForcedEnable: "inputs[1].mx_rewrites_adr",
  },
  {
    name: "DI2 (PE8)",
    value: 0,
    description: "Input 2",
    forced: false,
    forcedValue: false,
    variableWithForcedValue: "inputs[2].mx_value_adr",
    variableWithForcedEnable: "inputs[2].mx_rewrites_adr",
  },
];

function inputReact(inputArray) {
  var payload = [];
  for (var i = 0; i < inputArray.length; i++) {
    payload.push({
      variable: inputArray[i].variableWithForcedEnable,
      valueToset: inputArray[i].forced ? 1 : 0,
    });
    payload.push({
      variable: inputArray[i].variableWithForcedValue,
      valueToset: inputArray[i].forcedValue ? 1 : 0,
    });
  }

  uibuilder.send({
    topic: "input change",
    payload,
  });
  console.log("sending input change request");
}

export { inputReact };
