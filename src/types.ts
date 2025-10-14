export interface PluginData {
   id: string;
   notes?: string;
   rating?: number; // 0-5
   categoryIds?: string[];
   conflicting?: boolean;
}

export interface Category {
   id: string;
   name: string;
   color?: string; // Optional color for the category
}

export interface Profile {
   id: string;
   name: string;
   plugins: { [pluginId: string]: boolean }; // key: pluginId, value: isEnabled
}

export interface PluginPilotSettings {
   plugins: {
       [id: string]: PluginData;
   };
   categories: Category[];
   profiles: Profile[];
}

export const DEFAULT_SETTINGS: PluginPilotSettings = {
   plugins: {},
   categories: [],
   profiles: [],
};