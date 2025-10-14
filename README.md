<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href=https://raw.githubusercontent.com/LaunchedBerry07/obsidian-plugin-pilot/refs/heads/master/images/icon.png">
    <img src="images/icon.png" alt="Icon" width="80" height="80">
  </a>

  <h3 align="center">Plugin Pilot for Obsidian</h3>

  <p align="center">
    Take control of your Obsidian plugins! Categorize, annotate, create profiles, and inspect your plugins to keep your vault running smoothly.
    <br/>
    <br/>
    <a href="https://github.com/LaunchedBerry07/obsidian-plugin-pilot"><strong>Explore the docs</strong></a>
    <br/>
<br/>
    <a href="https://github.com/LaunchedBerry07/obsidian-plugin-pilot/issues">Report Bug</a>
    ·
    <a href="https://github.com/LaunchedBerry07/obsidian-plugin-pilot/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
## Table of Contents 
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Plugin Pilot Screenshot][product-screenshot]](https://github.com/LaunchedBerry07/obsidian-plugin-pilot)

As your Obsidian vault grows, so does the number of community plugins you use. It can quickly become difficult to remember what each plugin does, which ones might conflict, or how to manage different sets of plugins for different tasks (like writing vs. coding).

Plugin Pilot is your co-pilot for managing this complexity. It provides a powerful, centralized interface to organize, annotate, and control your community plugins, helping you keep your workspace clean, efficient, and stable.

Here's why you'll love Plugin Pilot:
* Bring Order to Chaos: Group your plugins into custom categories that make sense for your workflow.
* Remember Everything: Add personal notes and star ratings to remind yourself why a plugin is essential (or why you should be careful with it).
* Prevent Issues: Manually flag plugins that have known conflicts, so you can easily spot potential problems.
* Task-Specific Setups: Create "Profiles" to quickly enable and disable entire groups of plugins with a single command.
* Understand Your Tools: Use the Plugin Inspector to see a quick summary of what any plugin adds to your Obsidian environment.

Of course, no one plugin can solve every problem, so I'm excited to see how the community contributes to making Plugin Pilot even better.

### Built With

This project was built with the tools and technologies that power the Obsidian ecosystem.

* Obsidian API
* TypeScript
* ESBuild

<!-- GETTING STARTED -->
## Getting Started

Plugin Pilot can be installed directly from the Obsidian Community Plugins browser.

### Installation

1. Open Settings in Obsidian.
2. Go to the Community plugins tab.
3. Make sure "Restricted mode" is turned off.
4. Click Browse to open the community plugins browser.
5. Search for "Plugin Pilot".
6. Click the Install button.
7. Once installed, go back to the Community plugins tab and enable Plugin Pilot.

<!-- USAGE EXAMPLES -->
## Usage

Plugin Pilot is designed to be intuitive. Here’s a quick guide to its main features.

1. Main Interface
    Open the main interface by clicking the plane icon in the ribbon or by running the "Open Plugin Pilot" command from the Command Palette. This modal is your central hub for managing everything.
2. Creating Categories
    Go to the "Plugin Pilot" settings tab to create your categories. You can give them a name and even assign a color to make them stand out.
3. Organizing Your Plugins
    In the main modal, each plugin has a dropdown menu on the right. Simply select the category you want to assign it to.
4. Annotating and Flagging
    * Notes: Click the note icon to add or edit personal notes for any plugin.
    * Ratings: Click the stars to give a plugin a rating from 1 to 5.
    * Conflict Flagging: Click the shield icon to flag a plugin. A red alert icon will then appear next to its name as a visual reminder.
5. Inspecting Plugins
    Curious what a plugin does? Click the "info" icon on any plugin row to see a summary of the commands, settings tabs, and ribbon icons it adds to your workspace.
6. Using Profiles
* In the settings tab, create a new profile. Then, click "Edit" to open the profile editor, where you can toggle which plugins should be active for that profile. A new command will be created for each profile, allowing you to activate it instantly from the Command Palette.
7. Exporting Your List
* Run the "Plugin Pilot: Export plugin list to Markdown" command. A new note will be created in your vault with a fully detailed and formatted list of your plugins, including links, ratings, notes, and summaries.

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/LaunchedBerry07/obsidian-plugin-pilot/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/LaunchedBerry07/obsidian-plugin-pilot](https://github.com/LaunchedBerry07/obsidian-plugin-pilot)

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Obsidian API Docs
* Best README Template
