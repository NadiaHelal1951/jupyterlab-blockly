//import { ToolboxDefinition } from 'blockly/core/utils/toolbox';

export function openDialogAndGetToolbox() {
  //return new Promise(resolve => {
  let x;
  const dialog = document.createElement('dialog');
  dialog.style.backgroundColor = '#597ED5';
  dialog.style.borderRadius = '10px';
  //dialog.style.boxShadow = '#7CD8FF';
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.padding = '20px';
  dialog.style.zIndex = '9999';

  // create the dialog title
  const title = document.createElement('h1');
  title.textContent =
    'Enter JSON data please. Press "Default" if you want default toolbox';
  title.style.fontSize = '20px';
  title.style.marginBottom = '10px';
  title.style.textAlign = 'center';
  title.style.color = 'white';

  // add the dialog title to the dialog
  dialog.appendChild(title);

  // create the JSON input box element
  const jsonInput = document.createElement('textarea');
  jsonInput.placeholder =
    'Please make sure it follows toolbox API\nE.g.{"kind"{..}"contents"[{..}]};';
  jsonInput.style.width = '95%';
  jsonInput.style.height = '200px';
  jsonInput.style.borderRadius = '10px';
  //jsonInput.style.border = '1px solid #ccc';
  jsonInput.style.backgroundColor = '#89C5E4';
  jsonInput.style.padding = '10px';
  //jsonInput.style.resize = 'none';

  // add the JSON input box to the dialog
  dialog.appendChild(jsonInput);

  // create the "Save" button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.style.backgroundColor = '#4CAF50';
  saveButton.style.borderRadius = '5px';
  saveButton.style.border = 'none';
  saveButton.style.color = 'white';
  saveButton.style.padding = '10px';
  saveButton.style.cursor = 'pointer';
  saveButton.style.marginTop = '10px';

  // add the "Save" button to the dialog
  dialog.appendChild(saveButton);

  const defaultButton = document.createElement('button');
  defaultButton.textContent = 'Default';
  defaultButton.style.backgroundColor = '#4CAF50';
  defaultButton.style.borderRadius = '5px';
  defaultButton.style.border = 'none';
  defaultButton.style.color = 'white';
  defaultButton.style.padding = '10px';
  defaultButton.style.cursor = 'pointer';
  defaultButton.style.marginLeft = '5px';
  defaultButton.style.marginTop = '10px';

  // add the "Save" button to the dialog
  dialog.appendChild(defaultButton);

  // create the "Cancel" button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.style.backgroundColor = '#DF4D4D';
  cancelButton.style.borderRadius = '5px';
  cancelButton.style.border = 'none';
  cancelButton.style.color = 'white';
  cancelButton.style.padding = '10px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.style.marginLeft = '5px';
  cancelButton.style.marginTop = '10px';

  // add the "Cancel" button to the dialog
  dialog.appendChild(cancelButton);

  saveButton.addEventListener('click', () => {
    //y = document.getElementById("userInput").value;
    x = jsonInput.value;
    dialog.close();
    //resolve(x);
  });

  defaultButton.addEventListener('click', () => {
    x = {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Logic',
          colour: '210',
          contents: [
            {
              kind: 'block',
              type: 'controls_if'
            },
            {
              kind: 'BLOCK',
              type: 'logic_compare'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="logic_operation"></block>',
              type: 'logic_operation'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="logic_negate"></block>',
              type: 'logic_negate'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="logic_boolean"></block>',
              type: 'logic_boolean'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="logic_null"></block>',
              type: 'logic_null'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="logic_ternary"></block>',
              type: 'logic_ternary'
            }
          ]
        },
        {
          kind: 'category',
          name: 'Loops',
          colour: '120',
          contents: [
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="controls_repeat_ext">\n          <value name="TIMES">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'controls_repeat_ext'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="controls_whileUntil"></block>',
              type: 'controls_whileUntil'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="controls_for">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n          <value name="BY">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'controls_for'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="controls_forEach"></block>',
              type: 'controls_forEach'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="controls_flow_statements"></block>',
              type: 'controls_flow_statements'
            }
          ]
        },
        {
          kind: 'CATEGORY',
          name: 'Math',
          colour: '230',
          contents: [
            {
              kind: 'BLOCK',
              blockxml: '<block type="math_number"></block>',
              type: 'math_number'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_arithmetic">\n          <value name="A">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="B">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_arithmetic'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_single">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">9</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_single'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_trig">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">45</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_trig'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="math_constant"></block>',
              type: 'math_constant'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_number_property">\n          <value name="NUMBER_TO_CHECK">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_number_property'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_change">\n          <value name="DELTA">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_change'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_round">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">3.1</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_round'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="math_on_list"></block>',
              type: 'math_on_list'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_modulo">\n          <value name="DIVIDEND">\n            <shadow type="math_number">\n              <field name="NUM">64</field>\n            </shadow>\n          </value>\n          <value name="DIVISOR">\n            <shadow type="math_number">\n              <field name="NUM">10</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_modulo'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_constrain">\n          <value name="VALUE">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="LOW">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="HIGH">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_constrain'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="math_random_int">\n          <value name="FROM">\n            <shadow type="math_number">\n              <field name="NUM">1</field>\n            </shadow>\n          </value>\n          <value name="TO">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'math_random_int'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="math_random_float"></block>',
              type: 'math_random_float'
            }
          ]
        },
        {
          kind: 'CATEGORY',
          name: 'Text',
          colour: '160',
          contents: [
            {
              kind: 'BLOCK',
              blockxml: '<block type="text"></block>',
              type: 'text'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="text_join"></block>',
              type: 'text_join'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_append">\n          <value name="TEXT">\n            <shadow type="text"></shadow>\n          </value>\n        </block>',
              type: 'text_append'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_length">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_length'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_isEmpty">\n          <value name="VALUE">\n            <shadow type="text">\n              <field name="TEXT"></field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_isEmpty'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n          <value name="FIND">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_indexOf'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_charAt">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
              type: 'text_charAt'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_getSubstring">\n          <value name="STRING">\n            <block type="variables_get">\n              <field name="VAR">text</field>\n            </block>\n          </value>\n        </block>',
              type: 'text_getSubstring'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_changeCase">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_changeCase'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_trim">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_trim'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_print">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_print'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="text_prompt_ext">\n          <value name="TEXT">\n            <shadow type="text">\n              <field name="TEXT">abc</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'text_prompt_ext'
            }
          ]
        },
        {
          kind: 'CATEGORY',
          name: 'Lists',
          colour: '260',
          contents: [
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_create_with">\n          <mutation items="0"></mutation>\n        </block>',
              type: 'lists_create_with'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="lists_create_with"></block>',
              type: 'lists_create_with'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_repeat">\n          <value name="NUM">\n            <shadow type="math_number">\n              <field name="NUM">5</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'lists_repeat'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="lists_length"></block>',
              type: 'lists_length'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="lists_isEmpty"></block>',
              type: 'lists_isEmpty'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_indexOf">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
              type: 'lists_indexOf'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_getIndex">\n          <value name="VALUE">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
              type: 'lists_getIndex'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_setIndex">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
              type: 'lists_setIndex'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_getSublist">\n          <value name="LIST">\n            <block type="variables_get">\n              <field name="VAR">list</field>\n            </block>\n          </value>\n        </block>',
              type: 'lists_getSublist'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="lists_split">\n          <value name="DELIM">\n            <shadow type="text">\n              <field name="TEXT">,</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'lists_split'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="lists_sort"></block>',
              type: 'lists_sort'
            }
          ]
        },
        {
          kind: 'CATEGORY',
          name: 'Color',
          colour: '20',
          contents: [
            {
              kind: 'BLOCK',
              blockxml: '<block type="colour_picker"></block>',
              type: 'colour_picker'
            },
            {
              kind: 'BLOCK',
              blockxml: '<block type="colour_random"></block>',
              type: 'colour_random'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="colour_rgb">\n          <value name="RED">\n            <shadow type="math_number">\n              <field name="NUM">100</field>\n            </shadow>\n          </value>\n          <value name="GREEN">\n            <shadow type="math_number">\n              <field name="NUM">50</field>\n            </shadow>\n          </value>\n          <value name="BLUE">\n            <shadow type="math_number">\n              <field name="NUM">0</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'colour_rgb'
            },
            {
              kind: 'BLOCK',
              blockxml:
                '<block type="colour_blend">\n          <value name="COLOUR1">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#ff0000</field>\n            </shadow>\n          </value>\n          <value name="COLOUR2">\n            <shadow type="colour_picker">\n              <field name="COLOUR">#3333ff</field>\n            </shadow>\n          </value>\n          <value name="RATIO">\n            <shadow type="math_number">\n              <field name="NUM">0.5</field>\n            </shadow>\n          </value>\n        </block>',
              type: 'colour_blend'
            }
          ]
        },
        {
          kind: 'SEP'
        },
        {
          kind: 'CATEGORY',
          colour: '330',
          custom: 'VARIABLE',
          name: 'Variables'
        },
        {
          kind: 'CATEGORY',
          colour: '290',
          custom: 'PROCEDURE',
          name: 'Functions'
        }
      ]
    };
    dialog.close();
    //resolve(x);
  });

  cancelButton.addEventListener('click', () => {
    x = null;
    dialog.close();
    //resolve(x);
  });
  // add the dialog to the page
  document.body.appendChild(dialog);

  // open the dialog
  dialog.showModal();
  return x;
  //});
}

/**export const toolbox = openDialogAndGetToolbox().then(toolboxValue => {
  JSON.stringify(toolboxValue); 

    const dialog2 = document.createElement('dialog');
    dialog2.style.backgroundColor = 'white';
    dialog2.style.borderRadius = '10px';
    dialog2.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    dialog2.style.position = 'fixed';
    dialog2.style.top = '50%';
    dialog2.style.left = '50%';
    dialog2.style.transform = 'translate(-50%, -50%)';
    dialog2.style.padding = '20px';
    dialog2.style.zIndex = '9999';

    const title2 = document.createElement('h1');
    title2.textContent = 'Test the tools';
    title2.style.fontSize = '20px';
    title2.style.marginBottom = '10px';
    title2.style.textAlign = 'center';
    dialog2.appendChild(title2);

    const toolboxDiv = document.createElement('div');
    toolboxDiv.textContent = 'say sm' + JSON.stringify(toolboxValue);
    toolboxDiv.style.marginBottom = '10px';
    dialog2.appendChild(toolboxDiv);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Test';
    saveButton.style.backgroundColor = '#4CAF50';
    saveButton.style.borderRadius = '5px';
    saveButton.style.border = 'none';
    saveButton.style.color = 'white';
    saveButton.style.padding = '10px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.marginTop = '10px';

    // add the "Save" button to the dialog
    dialog2.appendChild(saveButton);

    document.body.appendChild(dialog2);
    saveButton.addEventListener('click', () => {
      //x = null
      dialog2.close();
      //resolve(x)
    });
    dialog2.showModal();
    //dialog2.close();**/
//return JSON.stringify(toolboxValue);
//});
