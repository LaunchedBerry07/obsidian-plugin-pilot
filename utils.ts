import { App, PluginManifest } from 'obsidian';
import { PluginPilotSettings } from './types';

/**
* Inspects a plugin to find what UI elements it adds.
* @param app The main Obsidian App object.
* @param pluginId The ID of the plugin to inspect.
* @returns An object summarizing the plugin's contributions.
*/
export function getPluginInfo(app: any, pluginId: string): { commands: any[], settingsTabs: string[], ribbonIcons: number } {
   const plugin = app.plugins.plugins[pluginId];
   if (!plugin) {
       return { commands: [], settingsTabs: [], ribbonIcons: 0 };
   }

   const commands = app.commands.listCommands().filter((cmd: any) => cmd.id.startsWith(pluginId + ':'));
   
   // This is a bit of a hack, but there's no clean API for this
   const settingsTabs = app.setting.settingTabs.filter((tab: any) => tab.id === pluginId || tab.plugin?.manifest.id === pluginId).map((tab:any) => tab.name);
   
   const ribbonIcons = app.workspace.leftRibbon.items.filter((item: any) => item.id.startsWith(pluginId)).length;


   return { commands, settingsTabs, ribbonIcons };
}

/**
* Generates a Markdown string from the current plugin setup.
* @param app The main Obsidian App object.
* @param settings The current settings of the Plugin Pilot plugin.
* @returns A formatted Markdown string.
*/
export function generateMarkdown(app: App, settings: PluginPilotSettings): string {
   let md = '# My Obsidian Plugin List\n\n';
   
   const { categories, plugins: pluginData } = settings;
   const installedPlugins = app.plugins.manifests;

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

   const generatePluginEntry = (manifest: PluginManifest): string => {
       const data = pluginData[manifest.id] || {};
       let entry = `- [**${manifest.name}**](https://obsidian.md/plugins?id=${manifest.id})`;

       if (data.conflicting) {
           entry += ' ⚠️';
       }
       entry += '\n';

       if (data.rating && data.rating > 0) {
           entry += `  - **Rating:** ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}\n`;
       }
       if (data.notes) {
           entry += `  - **Notes:** ${data.notes.replace(/\n/g, ' ')}\n`;
       }

       const info = getPluginInfo(app, manifest.id);
       if (info.commands.length > 0 || info.settingsTabs.length > 0 || info.ribbonIcons > 0) {
           entry += `  - **Summary:** \n`;
           if (info.commands.length > 0) entry += `    - Adds ${info.commands.length} command(s).\n`;
           if (info.settingsTabs.length > 0) entry += `    - Adds a settings tab.\n`;
           if (info.ribbonIcons > 0) entry += `    - Adds ${info.ribbonIcons} ribbon icon(s).\n`;
       }

       return entry;
   };

   categories.forEach(category => {
       const plugins = categorizedPlugins.get(category.id);
       if (plugins && plugins.length > 0) {
           md += `## ${category.name}\n\n`;
           plugins.sort((a,b) => a.name.localeCompare(b.name)).forEach(p => {
               md += generatePluginEntry(p);
           });
           md += '\n';
       }
   });

   if (uncategorizedPlugins.length > 0) {
       md += '## Uncategorized\n\n';
       uncategorizedPlugins.sort((a,b) => a.name.localeCompare(b.name)).forEach(p => {
           md += generatePluginEntry(p);
       });
       md += '\n';
   }

   return md;
}