import { App, Modal, PluginManifest } from 'obsidian';
import { getPluginInfo } from './utils';

/**
* A modal to display a summary of a plugin's contributions.
*/
export class PluginInspectorModal extends Modal {
   manifest: PluginManifest;

   constructor(app: App, manifest: PluginManifest) {
       super(app);
       this.manifest = manifest;
   }

   onOpen() {
       const { contentEl } = this;
       contentEl.empty();
       contentEl.addClass('plugin-pilot-modal');

       contentEl.createEl('h2', { text: `Summary for ${this.manifest.name}` });

       const info = getPluginInfo(this.app, this.manifest.id);

       if (info.commands.length > 0) {
           const cmdSection = contentEl.createDiv({ cls: 'inspector-summary-section' });
           cmdSection.createEl('h4', { text: 'Commands' });
           const cmdList = cmdSection.createEl('ul');
           info.commands.forEach(cmd => cmdList.createEl('li', { text: cmd.name }));
       }

       if (info.settingsTabs.length > 0) {
           const settingsSection = contentEl.createDiv({ cls: 'inspector-summary-section' });
           settingsSection.createEl('h4', { text: 'Settings Tabs' });
           const settingsList = settingsSection.createEl('ul');
           info.settingsTabs.forEach(tab => settingsList.createEl('li', { text: tab }));
       }

       if (info.ribbonIcons > 0) {
           const ribbonSection = contentEl.createDiv({ cls: 'inspector-summary-section' });
           ribbonSection.createEl('h4', { text: `Ribbon Icons: ${info.ribbonIcons}` });
       }
       
       if (info.commands.length === 0 && info.settingsTabs.length === 0 && info.ribbonIcons === 0) {
           contentEl.createEl('p', { text: 'This plugin does not seem to add any commands, settings tabs, or ribbon icons.' });
       }
   }

   onClose() {
       this.contentEl.empty();
   }
}