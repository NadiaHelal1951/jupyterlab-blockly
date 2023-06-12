import {
  DocumentRegistry,
  DocumentWidget,
  DocumentModel
} from '@jupyterlab/docregistry';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { notebookIcon } from '@jupyterlab/ui-components';

import { SplitPanel } from '@lumino/widgets';
import { Signal } from '@lumino/signaling';

import type Blockly from 'blockly';
//import { INotebookTracker } from '@jupyterlab/notebook';
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
import { Input, defaultToolbox } from './utils';
//import notebookTracker from 'jupyterlab-blockly-extension'
//import { BlocklyRegistry } from './registry';
//import tracenotebook from 'jupyterlab-blockly-extension'

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
      label: 'Customize Blocks',
      onClick() {
        new Promise<ToolboxDefinition | FlyoutDefinition>(resolve => {
          const inputElement = document.createElement('input');
          inputElement.type = 'file';
          inputElement.accept = '.js';

          inputElement.addEventListener('change', () => {
            const file = inputElement.files[0];
            const reader = new FileReader();

            reader.onload = event => {
              try {
                const fileContents = event.target.result as string;
                const userInput = eval(`(${fileContents})`);
                options.manager.registerToolbox('default', userInput);
                resolve(userInput);
              } catch (e) {
                console.error(e);
                alert(
                  'Invalid format, please make sure the file is .js and try again.'
                );
                resolve(null);
              }
            };

            reader.readAsText(file);
          });

          inputElement.click();
        });
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
            'Enter Toolbox JSON data please. Press "Default" if you want default toolbox';
          title.style.fontSize = '20px';
          title.style.marginBottom = '10px';
          title.style.textAlign = 'center';
          title.style.color = 'white';

          dialog.appendChild(title);

          const jsonInput = document.createElement('textarea');
          jsonInput.placeholder =
            'Please make sure it follows toolbox API\nE.g.{"kind"{..}"contents"[{..}]};';
          jsonInput.style.width = '95%';
          jsonInput.style.height = '200px';
          jsonInput.style.borderRadius = '10px';
          jsonInput.style.backgroundColor = '#89C5E4';
          jsonInput.style.padding = '10px';
          jsonInput.style.resize = 'none';

          dialog.appendChild(jsonInput);

          const submitButton = document.createElement('button');
          submitButton.textContent = 'Submit';
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

          submitButton.addEventListener('click', () => {
            try {
              const inputString = jsonInput.value;
              userInput = eval(`(${inputString})`);
              options.manager.registerToolbox('default', userInput);
              dialog.close();
              resolve(userInput);
            } catch (e) {
              console.error(e);
              alert('Invalid format, please try again.');
            }
          });

          defaultButton.addEventListener('click', () => {
            userInput = Input as any;
            options.manager.registerToolbox('default', userInput);
            //options.manager.registry.registerBlocks
            dialog.close();
            resolve(defaultToolbox);
          });

          cancelButton.addEventListener('click', () => {
            dialog.close();
            resolve(userInput);
          });

          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }
      //,tooltip: 'Insert Toolbox'
    });

    this.toolbar.addItem('run', button);
    this.toolbar.addItem('Insert', insertbutton);

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
