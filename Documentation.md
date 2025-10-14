Welcome to Plugin Pilot, your co-pilot for managing your Obsidian community plugins!

This guide will walk you through everything you need to know, from installation to advanced features.

## Table of Contents

1. About Plugin Pilot
2. Installation, Enabling, and Disabling
   * Installing from the Community Plugin Store
   * Enabling and Disabling the Plugin
   * Uninstalling the Plugin
3. How to Use Plugin Pilot
   * Accessing the Main Interface
   * Managing Categories
   * Annotating Your Plugins (Notes, Ratings, Flags)
   * Inspecting Plugin Details
   * Using Plugin Profiles
   * Exporting Your Plugin List

## 1. About Plugin Pilot

As your collection of Obsidian plugins grows, it can become challenging to manage them all. Plugin Pilot helps you take control by allowing you to:
* Categorize: Group your plugins into custom categories like "Writing," "Task Management," or "Appearance."
* Annotate: Add personal notes, star ratings, and conflict-warning flags to each plugin.
* Inspect: Quickly see what commands, settings, and icons a plugin adds to your workspace.
* Create Profiles: Define and activate "profiles" to quickly enable a specific set of plugins for different tasks (e.g., a "Writing Mode" profile).
* Export: Share your curated and annotated plugin list as a clean Markdown file.

## 2. Installation, Enabling, and Disabling

Managing Plugin Pilot works just like any other community plugin.

### Installing from the Community Plugin Store

(This is the recommended method once the plugin is published.)

1. Open Settings in Obsidian.
2. Go to the Community plugins tab.
3. Ensure that Restricted mode is turned off.
4. Click Browse to open the community plugin store.
5. Search for "Plugin Pilot."
6. Click the Install button.
7. Once installation is complete, click Enable.

### Enabling and Disabling the Plugin

You can toggle the plugin on or off at any time from the Community Plugins menu.

1. Open Settings > Community plugins.
2. Find Plugin Pilot in your list of installed plugins.
3. Click the toggle switch to the right of the plugin's name to enable or disable it.
Uninstalling the Plugin
4. Open Settings > Community plugins.
5. Find Plugin Pilot in your list.
6. Click the Uninstall button (trash can icon).

(For more general information on managing plugins, please refer to the official Obsidian Help documentation on community plugins.)

## 3. How to Use Plugin Pilot

### Accessing the Main Interface

You can open the main Plugin Pilot window in two ways:
1. Ribbon Icon: Click the paper plane icon in the left ribbon.
2. Command Palette: Press Ctrl/Cmd+P to open the Command Palette, type "Plugin Pilot", and select the "Plugin Pilot: Open Plugin Pilot" command.

### Managing Categories

All category management is done in the plugin's settings tab.

1. Go to Settings > Plugin Pilot.
2. Under the "Manage Categories" heading, you can:
   * Add a new category: Type a name into the text field and click the Add button.
   * Rename a category: Simply click on the name of an existing category, type a new name, and click outside the text box to save.
   * Delete a category: Click the Delete button next to the category you wish to remove. A confirmation will be required.
   
### Annotating Your Plugins

From the main Plugin Pilot modal, you can add valuable context to each plugin.

* Assigning a Category: Use the dropdown menu on the right of each plugin row to assign it to one of your created categories. Plugins will automatically regroup under their new category heading.
* Adding Notes: Click the "note" icon to open a new window where you can write and save personal notes. If a note already exists, the icon will change, and you can click it to edit.
* Setting a Rating: Click on one of the five stars to assign a rating. To clear a rating, click the same star again.
* Flagging Conflicts: Click the "shield" icon to toggle a conflict warning. When flagged, a prominent red alert icon will appear next to the plugin name.

### Inspecting Plugin Details

To see what a plugin adds to your workspace:
1. Open the main Plugin Pilot modal.
2. Click the "info" icon on any plugin row.
3. A modal will appear, listing all the Commands, Settings Tabs, and Ribbon Icons associated with that plugin.

### Using Plugin Profiles

Plugin Profiles allow you to quickly enable a specific set of plugins while disabling all others.

Creating a Profile:
1. Go to Settings > Plugin Pilot.
2. Under the "Profiles" section, type a name for your new profile (e.g., "Creative Writing") and click Add.

Editing a Profile:
1. Click the Edit button next to the profile you want to configure.
2. A new modal will appear, listing all your community plugins.
3. Use the toggles to select which plugins should be enabled when this profile is active.
4. Click Save.

Applying a Profile:
1. Open the Command Palette (Ctrl/Cmd+P).
2. Search for your profile by name (e.g., "Plugin Pilot: Apply Profile 'Creative Writing'").
3. Select the command to run it. The plugins defined in the profile will be enabled, and all other community plugins (except Plugin Pilot) will be disabled.

### Exporting Your Plugin List
To create a shareable Markdown file of your plugin setup:
1. Open the Command Palette (Ctrl/Cmd+P).
2. Run the "Plugin Pilot: Export plugin list to Markdown" command.
3. A new file named My Plugin List.md will be created in the root of your vault, containing a formatted list of all your plugins with their categories, ratings, notes, flags, and summaries.
<!-- end list -->