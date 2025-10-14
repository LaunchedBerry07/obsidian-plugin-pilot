import { Notice, Plugin, TFile } from 'obsidian';
import { PluginPilotSettingTab } from './src/SettingsTab';
import { PluginManagerModal } from './src/PluginManagerModal';
import { PluginPilotSettings, DEFAULT_SETTINGS } from './src/types';
import { generateMarkdown, getPluginInfo } from './src/utils';

export default class PluginPilot extends Plugin {
   settings: PluginPilotSettings;

   async onload() {
       await this.loadSettings();

       // Add ribbon icon
       this.addRibbonIcon('plane-takeoff', 'Plugin Pilot', () => {
           new PluginManagerModal(this.app, this).open();
       });

       // Add command to open the modal
       this.addCommand({
           id: 'open-plugin-pilot',
           name: 'Open Plugin Pilot',
           callback: () => {
               new PluginManagerModal(this.app, this).open();
           },
       });
       
       // Add command to export the list
       this.addCommand({
           id: 'export-plugin-list',
           name: 'Export plugin list to Markdown',
           callback: () => this.exportPluginList()
       });

       // Add settings tab
       this.addSettingTab(new PluginPilotSettingTab(this.app, this));
       
       this.registerProfileCommands();
   }

   onunload() {}

   async loadSettings() {
       this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
   }

   async saveSettings() {
       await this.saveData(this.settings);
       this.registerProfileCommands(); // Re-register commands when settings change
   }
   
   // This allows other commands to be dynamically added
   private commandIds: string[] = [];

   registerProfileCommands() {
       // Unload any previously registered commands
       this.commandIds.forEach(id => this.app.commands.removeCommand(id));
       this.commandIds = [];
       
       this.settings.profiles.forEach(profile => {
           const commandId = `apply-profile-${profile.id}`;
           this.addCommand({
               id: commandId,
               name: `Apply Profile: ${profile.name}`,
               callback: () => this.applyProfile(profile.id),
           });
           this.commandIds.push(commandId);
       });
   }

   async applyProfile(profileId: string) {
       const profile = this.settings.profiles.find(p => p.id === profileId);
       if (!profile) {
           new Notice('Profile not found.');
           return;
       }

       new Notice(`Applying profile: ${profile.name}...`);

       // @ts-ignore - Using internal API to enable/disable plugins
       const communityPlugins = this.app.plugins.plugins;

       for (const pluginId in communityPlugins) {
           if (pluginId === 'plugin-pilot') continue; // Don't disable ourself!

           const shouldBeEnabled = profile.plugins[pluginId] || false;
           const isEnabled = communityPlugins[pluginId]._loaded;

           if (shouldBeEnabled && !isEnabled) {
               // @ts-ignore
               await this.app.plugins.enablePlugin(pluginId);
           } else if (!shouldBeEnabled && isEnabled) {
               // @ts-ignore
               await this.app.plugins.disablePlugin(pluginId);
           }
       }
       
       new Notice(`Profile "${profile.name}" applied successfully.`);
   }
   
   async exportPluginList() {
       const filePath = 'My Plugin List.md';
       const content = generateMarkdown(this.app, this.settings);
       
       try {
           const file = this.app.vault.getAbstractFileByPath(filePath);
           if(file && file instanceof TFile) {
               await this.app.vault.modify(file, content);
           } else {
               await this.app.vault.create(filePath, content);
           }
           new Notice(`Successfully exported plugin list to ${filePath}`);
       } catch (e) {
           console.error(e);
           new Notice('Error exporting plugin list. Check the console for details.');
       }
   }
}