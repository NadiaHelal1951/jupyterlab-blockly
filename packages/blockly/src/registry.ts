import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';
import { javascriptGenerator } from 'blockly/javascript';
import { luaGenerator } from 'blockly/lua';
import En from 'blockly/msg/en';
import { IBlocklyRegistry } from './token';
import type { ToolboxDefinition } from 'blockly/core/utils/toolbox';
import { BlockDefinition } from 'blockly/core/blocks';
import { defaultToolbox } from './utils';
//import { BlocklyEditor } from './widget';
//import { BlocklyButton } from './toolbar';

/**
 * BlocklyRegistry is the class that JupyterLab-Blockly exposes
 * to other plugins. This registry allows other plugins to register
 * new Toolboxes, Blocks and Generators that users can use in the
 * Blockly editor.
 */
export class BlocklyRegistry implements IBlocklyRegistry {
  private _generators = new Map<string, Blockly.Generator>();
  private _toolboxes = new Map<string, ToolboxDefinition>();

  private async initialize(): Promise<void> {
    await this.setDefaultToolbox;

    //see(defaultToolbox);
    //return defaultToolbox;
  }

  constructor() {
    this.initialize().then(() => {
      this._toolboxes.set('default', defaultToolbox);

      this._generators.set('python', pythonGenerator);
      this._generators.set('javascript', javascriptGenerator);
      this._generators.set('lua', luaGenerator);

      //see(defaultToolbox);
      //see(this._toolboxes.get('default'));
    });
  }

  public setDefaultToolbox(name: string, value: ToolboxDefinition): void {
    const currentToolbox = this._toolboxes.get('default');
    if (currentToolbox) {
      this._toolboxes.set('default', currentToolbox);
    } else {
      console.warn(
        `Failed to set default toolbox to ${name}: Toolbox not found`
      );
    }
  }

  /**
   * Returns a map with all the toolboxes.
   */

  get toolboxes(): Map<string, ToolboxDefinition> {
    return this._toolboxes;
  }

  /**
   * Returns a map with all the generators.
   */
  get generators(): Map<string, Blockly.Generator> {
    return this._generators;
  }

  /**
   * Register a toolbox for the editor.
   *
   * @argument name Name of the toolbox.
   *
   * @argument value Toolbox to register.
   */
  registerToolbox(name: string, value: ToolboxDefinition): void {
    console.log('registerToolbox', name, value);
    this._toolboxes.set(name, value);
  }

  /**
   * Register new blocks.
   *
   * @argument blocks Blocks to register.
   */
  registerBlocks(blocks: BlockDefinition[]): void {
    Blockly.defineBlocksWithJsonArray(blocks);
  }

  /**
   * Register new generators.
   *
   * @argument name Name of the generator.
   *
   * @argument generator Generator to register.
   *
   * #### Notes
   * When registering a generator, the name should correspond to the language
   * used by a kernel.
   *
   * If you register a generator for an existing language this will be overwritten.
   */
  registerGenerator(name: string, generator: Blockly.Generator): void {
    this._generators.set(name, generator);
  }

  setlanguage(language: string): void {
    Private.importLanguageModule(language);
  }
}

export function see(toolboxValue: any) {
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
  toolboxDiv.textContent = 'say sm' + (toolboxValue as ToolboxDefinition);
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
}

namespace Private {
  // Dynamically importing the language modules needed for each respective
  // user, in order to change the Blockly language in accordance to the
  // JL one.
  export async function importLanguageModule(language: string) {
    let module: Promise<any>;
    switch (language) {
      case 'En':
        module = import('blockly/msg/en');
        break;
      case 'Es':
        module = import('blockly/msg/es');
        break;
      case 'Fr':
        module = import('blockly/msg/fr');
        break;
      case 'Sa' || 'Ar':
        module = import('blockly/msg/ar');
        break;
      case 'Cz':
        module = import('blockly/msg/cs');
        break;
      case 'Dk':
        module = import('blockly/msg/da');
        break;
      case 'De':
        module = import('blockly/msg/de');
        break;
      case 'Gr':
        module = import('blockly/msg/el');
        break;
      case 'Ee':
        module = import('blockly/msg/et');
        break;
      case 'Fi':
        module = import('blockly/msg/fi');
        break;
      case 'Il':
        module = import('blockly/msg/he');
        break;
      case 'Hu':
        module = import('blockly/msg/hu');
        break;
      case 'Am':
        module = import('blockly/msg/hy');
        break;
      case 'Id':
        module = import('blockly/msg/id');
        break;
      case 'It':
        module = import('blockly/msg/it');
        break;
      case 'Jp':
        module = import('blockly/msg/ja');
        break;
      case 'Kr':
        module = import('blockly/msg/ko');
        break;
      case 'Lt':
        module = import('blockly/msg/lt');
        break;
      case 'Nl':
        module = import('blockly/msg/nl');
        break;
      case 'Pl':
        module = import('blockly/msg/pl');
        break;
      case 'Br':
        module = import('blockly/msg/pt');
        break;
      case 'Ro':
        module = import('blockly/msg/ro');
        break;
      case 'Ru':
        module = import('blockly/msg/ru');
        break;
      case 'Lk':
        module = import('blockly/msg/si');
        break;
      case 'Tr':
        module = import('blockly/msg/tr');
        break;
      case 'Ua':
        module = import('blockly/msg/uk');
        break;
      case 'Vn':
        module = import('blockly/msg/vi');
        break;
      case 'Tw':
        module = import('blockly/msg/zh-hant');
        break;
      case 'Cn':
        module = import('blockly/msg/zh-hans');
        break;
      default:
        // Complete with all the cases taken from: (last updates June 2022)
        // List of languages in blockly: https://github.com/google/blockly/tree/master/msg/js
        // List of languages in Lab: https://github.com/jupyterlab/language-packs/tree/master/language-packs
        console.warn('Language not found. Loading english');
        module = Promise.resolve(En);
        break;
    }

    // Setting the current language in Blockly.
    module.then(lang => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Blockly.setLocale(lang);
    });
  }
}
