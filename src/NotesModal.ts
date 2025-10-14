import { App, Modal, Setting } from 'obsidian';
import PluginPilot from '../main';
import { PluginData } from './types';

/**
* A modal for editing a plugin's notes.
*/
export class NotesModal extends Modal {
   plugin: PluginPilot;
   pluginData: PluginData;
   onSave: (newNotes: string) => void;
   
   constructor(app: App, plugin: PluginPilot, pluginData: PluginData, onSave: (newNotes: string) => void) {
       super(app);
       this.plugin = plugin;
       this.pluginData = pluginData;
       this.onSave = onSave;
   }

   onOpen() {
       const { contentEl } = this;
       contentEl.empty();
       contentEl.addClass('plugin-pilot-modal');

       contentEl.createEl('h2', { text: `Notes for ${this.app.plugins.manifests[this.pluginData.id]?.name}` });

       const textArea = contentEl.createEl('textarea');
       textArea.value = this.pluginData.notes || '';
       textArea.style.width = '100%';
       textArea.style.height = '200px';

       new Setting(contentEl)
           .addButton(button => button
               .setButtonText('Save')
               .setCta()
               .onClick(() => {
                   this.onSave(textArea.value);
                   this.close();
               }));
   }

   onClose() {
       this.contentEl.empty();
   }
}