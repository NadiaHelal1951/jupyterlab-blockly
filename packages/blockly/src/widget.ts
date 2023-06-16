import {
  DocumentRegistry,
  DocumentWidget,
  DocumentModel
} from '@jupyterlab/docregistry';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { notebookIcon } from '@jupyterlab/ui-components';

import { SplitPanel } from '@lumino/widgets';
import { Signal } from '@lumino/signaling';
import Blockly from 'blockly';
import { BlocklyLayout } from './layout';
import { BlocklyManager } from './manager';
import {
  BlocklyButton,
  SelectGenerator,
  //SelectToolbox,
  Spacer
} from './toolbar';
import { CodeCell } from '@jupyterlab/cells';
import {
  FlyoutDefinition,
  ToolboxDefinition
} from 'blockly/core/utils/toolbox';
import { defaultToolbox, emptyToolbox } from './utils';

/**
 * DocumentWidget: widget that represents the view or editor for a file type.
 */
let customToolbox: any = {
  kind: 'categoryToolbox',
  contents: []
};

export function createToolbox(fileContents, jsonName, colorInput): any {
  const customUserToolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: '',
        colour: '',
        contents: []
      }
    ]
  };

  //console.log('filecontents', fileContents);

  const parsedContents = JSON.parse(fileContents);
  console.log('fileContents', parsedContents);

  const blockName = jsonName.value;
  console.log('blockname', blockName);

  Blockly.defineBlocksWithJsonArray(parsedContents);

  customUserToolbox.contents[0].name = blockName;
  customUserToolbox.contents[0].colour = colorInput.value;

  for (const block of parsedContents) {
    const blockType = block.type;
    addBlock(parsedContents, blockType, customUserToolbox);
    console.log('blockType', blockType);
  }

  return customUserToolbox;
}

export function addBlock(
  parsedContents: any,
  parsedContentstype: any,
  customUserToolbox
): any {
  console.log('blockDefinition', parsedContents);

  const block = {
    kind: 'block',
    type: parsedContentstype
  };
  customUserToolbox.contents[0].contents.push(block);

  // Optionally, you can log the updated customUserToolbox for verification
  console.log('Updated customUserToolbox:', customUserToolbox);
  return customUserToolbox;
}

export let s: string;

export class BlocklyEditor extends DocumentWidget<BlocklyPanel, DocumentModel> {
  constructor(options: BlocklyEditor.IOptions) {
    super(options);
    // Loading the ITranslator

    // Create and add a button to the toolbar to execute
    // the code.
    const button = new BlocklyButton({
      label: '',
      icon: notebookIcon,
      className: 'jp-blockly-runButton',
      onClick: () => {
        s = (this.content.layout as BlocklyLayout).run();
        // @ts-expect-error Since its not found for some reason
        window.transferCallback?.(s);
      },
      tooltip: 'Blocks to Code'
    });

    const customizebutton = new BlocklyButton({
      label: 'Customize Blocks',
      onClick() {
        new Promise<ToolboxDefinition | FlyoutDefinition>(resolve => {
          const dialog = document.createElement('dialog');
          dialog.style.backgroundColor = '#597ED5';
          dialog.style.borderRadius = '10px';
          dialog.style.position = 'fixed';
          dialog.style.top = '50%';
          dialog.style.left = '50%';
          dialog.style.transform = 'translate(-50%, -50%)';
          dialog.style.padding = '20px';
          dialog.style.zIndex = '9999';

          const title = document.createElement('h1');
          title.textContent =
            "Please write the Name you'd like for your Custom Blocks. Choose a method to insert their JSON data.";
          title.style.fontSize = '20px';
          title.style.marginBottom = '10px';
          title.style.textAlign = 'center';
          title.style.color = 'white';

          dialog.appendChild(title);

          const jsonLabel = document.createElement('label');
          jsonLabel.innerText =
            "Choose the desired name of the custom blocks' toolbox:";
          jsonLabel.style.color = 'white';
          jsonLabel.setAttribute('for', 'jsonName');

          const jsonName = document.createElement('textarea');
          jsonName.style.width = '95%';
          jsonName.style.height = '20px';
          jsonName.style.borderRadius = '10px';
          jsonName.style.backgroundColor = '#89C5E4';
          jsonName.style.padding = '10px';
          jsonName.style.resize = 'none';

          dialog.appendChild(jsonLabel);
          dialog.appendChild(jsonName);

          const colorLabel = document.createElement('label');
          colorLabel.innerText =
            "Choose the desired color of the custom blocks' toolbox:";
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

          dialog.appendChild(colorLabel);
          dialog.appendChild(colorInput);

          const uploadButton = document.createElement('button');
          uploadButton.textContent = 'Upload JSON File';
          uploadButton.style.backgroundColor = '#4CAF50';
          uploadButton.style.borderRadius = '5px';
          uploadButton.style.border = 'none';
          uploadButton.style.color = 'white';
          uploadButton.style.padding = '10px';
          uploadButton.style.cursor = 'pointer';
          uploadButton.style.marginTop = '10px';
          uploadButton.style.marginRight = '5px';

          dialog.appendChild(uploadButton);

          /**const spacingElement = document.createElement('div');
          spacingElement.style.width = '10px'; // Adjust the height for the desired spacing
          dialog.appendChild(spacingElement);**/

          uploadButton.addEventListener('click', () => {
            try {
              const inputElement = document.createElement('input');
              inputElement.type = 'file';
              inputElement.accept = '.json';

              inputElement.addEventListener('change', () => {
                const file = inputElement.files[0];
                const reader = new FileReader();

                reader.onload = event => {
                  try {
                    const fileContents = event.target.result as string;
                    const novel = createToolbox(
                      fileContents,
                      jsonName,
                      colorInput
                    );
                    customToolbox = {
                      kind: customToolbox.kind,
                      contents: customToolbox.contents.concat(novel.contents)
                    };
                    options.manager.registerToolbox('default', customToolbox);
                    resolve(customToolbox);
                    dialog.close();
                  } catch (e) {
                    console.error(e);
                    alert(
                      'Invalid format, please make sure the file is .json and try again.'
                    );
                    resolve(null);
                  }
                };

                reader.readAsText(file);
              });

              inputElement.click();
            } catch (e) {
              console.error(e);
              alert('Invalid format, please try again.');
            }
          });

          const submitButton = document.createElement('button');
          submitButton.textContent = 'Enter JSON File';
          submitButton.style.backgroundColor = '#4CAF50';
          submitButton.style.borderRadius = '5px';
          submitButton.style.border = 'none';
          submitButton.style.color = 'white';
          submitButton.style.padding = '10px';
          submitButton.style.cursor = 'pointer';
          submitButton.style.marginTop = '10px';

          dialog.appendChild(submitButton);

          submitButton.addEventListener('click', () => {
            dialog.close();
            const dialog2 = document.createElement('dialog');
            dialog2.style.backgroundColor = '#597ED5';
            dialog2.style.borderRadius = '10px';
            dialog2.style.position = 'fixed';
            dialog2.style.top = '50%';
            dialog2.style.left = '50%';
            dialog2.style.transform = 'translate(-50%, -50%)';
            dialog2.style.padding = '20px';
            dialog2.style.zIndex = '9999';

            const title2 = document.createElement('h1');
            title2.textContent = 'Enter Custom Blocks JSON data please.';
            title2.style.fontSize = '20px';
            title2.style.marginBottom = '10px';
            title2.style.textAlign = 'center';
            title2.style.color = 'white';

            dialog2.appendChild(title2);

            const jsonInput = document.createElement('textarea');
            jsonInput.placeholder =
              'Please make sure it follows custom block API\nE.g. [{"type"{..},"message0"{..},..}];';
            jsonInput.style.width = '95%';
            jsonInput.style.height = '200px';
            jsonInput.style.borderRadius = '10px';
            jsonInput.style.backgroundColor = '#89C5E4';
            jsonInput.style.padding = '10px';
            jsonInput.style.resize = 'none';

            dialog2.appendChild(jsonInput);

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Submit JSON File';
            doneButton.style.backgroundColor = '#4CAF50';
            doneButton.style.borderRadius = '5px';
            doneButton.style.border = 'none';
            doneButton.style.color = 'white';
            doneButton.style.padding = '10px';
            doneButton.style.cursor = 'pointer';
            doneButton.style.marginTop = '10px';

            dialog2.appendChild(doneButton);

            doneButton.addEventListener('click', () => {
              try {
                const fileContents = jsonInput.value as string;
                const novel = createToolbox(fileContents, jsonName, colorInput);
                customToolbox = {
                  kind: customToolbox.kind,
                  contents: customToolbox.contents.concat(novel.contents)
                };
                options.manager.registerToolbox('default', customToolbox);
                dialog2.close();
                //dialog.close();
                resolve(fileContents);
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

            document.body.appendChild(dialog2);
            dialog2.showModal();
          });

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

          dialog.appendChild(cancelButton);

          cancelButton.addEventListener('click', () => {
            dialog.close();
            resolve('');
          });

          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }
    });

    const clearallButton = new BlocklyButton({
      label: 'Clear Current Toolbox',
      onClick() {
        customToolbox = {
          kind: 'categoryToolbox',
          contents: []
        };
        options.manager.registerToolbox('default', emptyToolbox);
      }
    });

    const insertbutton = new BlocklyButton({
      label: 'Insert Toolbox',
      onClick() {
        new Promise<ToolboxDefinition | FlyoutDefinition>(resolve => {
          let userInput: ToolboxDefinition | null | FlyoutDefinition = null;
          const dialog = document.createElement('dialog');
          dialog.style.backgroundColor = '#597ED5';
          dialog.style.borderRadius = '10px';
          dialog.style.position = 'fixed';
          dialog.style.top = '50%';
          dialog.style.left = '50%';
          dialog.style.transform = 'translate(-50%, -50%)';
          dialog.style.padding = '20px';
          dialog.style.zIndex = '9999';

          const title = document.createElement('h1');
          title.textContent =
            'Choose one of the following options. Press "Default" if you want default toolbox';
          title.style.fontSize = '20px';
          title.style.marginBottom = '10px';
          title.style.textAlign = 'center';
          title.style.color = 'white';

          dialog.appendChild(title);

          const uploadButton = document.createElement('button');
          uploadButton.textContent = 'Upload JSON File';
          uploadButton.style.backgroundColor = '#4CAF50';
          uploadButton.style.borderRadius = '5px';
          uploadButton.style.border = 'none';
          uploadButton.style.color = 'white';
          uploadButton.style.padding = '10px';
          uploadButton.style.cursor = 'pointer';
          uploadButton.style.marginTop = '10px';
          uploadButton.style.marginRight = '5px';

          dialog.appendChild(uploadButton);

          const submitButton = document.createElement('button');
          submitButton.textContent = 'Enter JSON File';
          submitButton.style.backgroundColor = '#4CAF50';
          submitButton.style.borderRadius = '5px';
          submitButton.style.border = 'none';
          submitButton.style.color = 'white';
          submitButton.style.padding = '10px';
          submitButton.style.cursor = 'pointer';
          submitButton.style.marginTop = '10px';

          dialog.appendChild(submitButton);

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

          dialog.appendChild(defaultButton);

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

          dialog.appendChild(cancelButton);

          uploadButton.addEventListener('click', () => {
            try {
              const inputElement = document.createElement('input');
              inputElement.type = 'file';
              inputElement.accept = '.json';

              inputElement.addEventListener('change', () => {
                const file = inputElement.files[0];
                const reader = new FileReader();

                reader.onload = event => {
                  try {
                    const fileContents = event.target.result as string;
                    const userInput = eval(`(${fileContents})`);
                    options.manager.registerToolbox('default', userInput);
                    resolve(userInput);
                    dialog.close();
                  } catch (e) {
                    console.error(e);
                    alert(
                      'Invalid format, please make sure the file is .json and try again.'
                    );
                    resolve(null);
                  }
                };

                reader.readAsText(file);
              });

              inputElement.click();
            } catch (e) {
              console.error(e);
              alert('Invalid format, please try again.');
            }
          });

          submitButton.addEventListener('click', () => {
            dialog.close();
            const dialog2 = document.createElement('dialog');
            dialog2.style.backgroundColor = '#597ED5';
            dialog2.style.borderRadius = '10px';
            dialog2.style.position = 'fixed';
            dialog2.style.top = '50%';
            dialog2.style.left = '50%';
            dialog2.style.transform = 'translate(-50%, -50%)';
            dialog2.style.padding = '20px';
            dialog2.style.zIndex = '9999';

            const title2 = document.createElement('h1');
            title2.textContent = 'Enter Toolbox JSON data please.';
            title2.style.fontSize = '20px';
            title2.style.marginBottom = '10px';
            title2.style.textAlign = 'center';
            title2.style.color = 'white';

            dialog2.appendChild(title2);

            const jsonInput = document.createElement('textarea');
            jsonInput.placeholder =
              'Please make sure it follows toolbox API\nE.g.{"kind"{..}"contents"[{..}]};';
            jsonInput.style.width = '95%';
            jsonInput.style.height = '200px';
            jsonInput.style.borderRadius = '10px';
            jsonInput.style.backgroundColor = '#89C5E4';
            jsonInput.style.padding = '10px';
            jsonInput.style.resize = 'none';

            dialog2.appendChild(jsonInput);

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Submit JSON File';
            doneButton.style.backgroundColor = '#4CAF50';
            doneButton.style.borderRadius = '5px';
            doneButton.style.border = 'none';
            doneButton.style.color = 'white';
            doneButton.style.padding = '10px';
            doneButton.style.cursor = 'pointer';
            doneButton.style.marginTop = '10px';

            dialog2.appendChild(doneButton);

            doneButton.addEventListener('click', () => {
              try {
                const inputString = jsonInput.value;
                userInput = eval(`(${inputString})`);
                options.manager.registerToolbox('default', userInput);
                dialog2.close();
                resolve(userInput);
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

            document.body.appendChild(dialog2);
            dialog2.showModal();
          });

          defaultButton.addEventListener('click', () => {
            userInput = defaultToolbox as any;
            options.manager.registerToolbox('default', userInput);
            //options.manager.registry.registerBlocks
            dialog.close();
            resolve(defaultToolbox);
          });

          cancelButton.addEventListener('click', () => {
            dialog.close();
            resolve('');
          });

          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }
      //,tooltip: 'Insert Toolbox'
    });

    this.toolbar.addItem('run', button);
    this.toolbar.addItem('Insert', insertbutton);
    //this.toolbar.addItem('spacer', new Spacer());
    this.toolbar.addItem('Clear Current Toolbox', clearallButton);
    this.toolbar.addItem('spacer', new Spacer());
    /**this.toolbar.addItem(
      'toolbox',
      new SelectToolbox({
        label: 'Toolbox',
        tooltip: 'Select tollbox',
        manager: options.manager
      })
    );**/
    this.toolbar.addItem('Customize', customizebutton);
    this.toolbar.addItem(
      'generator',
      new SelectGenerator({
        label: 'Kernel',
        tooltip: 'Select kernel',
        manager: options.manager
      })
    );
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    this.content.dispose();
    super.dispose();
  }
}

export namespace BlocklyEditor {
  export interface IOptions
    extends DocumentWidget.IOptions<BlocklyPanel, DocumentModel> {
    manager: BlocklyManager;
  }
}

/**
 * Widget that contains the main view of the DocumentWidget.
 */
export class BlocklyPanel extends SplitPanel {
  private _context: DocumentRegistry.IContext<DocumentModel>;
  private _rendermime: IRenderMimeRegistry;

  /**
   * Construct a `BlocklyPanel`.
   *
   * @param context - The documents context.
   */
  constructor(
    context: DocumentRegistry.IContext<DocumentModel>,
    manager: BlocklyManager,
    rendermime: IRenderMimeRegistry
  ) {
    super({
      layout: new BlocklyLayout(manager, context.sessionContext, rendermime)
    });
    this.addClass('jp-BlocklyPanel');
    this._context = context;
    this._rendermime = rendermime;

    // Load the content of the file when the context is ready
    this._context.ready.then(() => this._load());
    // Connect to the save signal
    this._context.saveState.connect(this._onSave, this);
  }

  /*
   * The code cell.
   */
  get cell(): CodeCell {
    return (this.layout as BlocklyLayout).cell;
  }

  /*
   * The rendermime instance used in the code cell.
   */
  get rendermime(): IRenderMimeRegistry {
    return this._rendermime;
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    Signal.clearData(this);
    super.dispose();
  }

  private _load(): void {
    // Loading the content of the document into the workspace
    const content = this._context.model.toJSON() as any as Blockly.Workspace;
    (this.layout as BlocklyLayout).workspace = content;
  }

  private _onSave(
    sender: DocumentRegistry.IContext<DocumentModel>,
    state: DocumentRegistry.SaveState
  ): void {
    if (state === 'started') {
      const workspace = (this.layout as BlocklyLayout).workspace;
      this._context.model.fromJSON(workspace as any);
    }
  }
}
