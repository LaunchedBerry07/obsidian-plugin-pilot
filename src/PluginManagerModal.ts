import { App, Modal, Setting, PluginManifest, setIcon } from 'obsidian';
import PluginPilot from '../main';
import { NotesModal } from './NotesModal';
import { PluginInspectorModal } from './PluginInspectorModal';

/**
* The main modal for viewing and categorizing plugins.
*/
export class PluginManagerModal extends Modal {
   plugin: PluginPilot;

   constructor(app: App, plugin: PluginPilot) {
       super(app);
       this.plugin = plugin;
   }

   onOpen() {
       const { contentEl } = this;
       contentEl.empty();
       contentEl.addClass('plugin-pilot-modal');
       contentEl.createEl('h2', { text: 'Plugin Pilot' });

       this.renderPlugins();
   }

   onClose() {
       const { contentEl } = this;
       contentEl.empty();
   }

   /**
    * Renders the entire list of plugins, grouped by category.
    */
   private renderPlugins() {
       const { contentEl } = this;
       contentEl.empty(); // Clear previous render
       contentEl.createEl('h2', { text: 'Plugin Pilot' });


       const installedPlugins = this.app.plugins.manifests;
       const { categories, plugins: pluginData } = this.plugin.settings;

       const categorizedPlugins: Map<string, PluginManifest[]> = new Map();
       const uncategorizedPlugins: PluginManifest[] = [];

       categories.forEach(cat => categorizedPlugins.set(cat.id, []));

       Object.values(installedPlugins).forEach(manifest => {
           const data = pluginData[manifest.id];
           const categoryId = data?.categoryIds?.[0];
           if (categoryId && categorizedPlugins.has(categoryId)) {
               categorizedPlugins.get(categoryId)?.push(manifest);
           } else {
               uncategorizedPlugins.push(manifest);
           }
       });

       categories.forEach(category => {
           const plugins = categorizedPlugins.get(category.id);
           if (plugins && plugins.length > 0) {
               const header = contentEl.createEl('h3', { text: category.name });
               header.style.color = category.color || 'inherit';
               plugins.sort((a,b) => a.name.localeCompare(b.name)).forEach(pluginManifest => this.createPluginSetting(pluginManifest, contentEl));
           }
       });

       if (uncategorizedPlugins.length > 0) {
           contentEl.createEl('h3', { text: 'Uncategorized' });
           uncategorizedPlugins.sort((a,b) => a.name.localeCompare(b.name)).forEach(pluginManifest => this.createPluginSetting(pluginManifest, contentEl));
       }
   }

   /**
    * Creates a setting row for a single plugin, including all annotations.
    * @param manifest The manifest of the plugin to render.
    * @param containerEl The HTML element to append the setting to.
    */
   private createPluginSetting(manifest: PluginManifest, containerEl: HTMLElement) {
       const pluginData = this.plugin.settings.plugins[manifest.id] || { id: manifest.id };
       
       const setting = new Setting(containerEl)
           .setName(manifest.name)
           .setDesc(manifest.description);

       if (pluginData.conflicting) {
           const icon = createSpan({ cls: 'conflict-icon' });
           setIcon(icon, 'shield-alert');
           setting.nameEl.prepend(icon);
       }

       setting.addExtraButton(button => {
           button.setIcon('info')
               .setTooltip('Show plugin summary')
               .onClick(() => {
                   new PluginInspectorModal(this.app, manifest).open();
               });
       });

       setting.addExtraButton(button => {
           button.setIcon('shield')
               .setTooltip(pluginData.conflicting ? 'Unflag as conflicting' : 'Flag as conflicting')
               .onClick(async () => {
                   if (!this.plugin.settings.plugins[manifest.id]) {
                       this.plugin.settings.plugins[manifest.id] = { id: manifest.id };
                   }
                   this.plugin.settings.plugins[manifest.id].conflicting = !this.plugin.settings.plugins[manifest.id].conflicting;
                   await this.plugin.saveSettings();
                   this.renderPlugins(); 
               });
       });

       setting.addExtraButton(button => {
           button.setIcon(pluginData.notes ? 'file-text' : 'file-plus-2')
               .setTooltip(pluginData.notes ? 'Edit notes' : 'Add notes')
               .onClick(() => {
                   new NotesModal(this.app, this.plugin, pluginData, async (newNotes) => {
                       if (!this.plugin.settings.plugins[manifest.id]) {
                           this.plugin.settings.plugins[manifest.id] = { id: manifest.id };
                       }
                       this.plugin.settings.plugins[manifest.id].notes = newNotes;
                       await this.plugin.saveSettings();
                       this.renderPlugins();
                   }).open();
               });
       });

       const ratingContainer = createDiv({ cls: 'star-rating-container' });
       for (let i = 1; i <= 5; i++) {
           const star = createSpan({ cls: 'star-icon' });
           setIcon(star, 'star');
           if (pluginData.rating && i <= pluginData.rating) {
               star.addClass('filled');
           }
           star.addEventListener('click', async () => {
               if (!this.plugin.settings.plugins[manifest.id]) {
                   this.plugin.settings.plugins[manifest.id] = { id: manifest.id };
               }
               this.plugin.settings.plugins[manifest.id].rating = this.plugin.settings.plugins[manifest.id].rating === i ? 0 : i;
               await this.plugin.saveSettings();
               this.renderPlugins();
           });
           ratingContainer.appendChild(star);
       }
       setting.controlEl.appendChild(ratingContainer);
       
       setting.addDropdown(dropdown => {
           dropdown.addOption('', 'None');
           this.plugin.settings.categories.forEach(cat => {
               dropdown.addOption(cat.id, cat.name);
           });
           const currentCategoryId = pluginData.categoryIds?.[0] || '';
           dropdown.setValue(currentCategoryId);

           dropdown.onChange(async (value) => {
               if (!this.plugin.settings.plugins[manifest.id]) {
                   this.plugin.settings.plugins[manifest.id] = { id: manifest.id };
               }
               
               this.plugin.settings.plugins[manifest.id].categoryIds = value ? [value] : [];
               await this.plugin.saveSettings();
               this.renderPlugins();
           });
       });
   }
}