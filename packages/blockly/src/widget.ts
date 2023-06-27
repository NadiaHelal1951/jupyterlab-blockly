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
import {
  createToolbox,
  defaultToolbox,
  emptyToolbox,
  insertedToolbox,
  inputxml
} from './utils';

/**
 * DocumentWidget: widget that represents the view or editor for a file type.
 */

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
      label: 'Customize Toolbox',
      onClick() {
        new Promise<ToolboxDefinition | FlyoutDefinition>(resolve => {
          const dialog = document.createElement('dialog');
          dialog.style.backgroundColor = '#597ED5';
          dialog.style.borderRadius = '10px';
          dialog.style.position = 'fixed';
          dialog.style.top = '10%'; // Adjust the top position as needed
          dialog.style.left = '50%';
          dialog.style.transform = 'translateX(-50%)';
          dialog.style.padding = '20px';
          dialog.style.zIndex = '9999';

          // Set the width and height to fit most of the screen
          dialog.style.width = '60%';
          dialog.style.height = '60%';

          inputxml(dialog, options, resolve);
          //dialog.appendChild(uploadButton);

          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }
    });

    const clearallButton = new BlocklyButton({
      label: 'Clear Current Toolbox',
      onClick() {
        insertedToolbox.contents.splice(0, insertedToolbox.contents.length);
        options.manager.registerToolbox('default', emptyToolbox);
      }
    });

    const insertbutton = new BlocklyButton({
      label: 'Insert Toolbox',
      onClick() {
        new Promise<any>(resolve => {
          let userInput: ToolboxDefinition | any | FlyoutDefinition = null;
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
          uploadButton.textContent = 'Upload JSON or XML File';
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
          submitButton.textContent = 'Enter Toolbox';
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
              inputElement.accept = '.json, .xml';

              inputElement.addEventListener('change', () => {
                const file = inputElement.files[0];
                const reader = new FileReader();

                reader.onload = event => {
                  try {
                    const fileType = file.type;
                    if (fileType === 'application/json') {
                      const jsonContent = event.target.result as string;
                      const userInput = JSON.parse(jsonContent);
                      console.log('filecontents', userInput.contents);
                      if (userInput.kind === 'flyoutToolbox') {
                        const newtoolbox = {
                          kind: 'categoryToolbox',
                          contents: [
                            {
                              kind: 'category',
                              name: 'FlyoutToolbox',
                              colour: 'black',
                              contents: userInput.contents
                            }
                          ]
                        };
                        console.log('newtoolbox', newtoolbox);
                        options.manager.registerToolbox('default', newtoolbox);
                        resolve(newtoolbox);
                      } else {
                        options.manager.registerToolbox('default', userInput);
                        resolve(userInput);
                      }
                    } else if (
                      fileType === 'text/xml' ||
                      fileType === 'application/xml'
                    ) {
                      const xmlContent = event.target.result as string;

                      const parser = new DOMParser();
                      const xmlDoc = parser.parseFromString(
                        xmlContent,
                        'application/xml'
                      );

                      const rootElement = xmlDoc.documentElement;

                      const blockElements =
                        rootElement.getElementsByTagName('block');

                      let hasUnwrappedBlocks = false;
                      for (let i = 0; i < blockElements.length; i++) {
                        const blockElement = blockElements[i];
                        if (
                          !blockElement.parentElement ||
                          blockElement.parentElement.tagName !== 'category'
                        ) {
                          hasUnwrappedBlocks = true;
                          break;
                        }
                      }

                      if (hasUnwrappedBlocks) {
                        const categoryElement =
                          xmlDoc.createElement('category');
                        categoryElement.setAttribute('name', 'FlyoutToolbox');
                        categoryElement.setAttribute('colour', 'black');

                        while (blockElements.length) {
                          categoryElement.appendChild(blockElements[0]);
                        }

                        rootElement.appendChild(categoryElement);
                      }

                      const modifiedXmlContent =
                        new XMLSerializer().serializeToString(xmlDoc);

                      console.log(modifiedXmlContent);

                      //console.log('XML content:', trimmedXmlContent);
                      options.manager.registerToolbox(
                        'default',
                        modifiedXmlContent as ToolboxDefinition
                      );
                      resolve(modifiedXmlContent as ToolboxDefinition);
                    }

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
            dialog2.style.top = '10%'; // Adjust the top position as needed
            dialog2.style.left = '50%';
            dialog2.style.transform = 'translateX(-50%)';
            dialog2.style.padding = '20px';
            dialog2.style.zIndex = '9999';

            // Set the width and height to fit most of the screen
            dialog2.style.width = '60%';
            dialog2.style.height = '60%';

            createToolbox(dialog2, options, resolve);

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
