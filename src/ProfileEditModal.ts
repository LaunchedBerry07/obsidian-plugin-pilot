import { App, Modal, Setting, PluginManifest } from 'obsidian';
import PluginPilot from '../main';
import { Profile } from './types';

/**
* A modal for editing a single plugin profile.
*/
export class ProfileEditModal extends Modal {
   plugin: PluginPilot;
   profile: Profile;
   onSave: (profile: Profile) => void;

   constructor(app: App, plugin: PluginPilot, profile: Profile, onSave: (profile: Profile) => void) {
       super(app);
       this.plugin = plugin;
       this.profile = profile; // Work on a copy
       this.onSave = onSave;
   }

   onOpen() {
       const { contentEl } = this;
       contentEl.empty();
       contentEl.addClass('plugin-pilot-modal');

       contentEl.createEl('h2', { text: `Edit Profile: ${this.profile.name}` });
       
       new Setting(contentEl)
           .setName("Profile Name")
           .addText(text => text
               .setValue(this.profile.name)
               .onChange(value => {
                   this.profile.name = value;
               }));


       contentEl.createEl('h3', { text: 'Enabled Plugins' });
       const installedPlugins = this.app.plugins.manifests;

       Object.values(installedPlugins).forEach((manifest: PluginManifest) => {
           if (manifest.id === 'plugin-pilot') return; // Don't allow disabling ourself

           new Setting(contentEl)
               .setName(manifest.name)
               .addToggle(toggle => toggle
                   .setValue(this.profile.plugins[manifest.id] || false)
                   .onChange(value => {
                       this.profile.plugins[manifest.id] = value;
                   })
               );
       });

       new Setting(contentEl)
           .addButton(button => button
               .setButtonText('Save Profile')
               .setCta()
               .onClick(() => {
                   this.onSave(this.profile);
                   this.close();
               }));
   }

   onClose() {
       this.contentEl.empty();
   }
}