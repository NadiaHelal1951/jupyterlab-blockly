import * as Blockly from 'blockly';
import { ToolboxDefinition } from 'blockly/core/utils/toolbox';
//import { ToolboxDefinition } from 'blockly/core/utils/toolbox';
//import { see } from './registry';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { luaGenerator } from 'blockly/lua';
import { phpGenerator } from 'blockly/php';
import { dartGenerator } from 'blockly/dart';

export const defaultToolbox = {
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

export const emptyToolbox: ToolboxDefinition = {
  kind: 'categoryToolbox',
  contents: []
};
function addcustomBlockButton(
  dialog2,
  doneButton,
  addbutton,
  localCancelButton,
  options
): any {
  const title = document.createElement('h2');
  title.textContent = "Enter new Block's data please.";
  title.style.marginTop = '10';
  title.style.textAlign = 'center';
  title.style.color = 'white';

  dialog2.appendChild(title);

  const typeLabel = document.createElement('label');
  typeLabel.innerText = 'Insert Block type:';
  typeLabel.style.color = 'white';
  typeLabel.setAttribute('for', 'typeInput');

  const typeInput = document.createElement('textarea');
  typeInput.style.width = '95%';
  typeInput.style.height = '10px';
  typeInput.style.borderRadius = '10px';
  typeInput.style.backgroundColor = '#89C5E4';
  typeInput.style.padding = '10px';
  typeInput.style.resize = 'none';

  dialog2.appendChild(typeLabel);
  dialog2.appendChild(typeInput);

  const message0Label = document.createElement('label');
  message0Label.innerText = "Insert Block's message0:";
  message0Label.style.color = 'white';
  message0Label.setAttribute('for', 'message0Input');

  const message0Input = document.createElement('textarea');
  message0Input.style.width = '95%';
  message0Input.style.height = '10px';
  message0Input.style.borderRadius = '10px';
  message0Input.style.backgroundColor = '#89C5E4';
  message0Input.style.padding = '10px';
  message0Input.style.resize = 'none';

  dialog2.appendChild(message0Label);
  dialog2.appendChild(message0Input);

  const arg0Label = document.createElement('label');
  arg0Label.innerText = "Insert Block's args0:";
  arg0Label.style.color = 'white';
  arg0Label.setAttribute('for', 'arg0Input');

  const arg0Input = document.createElement('textarea');
  arg0Input.style.width = '95%';
  arg0Input.style.height = '10px';
  arg0Input.style.borderRadius = '10px';
  arg0Input.style.backgroundColor = '#89C5E4';
  arg0Input.style.padding = '10px';
  arg0Input.style.resize = 'none';

  dialog2.appendChild(arg0Label);
  dialog2.appendChild(arg0Input);

  const colorLabel = document.createElement('label');
  colorLabel.innerText = 'Choose Block color:';
  colorLabel.style.color = 'white';
  colorLabel.setAttribute('for', 'colorInput');

  const colorInput = document.createElement('input');
  colorInput.id = 'colorInput';
  colorInput.type = 'color';
  colorInput.style.width = '95%';
  colorInput.style.height = '20px';
  colorInput.style.borderRadius = '10px';
  colorInput.style.padding = '10px';
  colorInput.style.resize = 'none';

  dialog2.appendChild(colorLabel);
  dialog2.appendChild(colorInput);

  const tooltipLabel = document.createElement('label');
  tooltipLabel.innerText = "Insert Block's tooltip:";
  tooltipLabel.style.color = 'white';
  tooltipLabel.setAttribute('for', 'tooltipInput');

  const tooltipInput = document.createElement('textarea');
  tooltipInput.style.width = '95%';
  tooltipInput.style.height = '10px';
  tooltipInput.style.borderRadius = '10px';
  tooltipInput.style.backgroundColor = '#89C5E4';
  tooltipInput.style.padding = '10px';
  tooltipInput.style.resize = 'none';

  dialog2.appendChild(tooltipLabel);
  dialog2.appendChild(tooltipInput);

  const outputLabel = document.createElement('label');
  outputLabel.innerText = "Insert Block's output:";
  outputLabel.style.color = 'white';
  outputLabel.setAttribute('for', 'outputInput');

  const outputInput = document.createElement('textarea');
  outputInput.style.width = '95%';
  outputInput.style.height = '10px';
  outputInput.style.borderRadius = '10px';
  outputInput.style.backgroundColor = '#89C5E4';
  outputInput.style.padding = '10px';
  outputInput.style.resize = 'none';

  dialog2.appendChild(outputLabel);
  dialog2.appendChild(outputInput);

  const inputsInlineLabel = document.createElement('label');
  inputsInlineLabel.innerText = "Insert Block's inputsInline as true or false:";
  inputsInlineLabel.style.color = 'white';
  inputsInlineLabel.setAttribute('for', 'inputsInlineInput');

  const inputsInlineInput = document.createElement('textarea');
  inputsInlineInput.style.width = '95%';
  inputsInlineInput.style.height = '10px';
  inputsInlineInput.style.borderRadius = '10px';
  inputsInlineInput.style.backgroundColor = '#89C5E4';
  inputsInlineInput.style.padding = '10px';
  inputsInlineInput.style.resize = 'none';

  dialog2.appendChild(inputsInlineLabel);
  dialog2.appendChild(inputsInlineInput);

  const previousStatementLabel = document.createElement('label');
  previousStatementLabel.innerText = "Insert Block's previous statement:";
  previousStatementLabel.style.color = 'white';
  previousStatementLabel.setAttribute('for', 'previousStatementInput');

  const previousStatementInput = document.createElement('textarea');
  previousStatementInput.style.width = '95%';
  previousStatementInput.style.height = '10px';
  previousStatementInput.style.borderRadius = '10px';
  previousStatementInput.style.backgroundColor = '#89C5E4';
  previousStatementInput.style.padding = '10px';
  previousStatementInput.style.resize = 'none';

  dialog2.appendChild(previousStatementLabel);
  dialog2.appendChild(previousStatementInput);

  const nextStatementLabel = document.createElement('label');
  nextStatementLabel.innerText = "Insert Block's next statement:";
  nextStatementLabel.style.color = 'white';
  nextStatementLabel.setAttribute('for', 'nextStatementInput');

  const nextStatementInput = document.createElement('textarea');
  nextStatementInput.style.width = '95%';
  nextStatementInput.style.height = '10px';
  nextStatementInput.style.borderRadius = '10px';
  nextStatementInput.style.backgroundColor = '#89C5E4';
  nextStatementInput.style.padding = '10px';
  nextStatementInput.style.resize = 'none';

  dialog2.appendChild(nextStatementLabel);
  dialog2.appendChild(nextStatementInput);
  dialog2.appendChild(doneButton);
  dialog2.appendChild(addbutton);
  dialog2.appendChild(localCancelButton);

  doneButton.addEventListener('click', () => {
    try {
      /**insertedToolbox = {
        kind: insertedToolbox.kind,
        contents: insertedToolbox.contents.concat(x.contents[0].contents)
      };**/
      addcustomToolbox(
        typeInput.value,
        message0Input.value,
        arg0Input.value,
        colorInput.value,
        inputsInlineInput.value,
        tooltipInput.value,
        previousStatementInput.value,
        nextStatementInput.value
      );
      //options.manager.registerToolbox('default', insertedToolbox);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });
}

function addcustomToolbox(
  type2,
  message02,
  args02,
  color,
  input,
  tooltip2,
  prev,
  next
) {
  const customblocksToolbox = {
    type: type2,
    message0: message02,
    args0: JSON.parse(args02),
    colour: color,
    inputsInline: input,
    tooltip: tooltip2,
    previousStatement: prev,
    nextStatement: next
  };

  const x: string = JSON.stringify(customblocksToolbox);
  console.log('x: ' + x);

  Blockly.defineBlocksWithJsonArray([JSON.parse(x)]);
  //return customblocksToolbox;

  pythonGenerator[customblocksToolbox.type] = function (block) {
    // Generate code recursively for connected blocks
    const childrenCode = block.childBlocks_
      .map(childBlock => pythonGenerator.blockToCode(childBlock))
      .join('\n');

    // Combine the code of the current block and its children
    const code = `print('${block.type}')\n${childrenCode}`;

    return code;
  };

  luaGenerator[customblocksToolbox.type] = function (block) {
    // Generate code recursively for connected blocks
    const childrenCode = block.childBlocks_
      .map(childBlock => luaGenerator.blockToCode(childBlock))
      .join('\n');

    // Combine the code of the current block and its children
    const code = `print("${block.type}")\n${childrenCode}`;

    return code;
  };

  javascriptGenerator[customblocksToolbox.type] = function (block) {
    // Generate code recursively for connected blocks
    const childrenCode = block.childBlocks_
      .map(childBlock => javascriptGenerator.blockToCode(childBlock))
      .join('\n');

    // Combine the code of the current block and its children
    const code = `console.log('${block.type}');\n${childrenCode}`;

    return code;
  };

  phpGenerator[customblocksToolbox.type] = function (block) {
    // Generate code recursively for connected blocks
    const childrenCode = block.childBlocks_
      .map(childBlock => phpGenerator.blockToCode(childBlock))
      .join('\n');

    // Combine the code of the current block and its children
    const code = `echo '${block.type}';\n${childrenCode}`;

    return code;
  };

  dartGenerator[customblocksToolbox.type] = function (block) {
    // Generate code recursively for connected blocks
    const childrenCode = block.childBlocks_
      .map(childBlock => dartGenerator.blockToCode(childBlock))
      .join('\n');

    // Combine the code of the current block and its children
    const code = `print('${block.type}');\n${childrenCode}`;

    return code;
  };
}

export function createcustomblocksToolbox(
  dialog2: any,
  options: any,
  resolve: any,
  xmlName
) {
  const title = document.createElement('h2');
  title.textContent = 'Enter Custom Blocks data please.';
  title.style.marginTop = '0';
  title.style.textAlign = 'center';
  title.style.color = 'white';

  dialog2.appendChild(title);
  //type/message0/args0/colour/output/tooltip/inputsInline/previousStatement/nextStatement

  const typeLabel = document.createElement('label');
  typeLabel.innerText = 'Insert Block type:';
  typeLabel.style.color = 'white';
  typeLabel.setAttribute('for', 'typeInput');

  const typeInput = document.createElement('textarea');
  typeInput.style.width = '95%';
  typeInput.style.height = '10px';
  typeInput.style.borderRadius = '10px';
  typeInput.style.backgroundColor = '#89C5E4';
  typeInput.style.padding = '10px';
  typeInput.style.resize = 'none';

  dialog2.appendChild(typeLabel);
  dialog2.appendChild(typeInput);

  const message0Label = document.createElement('label');
  message0Label.innerText = "Insert Block's message0:";
  message0Label.style.color = 'white';
  message0Label.setAttribute('for', 'message0Input');

  const message0Input = document.createElement('textarea');
  message0Input.style.width = '95%';
  message0Input.style.height = '10px';
  message0Input.style.borderRadius = '10px';
  message0Input.style.backgroundColor = '#89C5E4';
  message0Input.style.padding = '10px';
  message0Input.style.resize = 'none';

  dialog2.appendChild(message0Label);
  dialog2.appendChild(message0Input);

  const arg0Label = document.createElement('label');
  arg0Label.innerText = "Insert Block's args0:";
  arg0Label.style.color = 'white';
  arg0Label.setAttribute('for', 'arg0Input');

  const arg0Input = document.createElement('textarea');
  arg0Input.style.width = '95%';
  arg0Input.style.height = '10px';
  arg0Input.style.borderRadius = '10px';
  arg0Input.style.backgroundColor = '#89C5E4';
  arg0Input.style.padding = '10px';
  arg0Input.style.resize = 'none';

  dialog2.appendChild(arg0Label);
  dialog2.appendChild(arg0Input);

  const colorLabel = document.createElement('label');
  colorLabel.innerText = 'Choose Block color:';
  colorLabel.style.color = 'white';
  colorLabel.setAttribute('for', 'colorInput');

  const colorInput = document.createElement('input');
  colorInput.id = 'colorInput';
  colorInput.type = 'color';
  colorInput.style.width = '95%';
  colorInput.style.height = '20px';
  colorInput.style.borderRadius = '10px';
  colorInput.style.backgroundColor = '#89C5E4';
  colorInput.style.padding = '10px';
  colorInput.style.resize = 'none';

  dialog2.appendChild(colorLabel);
  dialog2.appendChild(colorInput);

  const tooltipLabel = document.createElement('label');
  tooltipLabel.innerText = "Insert Block's tooltip:";
  tooltipLabel.style.color = 'white';
  tooltipLabel.setAttribute('for', 'tooltipInput');

  const tooltipInput = document.createElement('textarea');
  tooltipInput.style.width = '95%';
  tooltipInput.style.height = '10px';
  tooltipInput.style.borderRadius = '10px';
  tooltipInput.style.backgroundColor = '#89C5E4';
  tooltipInput.style.padding = '10px';
  tooltipInput.style.resize = 'none';

  dialog2.appendChild(tooltipLabel);
  dialog2.appendChild(tooltipInput);

  const outputLabel = document.createElement('label');
  outputLabel.innerText = "Insert Block's output:";
  outputLabel.style.color = 'white';
  outputLabel.setAttribute('for', 'outputInput');

  const outputInput = document.createElement('textarea');
  outputInput.style.width = '95%';
  outputInput.style.height = '10px';
  outputInput.style.borderRadius = '10px';
  outputInput.style.backgroundColor = '#89C5E4';
  outputInput.style.padding = '10px';
  outputInput.style.resize = 'none';

  dialog2.appendChild(outputLabel);
  dialog2.appendChild(outputInput);

  const inputsInlineLabel = document.createElement('label');
  inputsInlineLabel.innerText = "Insert Block's inputsInline as true or false:";
  inputsInlineLabel.style.color = 'white';
  inputsInlineLabel.setAttribute('for', 'inputsInlineInput');

  const inputsInlineInput = document.createElement('textarea');
  inputsInlineInput.style.width = '95%';
  inputsInlineInput.style.height = '10px';
  inputsInlineInput.style.borderRadius = '10px';
  inputsInlineInput.style.backgroundColor = '#89C5E4';
  inputsInlineInput.style.padding = '10px';
  inputsInlineInput.style.resize = 'none';

  dialog2.appendChild(inputsInlineLabel);
  dialog2.appendChild(inputsInlineInput);

  const previousStatementLabel = document.createElement('label');
  previousStatementLabel.innerText = "Insert Block's previous statement:";
  previousStatementLabel.style.color = 'white';
  previousStatementLabel.setAttribute('for', 'previousStatementInput');

  const previousStatementInput = document.createElement('textarea');
  previousStatementInput.style.width = '95%';
  previousStatementInput.style.height = '10px';
  previousStatementInput.style.borderRadius = '10px';
  previousStatementInput.style.backgroundColor = '#89C5E4';
  previousStatementInput.style.padding = '10px';
  previousStatementInput.style.resize = 'none';

  dialog2.appendChild(previousStatementLabel);
  dialog2.appendChild(previousStatementInput);

  const nextStatementLabel = document.createElement('label');
  nextStatementLabel.innerText = "Insert Block's next statement:";
  nextStatementLabel.style.color = 'white';
  nextStatementLabel.setAttribute('for', 'nextStatementInput');

  const nextStatementInput = document.createElement('textarea');
  nextStatementInput.style.width = '95%';
  nextStatementInput.style.height = '10px';
  nextStatementInput.style.borderRadius = '10px';
  nextStatementInput.style.backgroundColor = '#89C5E4';
  nextStatementInput.style.padding = '10px';
  nextStatementInput.style.resize = 'none';

  dialog2.appendChild(nextStatementLabel);
  dialog2.appendChild(nextStatementInput);

  const doneButton = document.createElement('button');
  doneButton.textContent = 'Submit';
  doneButton.style.backgroundColor = '#4CAF50';
  doneButton.style.borderRadius = '5px';
  doneButton.style.border = 'none';
  doneButton.style.color = 'white';
  doneButton.style.padding = '10px';
  doneButton.style.cursor = 'pointer';
  doneButton.style.marginTop = '10px';
  doneButton.style.marginRight = '10px';

  dialog2.appendChild(doneButton);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Block';
  addButton.style.backgroundColor = '#4CAF50';
  addButton.style.borderRadius = '5px';
  addButton.style.border = 'none';
  addButton.style.color = 'white';
  addButton.style.padding = '10px';
  addButton.style.cursor = 'pointer';
  addButton.style.marginTop = '10px';
  addButton.style.marginRight = '5px';

  dialog2.appendChild(addButton);

  doneButton.addEventListener('click', () => {
    try {
      const xmlString = xmlName.value as string;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = xmlString;

      const meta = document.createElement('meta');
      meta.setAttribute('charset', 'utf-8');

      const script = document.createElement('script');
      script.setAttribute('src', 'https://unpkg.com/blockly/blockly.min.js');

      const div = document.createElement('div');
      div.id = 'blocklyDiv';
      div.style.height = '480px';
      div.style.width = '800px';

      const toolbox = tempDiv.querySelector('#toolbox');

      document.head.appendChild(meta);
      document.head.appendChild(script);
      document.body.appendChild(div);

      addcustomToolbox(
        typeInput.value,
        message0Input.value,
        arg0Input.value,
        colorInput.value,
        inputsInlineInput.value,
        tooltipInput.value,
        previousStatementInput.value,
        nextStatementInput.value
      );
      // Append the elements to the document's head or body as needed

      const toolboxXmlString = new XMLSerializer().serializeToString(toolbox);

      options.manager.registerToolbox(
        'default',
        toolboxXmlString as ToolboxDefinition
      );
      resolve(toolboxXmlString as ToolboxDefinition);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  addButton.addEventListener('click', () => {
    try {
      dialog2.removeChild(doneButton);
      dialog2.removeChild(addButton);
      dialog2.removeChild(localCancelButton);
      const newtoolbox = addcustomBlockButton(
        dialog2,
        doneButton,
        addButton,
        localCancelButton,
        options
      );

      //options.manager.registerToolbox('default', insertedToolbox);
      resolve(newtoolbox);
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  const localCancelButton = document.createElement('button');
  localCancelButton.textContent = 'Cancel';
  localCancelButton.style.backgroundColor = '#DF4D4D';
  localCancelButton.style.borderRadius = '5px';
  localCancelButton.style.border = 'none';
  localCancelButton.style.color = 'white';
  localCancelButton.style.padding = '10px';
  localCancelButton.style.cursor = 'pointer';
  localCancelButton.style.marginLeft = '5px';
  localCancelButton.style.marginTop = '10px';

  dialog2.appendChild(localCancelButton);

  localCancelButton.addEventListener('click', () => {
    dialog2.close();
    resolve('');
  });
}

export function customexecute(options: any): ToolboxDefinition {
  let userInput: ToolboxDefinition | null = null;
  const dialog2 = document.createElement('dialog');
  dialog2.style.backgroundColor = '#597ED5';
  dialog2.style.borderRadius = '10px';
  dialog2.style.position = 'fixed';
  dialog2.style.top = '10%'; // Adjust the top position as needed
  dialog2.style.left = '50%';
  dialog2.style.transform = 'translateX(-50%)';
  dialog2.style.padding = '20px';
  dialog2.style.zIndex = '9999';

  // Set the width and height to fit most of the screen
  dialog2.style.width = '50%';
  dialog2.style.height = '50%';

  const title2 = document.createElement('h2');
  title2.textContent = 'Please choose a custom block.';
  //title2.style.fontSize = '20px';
  title2.style.marginTop = '10px';
  title2.style.textAlign = 'center';
  title2.style.color = 'white';

  const nameLabel = document.createElement('label');
  nameLabel.innerText = 'Create the name of the toolbox here:';
  nameLabel.style.color = 'white';
  nameLabel.setAttribute('for', 'nameInput');

  const nameInput = document.createElement('textarea');
  nameInput.style.width = '100%';
  nameInput.style.height = '25px';
  nameInput.style.borderRadius = '10px';
  nameInput.style.padding = '5px';
  nameInput.style.margin = 'auto';

  const colorLabel = document.createElement('label');
  colorLabel.innerText = 'Choose the desired color of the toolbox:';
  colorLabel.style.color = 'white';
  colorLabel.setAttribute('for', 'colorInput');

  const colorInput = document.createElement('input');
  colorInput.id = 'colorInput';
  colorInput.type = 'color';
  colorInput.style.width = '100%';
  colorInput.style.height = '25px';
  colorInput.style.borderRadius = '10px';
  colorInput.style.padding = '5px';
  colorInput.style.margin = 'auto';

  let customresult = '';

  const choiceLabel = document.createElement('label');
  choiceLabel.innerText = 'Choose either "Variable" or "Procedure":';
  choiceLabel.style.color = 'white';

  const variableButton = document.createElement('button');
  variableButton.textContent = 'Variable';
  variableButton.style.marginRight = '10px';
  variableButton.style.width = '100%';
  variableButton.addEventListener(
    'click',
    handleChoiceClick.bind(null, 'variable')
  );

  const procedureButton = document.createElement('button');
  procedureButton.textContent = 'Procedure';
  procedureButton.style.width = '100%';
  procedureButton.addEventListener(
    'click',
    handleChoiceClick.bind(null, 'procedure')
  );

  function handleChoiceClick(choice: string): void {
    const selectedButton =
      choice === 'variable' ? variableButton : procedureButton;

    selectedButton.style.transform = 'translateX(100%)';
    selectedButton.style.transition = 'transform 0.5s';

    if (choice === 'variable') {
      customresult = 'VARIABLE';
    } else {
      customresult = 'PROCEDURE';
    }
  }

  dialog2.appendChild(title2);

  dialog2.appendChild(nameLabel);
  dialog2.appendChild(nameInput);

  dialog2.appendChild(colorLabel);
  dialog2.appendChild(colorInput);

  dialog2.appendChild(choiceLabel);
  dialog2.appendChild(variableButton);
  dialog2.appendChild(procedureButton);

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.style.backgroundColor = '#4CAF50';
  submitButton.style.borderRadius = '5px';
  submitButton.style.border = 'none';
  submitButton.style.color = 'white';
  submitButton.style.padding = '10px';
  submitButton.style.cursor = 'pointer';
  submitButton.style.marginBottom = '10px';

  document.body.appendChild(dialog2);

  submitButton.addEventListener('click', () => {
    try {
      const inputString = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'CATEGORY',
            colour: colorInput.value,
            custom: customresult,
            name: nameInput.value
          }
        ]
      };

      userInput = inputString;
      insertedToolbox = {
        kind: insertedToolbox.kind,
        contents: insertedToolbox.contents.concat(userInput.contents)
      };
      options.manager.registerToolbox('default', insertedToolbox);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  dialog2.appendChild(submitButton);

  const localCancelButton = document.createElement('button');
  localCancelButton.textContent = 'Cancel';
  localCancelButton.style.backgroundColor = '#DF4D4D';
  localCancelButton.style.borderRadius = '5px';
  localCancelButton.style.border = 'none';
  localCancelButton.style.color = 'white';
  localCancelButton.style.padding = '10px';
  localCancelButton.style.cursor = 'pointer';
  localCancelButton.style.marginLeft = '5px';
  localCancelButton.style.marginTop = '10px';

  dialog2.appendChild(localCancelButton);

  localCancelButton.addEventListener('click', () => {
    dialog2.close();
  });

  dialog2.showModal();

  return userInput;
}

export let insertedToolbox: any = {
  kind: 'categoryToolbox',
  contents: []
};

let customUserToolbox = {
  kind: 'categoryToolbox',
  contents: []
};

function addToolbox(
  name2: string,
  color: string,
  type2: string,
  blockxml2: string
): any {
  customUserToolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'CATEGORY',
        name: name2,
        colour: color,
        contents: [] // Empty array to hold the contents
      }
    ]
  };
  addBlock(type2, blockxml2, customUserToolbox);

  return customUserToolbox;
}

function addBlock(type2: string, blockxml2: string, customUserToolbox): any {
  const block = {
    kind: 'block',
    blockxml: blockxml2,
    type: type2
  };
  customUserToolbox.contents[0].contents.push(block); // Push the new block to the contents array

  return customUserToolbox;
}

function addBlockButton(
  dialog2,
  doneButton,
  addbutton,
  customButton,
  localCancelButton,
  options
): any {
  const contentsLabel = document.createElement('label');
  contentsLabel.innerText = 'Insert block type:';
  contentsLabel.style.color = 'white';
  contentsLabel.setAttribute('for', 'contentsInput');

  const contentsInput = document.createElement('textarea');
  contentsInput.style.width = '95%';
  contentsInput.style.height = '20px';
  contentsInput.style.borderRadius = '10px';
  contentsInput.style.backgroundColor = '#89C5E4';
  contentsInput.style.padding = '10px';
  contentsInput.style.resize = 'none';

  const contentsxmlLabel = document.createElement('label');
  contentsxmlLabel.innerText = 'Insert blockxml (optional):';
  contentsxmlLabel.style.color = 'white';
  contentsxmlLabel.setAttribute('for', 'contentsxml');

  const contentsxml = document.createElement('textarea');
  contentsxml.style.width = '95%';
  contentsxml.style.height = '20px';
  contentsxml.style.borderRadius = '10px';
  contentsxml.style.backgroundColor = '#89C5E4';
  contentsxml.style.padding = '10px';
  contentsxml.style.resize = 'none';

  dialog2.appendChild(contentsLabel);
  dialog2.appendChild(contentsInput);
  dialog2.appendChild(contentsxmlLabel);
  dialog2.appendChild(contentsxml);
  dialog2.appendChild(doneButton);
  dialog2.appendChild(customButton);
  dialog2.appendChild(addbutton);
  dialog2.appendChild(localCancelButton);

  doneButton.addEventListener('click', () => {
    try {
      const x = addBlock(
        contentsInput.value,
        contentsxml.value,
        customUserToolbox
      );
      console.log('newtoolbox: ', x);
      insertedToolbox = {
        kind: insertedToolbox.kind,
        contents: insertedToolbox.contents.concat(x.contents[0].contents)
      };
      console.log('inserted: ', insertedToolbox);
      options.manager.registerToolbox('default', insertedToolbox);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });
}

export function createToolbox(dialog2: any, options: any, resolve: any) {
  const title = document.createElement('h2');
  title.textContent = 'Enter Toolbox data please.';
  title.style.marginTop = '0';
  title.style.textAlign = 'center';
  title.style.color = 'white';

  dialog2.appendChild(title);

  const nameLabel = document.createElement('label');
  nameLabel.innerText = 'Insert Toolbox name:';
  nameLabel.style.color = 'white';
  nameLabel.setAttribute('for', 'nameInput');

  const nameInput = document.createElement('textarea');
  nameInput.style.width = '95%';
  nameInput.style.height = '20px';

  nameInput.style.borderRadius = '10px';
  nameInput.style.backgroundColor = '#89C5E4';
  nameInput.style.padding = '10px';
  nameInput.style.resize = 'none';

  dialog2.appendChild(nameLabel);
  dialog2.appendChild(nameInput);

  const colorLabel = document.createElement('label');
  colorLabel.innerText = 'Choose Toolbox color:';
  colorLabel.style.color = 'white';
  colorLabel.setAttribute('for', 'colorInput');

  const colorInput = document.createElement('input');
  colorInput.id = 'colorInput';
  colorInput.type = 'color';
  colorInput.style.width = '95%';
  colorInput.style.height = '20px';
  colorInput.style.borderRadius = '10px';
  colorInput.style.padding = '10px';
  colorInput.style.resize = 'none';

  dialog2.appendChild(colorLabel);
  dialog2.appendChild(colorInput);

  const contentsLabel = document.createElement('label');
  contentsLabel.innerText = 'Insert block type:';
  contentsLabel.style.color = 'white';
  contentsLabel.setAttribute('for', 'contentsInput');

  const contentsInput = document.createElement('textarea');
  contentsInput.style.width = '95%';
  contentsInput.style.height = '20px';
  contentsInput.style.borderRadius = '10px';
  contentsInput.style.backgroundColor = '#89C5E4';
  contentsInput.style.padding = '10px';
  contentsInput.style.resize = 'none';

  const contentsxmlLabel = document.createElement('label');
  contentsxmlLabel.innerText = 'Insert blockxml(optional):';
  contentsxmlLabel.style.color = 'white';
  contentsxmlLabel.setAttribute('for', 'contentsxml');

  const contentsxml = document.createElement('textarea');
  contentsxml.style.width = '95%';
  contentsxml.style.height = '20px';
  contentsxml.style.borderRadius = '10px';
  contentsxml.style.backgroundColor = '#89C5E4';
  contentsxml.style.padding = '10px';
  contentsxml.style.resize = 'none';

  dialog2.appendChild(contentsLabel);
  dialog2.appendChild(contentsInput);
  dialog2.appendChild(contentsxmlLabel);
  dialog2.appendChild(contentsxml);

  const doneButton = document.createElement('button');
  doneButton.textContent = 'Submit';
  doneButton.style.backgroundColor = '#4CAF50';
  doneButton.style.borderRadius = '5px';
  doneButton.style.border = 'none';
  doneButton.style.color = 'white';
  doneButton.style.padding = '10px';
  doneButton.style.cursor = 'pointer';
  doneButton.style.marginTop = '10px';
  doneButton.style.marginRight = '10px';

  dialog2.appendChild(doneButton);

  const customButton = document.createElement('button');
  customButton.textContent = 'Custom Block';
  customButton.style.backgroundColor = '#4CAF50';
  customButton.style.borderRadius = '5px';
  customButton.style.border = 'none';
  customButton.style.color = 'white';
  customButton.style.padding = '10px';
  customButton.style.cursor = 'pointer';
  customButton.style.marginTop = '10px';
  customButton.style.marginRight = '8px';
  //customButton.style.marginLeft = 'auto';

  dialog2.appendChild(customButton);

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Block';
  addButton.style.backgroundColor = '#4CAF50';
  addButton.style.borderRadius = '5px';
  addButton.style.border = 'none';
  addButton.style.color = 'white';
  addButton.style.padding = '10px';
  addButton.style.cursor = 'pointer';
  addButton.style.marginTop = '10px';
  addButton.style.marginRight = '5px';

  dialog2.appendChild(addButton);

  doneButton.addEventListener('click', () => {
    try {
      const newtoolbox = addToolbox(
        nameInput.value,
        colorInput.value,
        contentsInput.value,
        contentsxml.value
      );
      insertedToolbox = {
        kind: insertedToolbox.kind,
        contents: insertedToolbox.contents.concat(newtoolbox.contents)
      };
      options.manager.registerToolbox('default', insertedToolbox);
      //resolve(newtoolbox);
      dialog2.close();
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  addButton.addEventListener('click', () => {
    try {
      dialog2.removeChild(doneButton);
      dialog2.removeChild(addButton);
      dialog2.removeChild(customButton);
      dialog2.removeChild(localCancelButton);
      const newtoolbox = addBlockButton(
        dialog2,
        doneButton,
        addButton,
        customButton,
        localCancelButton,
        options
      );

      //options.manager.registerToolbox('default', insertedToolbox);
      resolve(newtoolbox);
    } catch (e) {
      console.error(e);
      alert('Invalid format, please try again.');
    }
  });

  customButton.addEventListener('click', () => {
    dialog2.close();
    const userInput2 = customexecute(options);
    resolve(userInput2);
  });

  const localCancelButton = document.createElement('button');
  localCancelButton.textContent = 'Cancel';
  localCancelButton.style.backgroundColor = '#DF4D4D';
  localCancelButton.style.borderRadius = '5px';
  localCancelButton.style.border = 'none';
  localCancelButton.style.color = 'white';
  localCancelButton.style.padding = '10px';
  localCancelButton.style.cursor = 'pointer';
  localCancelButton.style.marginLeft = '5px';
  localCancelButton.style.marginTop = '10px';

  dialog2.appendChild(localCancelButton);

  localCancelButton.addEventListener('click', () => {
    dialog2.close();
    resolve('');
  });
}

// Defining a Blockly Theme in accordance with the current JupyterLab Theme.
const jupyterlab_theme = Blockly.Theme.defineTheme('jupyterlab', {
  name: 'JupyterLab Blockly',
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: 'var(--jp-layout-color0)',
    toolboxBackgroundColour: 'var(--jp-layout-color2)',
    toolboxForegroundColour: 'var(--jp-ui-font-color0)',
    flyoutBackgroundColour: 'var(--jp-border-color2)',
    flyoutForegroundColour: 'var(--jp-layout-color3)',
    flyoutOpacity: 1,
    scrollbarColour: 'var(--jp-border-color0)',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: 'var(--jp-scrollbar-background-color)'
  },
  fontStyle: {
    family: 'var(--jp-ui-font-family)'
  }
});

export const THEME: Blockly.Theme = jupyterlab_theme;
