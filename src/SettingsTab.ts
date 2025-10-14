import { App, PluginSettingTab, Setting, TextComponent } from 'obsidian';
import PluginPilot from '../main';
import { v4 as uuidv4 } from 'uuid';
import { ProfileEditModal } from './ProfileEditModal';

export class PluginPilotSettingTab extends PluginSettingTab {
   plugin: PluginPilot;

   constructor(app: App, plugin: PluginPilot) {
       super(app, plugin);
       this.plugin = plugin;
   }

   display(): void {
       const { containerEl } = this;
       containerEl.empty();
       containerEl.createEl('h2', { text: 'Plugin Pilot Settings' });

       // --- CATEGORIES SECTION ---
       containerEl.createEl('h3', { text: 'Categories' });

       new Setting(containerEl)
           .setName('New category')
           .setDesc('Create a new category for your plugins.')
           .addText(text => {
               text.setPlaceholder('Enter category name');
               text.inputEl.id = 'new-category-name';
           })
           .addButton(button => {
               button.setButtonText('Add')
                   .setCta()
                   .onClick(async () => {
                       const inputEl = document.getElementById('new-category-name') as HTMLInputElement;
                       const newCategoryName = inputEl.value;
                       if (newCategoryName) {
                           this.plugin.settings.categories.push({ id: uuidv4(), name: newCategoryName, color: '' });
                           await this.plugin.saveSettings();
                           inputEl.value = '';
                           this.display(); // Re-render the settings tab
                       }
                   });
           });

       this.plugin.settings.categories.forEach(category => {
           const setting = new Setting(containerEl)
               .addText(text => {
                   text.setValue(category.name)
                       .onChange(async (value) => {
                           category.name = value;
                           await this.plugin.saveSettings();
                       });
               })
                .addColorPicker(color => {
                   color.setValue(category.color || '#000000').onChange(async (value) => {
                       category.color = value;
                       await this.plugin.saveSettings();
                   });
               })
               .addExtraButton(button => {
                   button.setIcon('trash')
                       .setTooltip('Delete category')
                       .onClick(async () => {
                           if (confirm(`Are you sure you want to delete the "${category.name}" category?`)) {
                               this.plugin.settings.categories = this.plugin.settings.categories.filter(c => c.id !== category.id);
                               Object.values(this.plugin.settings.plugins).forEach(pData => {
                                   if(pData.categoryIds) {
                                       pData.categoryIds = pData.categoryIds.filter(catId => catId !== category.id);
                                   }
                               });
                               await this.plugin.saveSettings();
                               this.display();
                           }
                       });
               });
       });
       
       // --- PROFILES SECTION ---
       containerEl.createEl('h3', { text: 'Profiles' });
       
       new Setting(containerEl)
           .setName('New Profile')
           .setDesc('Create a new plugin profile.')
           .addText(text => text.setPlaceholder('Enter profile name'))
           .addButton(button => button
               .setButtonText('Create')
               .setCta()
               .onClick(async () => {
                   const newProfileName = (button.components[0] as TextComponent).getValue();
                   if(newProfileName) {
                       const newProfile = {
                           id: uuidv4(),
                           name: newProfileName,
                           plugins: {}
                       };
                       this.plugin.settings.profiles.push(newProfile);
                       await this.plugin.saveSettings();
                       this.display();
                   }
               }));

       this.plugin.settings.profiles.forEach(profile => {
           new Setting(containerEl)
               .setName(profile.name)
               .addButton(button => button
                   .setButtonText('Edit')
                   .onClick(() => {
                       new ProfileEditModal(this.app, this.plugin, JSON.parse(JSON.stringify(profile)), async (updatedProfile) => {
                           const index = this.plugin.settings.profiles.findIndex(p => p.id === updatedProfile.id);
                           if (index > -1) {
                               this.plugin.settings.profiles[index] = updatedProfile;
                               await this.plugin.saveSettings();
                               this.display();
                           }
                       }).open();
                   }))
               .addExtraButton(button => button
                   .setIcon('trash')
                   .setTooltip('Delete profile')
                   .onClick(async () => {
                       if (confirm(`Are you sure you want to delete the "${profile.name}" profile?`)) {
                           this.plugin.settings.profiles = this.plugin.settings.profiles.filter(p => p.id !== profile.id);
                           await this.plugin.saveSettings();
                           this.display();
                       }
                   }));
       });
   }
}