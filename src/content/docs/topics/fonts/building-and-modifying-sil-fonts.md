---
title: Building & Modifying SIL Fonts
description: SIL font development guide
sidebar:
  order: 5800
lastUpdated: 2025-10-15
---

This is a step-by-step guide to building, modifying and contributing to the various [open font projects](https://software.sil.org/fonts) designed and developed by [SIL](https://www.sil.org). Let us know if you have any comments or suggestions to add to this guide. Enjoy!

## Introduction

In this guide we assume that:

- you have access to a computer running recent versions of macOS, Windows or Ubuntu where you already have (or can install) the following software: Docker, Bash/Zsh and Git. We will be using a container based on Ubuntu 24.04 LTS (Noble) - see [Setting Up Tools].
- you are familiar with the basics of using the terminal (or command-line). There is no graphical interface available for using the various tools. *Don't worry, simple cut and paste instructions will be available.*
- you have basic knowledge of distributed version control systems, [Git] and [GitHub] in particular. *If all you want to do is build fonts locally, we'll provide the minimal info you need.*

We approach font design and script engineering like a libre/open source software project, with publicly accessible font sources in open formats, build systems using only unrestricted libre/open tools and a consistent set of recommended best practices to enable smooth collaborative work with others.

The font we will use as our practical example throughout this guide is [Andika Mtihani]. This font project is specifically designed to be an ongoing testbed for open workflow development. The Andika Mtihani family, along with all fonts designed and produced by SIL, is released under the [SIL Open Font License] (see the current [OFL-FAQ] for extra details).

All our active projects use the workflow described in this guide, and we encourage you to use it for your projects as well. You can simply mention this guide in your documentation, such as a link in a FONTLOG.txt, CONTRIBUTING.md or equivalent file in your project repository.

## Source formats

We keep our font sources in open formats so anyone can have full access to them now and in the long-term future. This also gives us the widest-possible choice of tools, so we can pick the right tool for the right job. Interoperability is a core value of our open font design and production workflow. Being locked into a single proprietary tool supporting only opaque formats is definitely not what we want, especially long-term.

### UFO3 + designspace

Our primary font sources are kept in the [UFO3 format]. It's a clearly documented, platform-neutral open format which allows everyone to access the sources with a range of tools. Using this type of format helps future-proof a font project and makes it more accessible and maintainable by others. It also helps with keeping font sources in revision control - a key to any collaborative development. Many foundries are also now using UFO as their primary source format. It is directly supported by all the main font design tools (Glyphs, Robofont, FontLab, FontForge, Fontra, etc). *We sometimes store other formats in the repository for archival purposes (typically in source/archive/) but the fonts are produced from the canonical UFO sources.*

We also occasionally store some font-wide data in the UFO3 *lib.plist*.

Our font family structures (styles, masters, instances) are defined in [designspace] files which describe the relationships between individual UFOs.

We use normalization tools from the [pysilfont] collection of font utilities to keep the UFOs in a consistent format even after import/export from various other tools and to synchronize them with one another. These tools ensure we keep the font sources clean, vendor-neutral, and friendly to version control systems.

### Additional font sources (and tools)

There are some types of data that currently have no canonical place in the UFO3 format. We store and maintain these in additional files:

- *Graphite source code* is stored in [GDL (Graphite Description Language)] format in *source/graphite/*
- *Documentation* is typically stored in .md (Markdown) or .odt (OpenDocument Text) format in *documentation/*. ([fontdocs] is used to maintain source documentation and to generate multiple output formats like PDF and HTML)
- *Test data and documents* are stored in a variety of formats ([FTML], [SILE], [TeX], plain text) in *tests/*
- *Web font demonstration files* (.html, .css) are stored in *web/*
- *Tools*, such as project-specific python scripts, are stored in *tools/*

### Auxiliary data sources

There are also some types of data that __do have a place__ in the UFO3 format but are clumsy or awkward to maintain there. We store and edit these in auxiliary files, and use python scripts (usually in *preflight*) to update the UFOs from them before committing changes to the project repositories:

- *OpenType source code* is stored in the [.fea format] in the UFO (*features.fea)* but may be defined in a separate file using the more efficient and powerful [.feax format]. The .feax is compiled into standard .fea during the build process and should also be used to update the *features.fea* in the UFOs.
- *Individual glyph data* such as production glyph names and glyph orders is stored in a *glyph_data.csv* file for easy maintenance. The glyph names and orders in the fonts are updated from this data in the *preflight* script.

## Repository Structures

Our projects use a consistent directory structure for both our source repositories and release packages. So, if you know your way around one of our projects, you can easily understand all of them. We'd be happy to see others adopt this overall structure, too, so please consider it for your projects.

We talk about repositories because our project directory structures and all the (important) files they contain are tracked with [Git]. We make our repositories available on [GitHub], but there's nothing about our structures or processes that depends on that hosting service. Other git hosting services can work similarly. 

Each of our projects (which usually contain only a single font family) use a single dedicated project folder with all the font sources, so that it remains self-contained. If any common files are shared among multiple projects, then dedicated tools and corresponding documentation will be available inside the project to do a manual synchronisation so that one source checkout always gives you everything you need.

Our convention is to name the project folder __font-*name-of-font-family*__ as in *font-andika-mtihani*.

### Example structure

Here is an annotated example of our project repository structure based on Andika Mtihani's public git repository. Files that we normally have in all projects are in __bold__. All others are optional and may differ from project to project. Files and folders not in the Andika Mtihani project are in *(parentheses)* and are provided as a guide to other projects.

- __.gitattributes__ — *git attributes configuration hidden file tailored for font projects*
- __.gitignore__ — *git ignore configuration hidden file tailored for font projects*
- __FONTLOG.txt__ — *font design and engineering-oriented changelog*
- __OFL-FAQ.txt__ — *Frequently Asked Questions file for the SIL Open Font License*
- __OFL.txt__ — *SIL Open Font License file with the copyright statement(s) in its header*
- __preflight__ — *normalization script to be run before testing/committing a change*
- __preflightg__ — *script to produce and normalize UFOs from a Glyphs file*
- __preflightfl__ — *script to produce and normalize UFOs from a FontLab-produced UFO*
- __preflightff__ — *script to produce and normalize UFOs from a Fontforge-produced UFO*
- __preglyphs__ — *script to produce temporary Glyphs files from UFOs+designspace*
- __README.md__ — *markdown file with minimal information*
- __README.txt__ — *more complete README file describing the font project*
- __wscript__ — *Smith configuration used for building, testing and releasing*
- ( documentation/ — *folder for user documentation* )
- __source/__ — *folder for containing UFOs, designspaces, smart code sources, etc*
  - ( AndikaMtihani.feax — OpenType feature code including SIL extensions to .fea )
  - AndikaMtihani-Bold.ufo
  - AndikaMtihani-BoldItalic.ufo
  - AndikaMtihani-Italic.ufo
  - __AndikaMtihani-Regular.ufo__
  - AndikaMtihaniItalic.designspace — *designspace definition for Italic & Bold Italic*
  - __AndikaMtihaniRoman.designspace__ — *designspace definition for Regular & Bold*
  - composites.txt — *composite character definitions*
  - __glyph_data.csv__ — *glyph-specific data such as production glyph names and glyph orders*
  - archive/ — *folder for legacy formats if needed for archival purposes*
  - ( graphite/ — *folder for Graphite source code* )
  - logs/ — *folder for log files, only needed as a placeholder to make tools happy*
  - ( masters/ — *folder for master UFOs for projects involving interpolated instances* )
- __tests/__ — *folder for various test documents and data files*
- __references/__ — *folder for font binaries used for regression testing*
- ( tools/ — *folder for project-specific scripts and utilities* )
  - ( lib/ — *folder for project-specific libraries* )
- ( web/ — *example files for self-hosted webfonts* )

### Ignored files: temporary files, generated files

By default, the results generated by a build (including the fonts, various reports and log files) will appear in a separate *results/* folder not stored in the git repository. Temporary files and generated artifacts like backups, logs, test results, specimens, etc. are not stored in the git repository and are set to be ignored via the *.gitignore* configuration file. There is some flexibility though, as certain source files are generated or modified by scripts at various times in the lifecycle of a project.

## Workflow Overview

This is a general overview of the workflow.

### Initial setup (one-time)

- Install and configure Docker and anvil
- Set up a font projects folder and clone projects of interest

These steps are covered in [Setting Up Tools].

### Daily routines

- Start up Docker and the container (`anvil up`)
- Navigate to the project folder
- Pull any changes others have made to the project
- Change things! Some ways to do that:
    - Manually edit files using a text editor
    - Run scripts to make changes
    - Run the *preglyphs* script to create a Glyphs file that can be edited
    - Open the UFOs directly in other apps (Glyphs, Robofont, FontForge, FontLab, Fontra, etc)
- Save and normalize your changes
    - Run *preflight* scripts (including *preflightg*, or *preflightff*, *preflightfl*)
- Use *Smith* commands to:
    - Clean and configure the build folder
    - Build the fonts
    - Prepare test files
- Review the results (in `/results`)
- Commit your changes locally then push them to the main project
    - You may need to issue a PR (Pull Request) or MR (Merge Request) if it's not your project
- Exit the container and shut it down (`exit` and `anvil down`)

### Preparing a font release

- Modify the project metadata to reflect the release, including font version number
    - In the UFOs (fontinfo.plist)
    - In the FONTLOG.txt
- Adjust any other documentation
- Tag the last commit to reflect the release version
- Build the fonts using `smith zip`, `smith tarball`, or `smith release`
- Make a release on Github, uploading the release package from `results/releases/`

### Contributing back to the project

- Contact the project maintainer to indicate your interest in contributing back to the project
    - You may need to agree to a CLA (Contributor License Agreement)
- Issue a PR (Pull Request) or MR (Merge Request) containing your changes
- Adjust your submission as needed until it is accepted!

Read [Contributing Changes](#contributing-changes) for more information.

## Setting Up Tools

Our projects use a consistent set of libre/open tools for modifying, building and testing fonts. We call this software collection our toolchain. To rebuild our fonts yourself, the easiest will be to use the same toolchain and workflow we use. But since we use open formats, you should be able to use the various source files with other tools as well, although you will have to rely on your own experience and on documentation available outside of this guide for the practical details.

To allow for easier installation, use and update of the various software tools which form part of the [smith] toolchain, we use a container (a lightweight version of a virtual machine). This container is currently based on [Ubuntu](https://www.ubuntu.com/) 24.04 LTS (Noble) and uses the [Docker] technology. This enables us to spin up a new, separate, Ubuntu-based environment in a container without any risk to the host computer. For the toolchain to be accessible and be allowed to run on the shared font folder files, Docker will need to run as a background service.

The process of setting up the smith toolchain on your own computer involves:

A. Installing Docker

B. Installing WSL for Windows users

C. Setting up a font projects folder

D. Installing anvil

E. Configuring anvil

F. Using and managing the container with anvil

Please bear in mind that __the container is fairly large (many software components for both base OS and toolchain: a total of about 500 MB compressed)__, so it will require a __comfortable unmetered network connection__ to download everything the first time as well as subsequent updates. The image is compressed so should usually take under 3 minutes to download. It's not immediate, but it sure beats having to install and upgrade every single component manually!

### Step A: Installing Docker

To install Docker, go to [Docker.com](https://www.docker.com)

- Download the 64-bit Docker installer for your target host OS (and type of CPU).
- Run the installer. You may also need to reboot and authorize the background service.

### Step B: Installing WSL for Windows users

*(If you are using macOS or Ubuntu, you can skip this step and go directly to [Step C: Setting up a font projects folder](#step-c-setting-up-a-font-projects-folder))*

Unlike macOS and Ubuntu, Windows does not come with some of the basic command-line tools installed by default but, thanks to the recent introduction of [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl/), this has improved a lot. Windows users should install WSL to use a more capable command-line environment. The native Windows shell (cmd) and the native Windows filesystem are currently too slow for Docker so we use WSL instead.

Launch the Windows command prompt (or type: `cmd`)

Type the following to install WSL:
`wsl --install -d Ubuntu-24.04`

After granting permissions and rebooting, your computer will prepare the WSL VM (Virtual Machine) and ask you to pick a username and password. Make a note of both, especially the password which you will need to use again.

In the Docker settings available from the system tray menu (look for the icon of a whale carrying containers on its back) or by clicking on the gears icon in the Docker dashboard, you will need to make sure that this newly created VM is selected as the one integrated by default. Under *Resources -> WSL Integration*, make sure that "Enable integration with my default WSL distro" is ticked and that the sliding button next to Ubuntu-24.04 is set to on (blue rather than gray). Now press the "Apply and Restart" button.

Windows users need to go through the extra steps described in [Configuring WSL].

### Step C: Setting up a font projects folder

We recommend that you set up a dedicated font projects folder - *~/repos/wstechfonts/* - and that each font project has its own folder within the dedicated folder, such as *~/repos/wstechfonts/font-project-name*. This makes it easy to use a single container configuration for multiple projects. You do not need to run a separate container for each project. __Further steps and examples in this guide will assume that you have set up this folder.__

To create the default font projects folder, type:

`mkdir -p ~/repos/wstechfonts`

### Step D: Installing anvil

The easiest way to interact with this Docker container is via a separate utility called [anvil](https://github.com/silnrsi/anvil). _It's named after the solid tool the smiths use to repeatedly hammer on when working in their forge_. Anvil is a frontend to Docker compose and reads a configuration file available from its own github project repository. This makes it simpler to run the container with dedicated targets. It saves you from having to remember all the many underlying details of Docker and Docker compose. If you are familiar with our older VirtualBox-based workflow, this replaces the Vagrant utility.

#### Checking out the anvil repository

Open your Terminal app (Windows users need to first type `wsl` as an added step to get into the VM) and type:

`cd ~/repos`

`git clone https://github.com/silnrsi/anvil`

#### Installing anvil in the path

In your Terminal app type:

`mkdir -p ~/bin`

`cp ~/repos/anvil/anvil ~/bin/anvil`

`chmod +x ~/bin/anvil`

You can also install the bash completion script to more easily tab through the various anvil subcommands (_on Windows/WSL, it will ask you for the password you set at the creation of the VM earlier_):
`sudo cp ~/repos/anvil/bash_completion_anvil /etc/bash_completion.d/anvil`

Exit the terminal by typing:

`exit`

or just close the Terminal app.

### Step E: Configuring anvil

When you add anvil to your path, it will look for the configuration file in *~/repos/anvil/docker-compose.yml* by default. This file contains all the necessary configuration fields including where to find the image, the shared folder path, memory allocation, etc. You can adjust the default values if your specific needs are different but they should work as is.

### Step F: Using and managing the container with anvil

To spin up a container, simply type in your Terminal:

`anvil up`

If a more recent Docker image has been produced on the remote server, it will also fetch that new image and use it to spin up a new container. If the base image is current then it will use that to spin up a new container.

To remove/destroy a container, but without touching any of the work files shared on the host computer, type:

`anvil down`

#### Using the container

After the container is configured and working, the day-to-day usage goes like this:

To get into the container and access the toolchain inside simply type:

- `anvil ssh`

The command prompt should change to show you the minimal information needed: a whale as the Docker symbol, the current absolute path and a timestamp.

```
🐳  /smith
(Mon June 26 08:01:38) ❯
```

- Make any changes you want - see next section on [Building Font Projects](#building-font-projects)
- When done, type: `exit`
- Wait until the prompt changes back to your usual Terminal on the host computer

#### Maintaining the container and keeping it up-to-date

The container is made of various components which are being improved and worked on regularly. You don't need to be running the bleeding edge constantly, but it's good to stay somewhat current with new bugfixes and extra features. Since you are not building any of the components locally on your own computer but you are getting a pre-built image, it is now much faster. Running `anvil up` will automatically get the latest version of everything already compiled and properly installed. Currently, new images are rebuilt on the server every week on Monday morning (at 00:00 UTC time).

Since spinning up a new container is fairly quick, usually under a minute, it's OK to do `anvil up` and `anvil down` fairly regularly. It's up to you (and the CPU and memory resources of your computer) if you want to leave the container running and just find it when you get back to your computer again or if you'd rather spin it down to free up those resources.

If you want a persistent container to make local changes to the toolchain (like adding a new library or utility) and find everything again the next time you get into the container, then use `anvil up` then `anvil ssh-dev` ("dev" stands for development).

`anvil clean` removes the existing containers, images and entire build cache. Only use this if you need a clean slate with the whole toolchain.

`anvil when` tells you how old your container is

`anvil status` gives you status information

`anvil --help` or `anvil` gives you a usage summary of all the targets

## Configuring WSL

*This section is only for Windows users. If you are using macOS or Ubuntu you can skip this entire section and go back to [Setting up Tools - Step D: Installing anvil](#setting-up-tools.html#step-d-installing-anvil)* (or go directly to [Building Font Projects](#building-font-projects) if anvil is already installed).

Now that WSL is fully installed, we can configure various aspects like the shared project folder and the settings of the git GUI.

Because of current performance issues with native Docker on Windows filesystem, we need to store the font project sources inside the WSL VM. We will create a shared folder repository inside the VM and point our toolchain to it.

### Adjusting the resources allocated to WSL in Windows

By default Windows automatically allocates resources to the WSL VM, but you can adjust these settings by dropping this [.wslconfig configuration file](https://github.com/silnrsi/anvil/blob/main/.wslconfig) into *%USERPROFILE%* (or *C:\Users\username\.wslconfig* where *username* is your Windows username). Recent versions of WSL now also provide a configuration panel for WSL, look for "WSL Settings" in the Start Menu. 
You can adjust the defaults settings to the specific resources available on your computer.

### Setting up a fonts project folder

We recommend that you set up a dedicated font projects folder - *~/repos/wstechfonts/* - and that each font project has its own folder within the dedicated folder, such as *~/repos/wstechfonts/font-project-name*. This makes it easy to use a single container configuration for multiple projects. You do not need to run a separate container for each project. __Further steps and examples in this guide will assume that you have set up this folder.__

To get into the WSL VM, launch your Terminal app (cmd) and type:

`wsl`

Then inside the VM, type:

`mkdir -p ~/repos/wstechfonts`

Don't check out any repositories into the new folder yet. There are some further configuration steps that need to be completed first.

### Mapping the WSL virtual disk to a Windows drive letter

The contents of the WSL VM are visible in the Explorer tree structure but we are going to map it to a Windows network drive. This is needed because most Windows apps don't know how to browse to the special folders inside the WSL VM, but when they are mapped to a drive, they can find them and use them.

- In the Navigation Pane of Windows File Explorer, scroll down to the Linux section and right-click on the Ubuntu-24.04 entry
- Select "Map Network Drive" then select W:  (W for WSTech or WSL) check that it’s set to “Reconnect at sign-in” and then press Finish
- Select that drive (Ubuntu-24.04 or W:) in the Navigation Pane, right-click and choose "Pin to Quick Access". Alternatively you can type: `\\wsl$`  (or `\\wsl.localhost` ) in the address bar to access it directly.

#### Setting Sourcetree options and git configuration

Because the git index is handled differently between Windows and Ubuntu you should only use the GUI version of git and not the command-line version inside your VM or your container. Many Windows users like [Sourcetree] as a friendly no-cost git GUI for Windows.

We need to adjust Sourcetree's configuration so that git does not get confused by the shared filesystem in WSL and also ignores the executable flags set for certain scripts (as the Windows filesystem cannot currently represent that). *It’s important to do this before checking out any repositories!* If Sourcetree is constantly asking for your credentials, you should make sure you have the [Git Credentials Manager] installed and that in *Tools -> Options*, in the Git tab, the option "Allow Sourcetree to manage my credentials via the Git Credentials Manager" is ticked.

In Sourcetree, make sure the following settings are set in *Tools -> Options*, in the Git tab
tick "Use git bash as default terminal".

Under Git Version check that "Embedded" is chosen (the button should look light gray and pressed down).

We need to further adjust certain git configuration items because the git font projects sources are stored inside the VM filesystem. Open a Terminal window from inside Sourcetree by going to *Action -> Open in Terminal* then type:

`git config --global --add safe.directory "*"`

`git config --global core.autocrlf false`

`git config --global core.filemode false`

Double-check the current configuration by typing:

`git config --list --show-origin`

The *~/.gitconfig* file inside your Windows user profile directory (accessible directly via *%USERPROFILE%* and not the Ubuntu VM inside WSL should have the following lines. Type this to open that file and verify its contents:

`wsl`

`cd ~`

`editor /mnt/c/Users/username/.gitconfig`

or

`editor C:\Users\username\.gitconfig`

(*username* is your Windows username and *editor* is your preferred editor, like VScode for example)

It should contain the following lines:

```
autocrlf = false
filemode = false
[safe]
directory = *
```

Then close that terminal/command prompt window.

#### Clone/checkout and adjust individual projects in Sourcetree

If you have existing project repositories on your local machine, it is important to reclone your projects with Sourcetree rather than manually copying them over.

Clone the project with Sourcetree and set the Destination path to W:

```\home\username\repos\wstechfonts\font-andika-mtihani```

(change *username* to correspond to the username chosen when WSL first set up Ubuntu)

IMPORTANT: because of Sourcetree limitations related to Windows and the WSL filesystem, you need to run the *fix-git-execute-bits-scripts* after you clone a repository to restore the executable bit on certain files, so you can run the various preflight and preglyphs scripts, and any other scripts you may have in tools/. The *fix-git-execute-bits-scripts* script is already part of the Docker image. For example, type:

`anvil up`

`anvil ssh`

`cd ~/repos/wstechfonts/font-andika-mtihani`

`fix-git-execute-bits-scripts`

IMPORTANT: when copying new scripts into your own project, like *makedocs* from the [fontdocs] project, make sure you keep the execute bit or re-apply it afterwards by typing:

`git update-index --chmod=+x makedocs`

and then committing the change.

Now that the Windows/WSL-specific set up is done, you can go back to the main documentation and follow the common steps there:
[Setting up Tools - Step D: Installing anvil](#setting-up-tools.html#step-d-installing-anvil).

## Building Font Projects

Once the container is up and running, you can log into it and see your font project files as shared from the host into the guest. This means you're ready to start building fonts!
*This assumes that you have completed all the steps in [Setting Up Tools].*

Building a font involves numerous steps using various programs, which, if done by hand, would be prohibitively slow. Even working out what those steps are can take a lot of work. By making these processes repeatable, including for a number of fonts at the same time, projects can be shared with others simply, or - better yet - they can be included in a CI (Continuous Integration)   system. This enables fonts to be developed using libre/open source software tools and open, collaborative methodologies.

The main tool used to run the process is [Smith], a Python-based tool for building, testing, and maintaining fonts. It orchestrates and integrates various tools and utilities (many written in Python) to make a standards-based open font production workflow easier to manage. Smith uses a dedicated file, based on Python syntax, at the root of the project - the *wscript* file - to describe how to build the font. By chaining the different build steps intelligently, Smith reduces build times to minutes rather than hours, and makes build, test, fix, repeat cycles very manageable.

The toolchain components (Smith itself and all the various components) are all open and do not place any undue restricted licensing requirements on the user or developer.

Here is a walkthrough of how to download one of SIL's font projects and build it locally.

*Note that this build process is not only for SIL font projects. It will work with any projects that use similar source formats, repository structure and the smith toolchain needed to set up the build according to the wscript file.*

### Checking out a font project repository

MacOS and Ubuntu users can navigate to the font projects folder (*~/repos/wstechfonts* by default) and check out a new font project repository, for example [Andika Mtihani]:

To get into the project font folder, type:

`cd ~/repos/wstechfonts`

`git clone https://github.com/silnrsi/font-andika-mtihani`

This will checkout a local working copy of the git repository into a *font-andika-mtihani* folder within your font projects folder which then will be available from inside the container.

You can use a GUI git client if you'd like on macOS and Ubuntu to do this checking out.  But if you are using Windows, you must use a git GUI client (like [Sourcetree] for example) to do this and only that client. Using git on the command-line either in the VM or the container on the same project will change the index back and forth which will confuse either git client and result in making it extremely slow.

### Starting the container and navigating to the font project folder

To start up the container, type:

`anvil up`

to log into the container, type:

`anvil ssh`

To navigate to the newly checked out repository (by default the container opens a prompt in the */smith* folder which is where all your font projects should be shared from the host computer), type:

`cd font-andika-mtihani`

### Building and running tests

Running the various smith targets assumes that your prompt shows that you are at the root of the font project like */smith/font-andika-mtihani*

To configure the project, this checks if all necessary tools are properly available, type:

`smith configure`

To build the fonts, type:

`smith build`

To run the whole test suite, type

`smith alltests`

To run the FontBakery checks (via the pysilfont profile), type:

`smith fbchecks`

To run the FontSpector checks (via the pysilfont profile), type:

`smith fontspector`

There are times, especially if you've changed the project *wscript*, when you need to wipe the results clean of any temporary artifacts, cache or config files. If at any time you want to start with a fresh build, type:

`smith distclean`

Then to reconfigure and redo a fresh build, type:

`smith configure`

`smith build`

### Reviewing build results

By default the build artifacts will be stored in a *results/* folder inside the project folder (*font-andika-mtihani/results/*). You can simply browse through these files on your host computer with your preferred file manager.

### Building release packages

Smith also supports building release archives in .zip and .tar.xz formats, and in both development and release versions. These contain the fonts, author and licensing information as well as key documentation.

"zip" is the Windows-targeted artifact with Windows line-endings and "tarball" is the macOS/Ubuntu-targeted artifact with Unix line-endings and a .tar.xz extension. The current git hash (the current revision) and a *-dev* suffix will be added to the internal versions and the filenames of the artifacts to help distinguish between development vs. released versions. To produce development versions artifacts, type:

`smith zip`

`smith tarball`

To produce release versions, without the git hash and *-dev* suffix indicating a development version, both in zip and tar.xz formats, type:

`smith release`

### Debugging smith targets

If a smith step generates an error, and the existing logs don't help, you can increase the verbosity of that particular build step by typing, for example: (the more v added the more verbosity)

`smith build -vv`

`smith pdf -vvv`

If the whole system becomes unresponsive, you may also need to restart Docker. Use *Restart* from the system tray menu, and failing that, *Quit Docker Desktop*, then start it again from your apps menu.

## Modifying Font Sources

If you want to make modifications to our font projects, you are very welcome to do so under the terms of the [SIL Open Font License]. Here is the workflow we use to develop and modify our fonts, with some tips for those of you wanting to redistribute modified versions (derivatives).

### Getting the latest version of the font sources

#### Checking out Andika-mtihani

To get into the container, type:

`anvil ssh`

(If the container is not already running it will do an `anvil up` for you as well)

`git clone https://github.com/silnrsi/font-andika-mtihani`

Before you begin making any changes, please be sure you have the most recent version of the source files. If you've just checked out (cloned) the project you will have the latest, however if it's been a few days (or months) be sure to update your local copy. In git terminology, be sure you "pull" changes.

### Changing font names to identify different versions

You will want to pick a new name for your modified font so it won't be confused with the original font. Almost all SIL fonts have [Reserved Font Names (RFNs)], so if you modify and redistribute the fonts, you will need to pick a name that does not contain any RFN. In the case of Andika Mtihani you cannot use a name that includes "Andika" or "SIL". But you can pick something creative. IOW you can't modify Andika Mtihani and redistribute the modified version as "Andika Mtihani" or any name containing "Andika" or "SIL".

Even for ongoing development of your own OFL font, in alpha or beta stage, and no RFNs are declared, you should consider using a different temporary name that indicates clearly that this is not the final released version that end-users should get and expect to be finished.

There are a few places where names appear in the source files and may need to be changed, but remember to add your own and do not delete any of the previous copyright statements in the headers. Filenames can change of course.

- OFL.txt — *copyright statement*
- FONTLOG.txt — *add information on your new derivative*
- UFO fontinfo.plist — *in many places!*
- Designspace files — *both sources and instances*
- Filenames

### Making changes

There are many ways to change the fonts:

- __Manually edit the files with a text editor.__ This is especially useful for metadata changes, such as those in the UFO fontinfo.plist and designspaces.
- __Use scripts to make changes__, such as those provided in [pysilfont scripts]. This is useful for making changes that affect many files or glyphs at the same time.
- __Open the UFOs in GUI design apps__, such as [Glyphs], [Robofont], [FontForge] or [Fontra]. These require extra effort, as these apps tend to make massive changes to the fonts that have to be controlled and managed. In some cases, import/export can cause data loss, so be careful! See the section on [Using GUI font design tools](#using-gui-font-design-tools).

__If you modify the fonts or related files you likely need to normalize the fonts before committing the changes to your repository - see next section.__

### Normalizing and committing your changes

The UFO3 source format is a bit unusual (and frustrating) in that it does not always specify how some bits of data are formatted (for example, integers or floats) or organized (for example, the sorting of keys in fontinfo.plist). Because of this, tools are free to interpret *and write out* the UFOs in inconsistent ways, making change tracking and version management difficult.

The solution is *normalization* - a process that formats and organizes UFOs in a consistent manner. Normalization can be done with a [pysilfont] command: [psfnormalize]. Our projects, however, have a very simple way to normalize all the UFOs in a project, synchronize the metadata between family members, and update the UFOs from auxiliary data — *preflight*.

Whenever you change anything in the project, start up your container, type `anvil ssh` to log into it, then navigate to the project folder ( for example `cd font-andika-mtihani` ) and run:

`./preflight`

This will get the UFOs back into a consistent format and isolate only the specific changes you've made. Then you can use a git client to review the changes and commit those you wish to keep.

*If you want to eventually contribute any changes back to the original projects, your UFOs must be fully normalized and synchronized.*

### Using GUI font design tools

Many font design changes are best done with dedicated font editors, such as [Glyphs]. All the major font editors now support the UFO3 font format, however the level of their support differs greatly and each one still has some rough edges. The subsections below give specific guidance on using each editor successfully. *In some cases we don't yet have a well-tested and established workflow. We'll add details for each tool as we complete testing.*

There are some general principles to keep in mind when using font editors with our projects:

- Consider editor-specific file formats (.glyphs, .glyphspackage, .sfd, .vfb, .vfc, .vfj, etc.) as temporary working files only. It can be helpful to temporarily save into these formats, but always write out your changes to the UFOs.
- Don't commit editor-specific files to the repositories. An exception to this is for archive sources stored in *source/archive/*.
- Don't expect to be able to generate fonts from within the editor and end up with fonts that work just like the originals. You will need to run our build process (using the container and the smith toolchain) to rebuild the fonts.
- OpenType code can't be fully edited in these editors, as most of our projects maintain the OpenType code in .fea or .feax files outside the UFOs. Instead, edit the .fea/.feax files directly with your preferred text editor, run the build, and check the test results. That's not ideal but it is currently the only way to work around the peculiarities of individual editors.
- Import/export with editors can cause data loss. The workflows described below attempt to minimize this, but be aware that it can occur.
- When committing changes to projects, be selective about what you commit. You may need to ignore/discard changes that relate to specific editor use. Selective commits can be a good workaround for data loss!

#### Glyphs

We currently use the [Glyphs] font editor (version 3.x) to take care of the design side of font creation. It is a closed-source, macOS-only tool, but it's well-maintained, has many open plugins and extension scripts, and provides decent support for open formats. Thankfully, there is also a libre/open source python library called [glyphsLib](https://github.com/googlefonts/glyphsLib) which provides cross-platform read and write support for the native [source format of Glyphs](https://github.com/schriftgestalt/GlyphsSDK/tree/Glyphs3/GlyphsFileFormat) the *.glyphs* file.

To load the current font sources into Glyphs, we do not open the UFOs directly. Instead, we use the following process using project-specific scripts (run from within the container, or alternatively you can install the necessary libraries in your macOS computer via a simple shell script [update-preflight-libs-pyenv.sh](https://github.com/silnrsi/pysilfont/blob/master/preflight/update-preflight-libs-pyenv)):

- Type `./preglyphs` from the individual project folder using the terminal. This synthesizes a temporary *.glyphs* file from the existing UFO sources and corresponding designspaces.
- Open the *.glyphs* file in Glyphs, make your changes, and save.
- Type `./preflightg` from the individual project folder. This reads the *.glyphs* file and exports UFOs, and then runs all the steps in the normal *preflight* script to normalize and sync the UFOs.
- Review the changes in your git client and commit (then push) the changes you wish to keep.

This is the best tested and recommended method for modifying fonts with a dedicated font editor. *Most of our projects include these scripts.*

Technical detail: Due to limitations of the glyphsLib library the Glyphs file that this roundtrip process uses follows the Glyphs2, not Glyphs3, format. Version 3.x of the Glyphs app fully supports the Glyphs2 format, however some newer Glyphs-specific features are not supported.

#### Robofont

[Robofont] version 4 uses UFO3 as its native format, and does not require a special script prior to using it. Please use the latest release! The workflow is simple:

- Open individual UFOs in Robofont, make changes, save.
- Run `./preflight` to normalize and sync — *this is important!*
- Review the changes in your git client and commit (then push) the changes you want to keep.

You'll notice that Robofont may add a few things to the UFOs that remain even after normalization. You can feel free to add these if you want, but please don't contribute them to our projects later on. An example:

- a lib.plist key: *com.typemytype.robofont.segmentType*

There may also be some other additions depending on the project or Robofont 4 version.

#### FontForge

Recently released version of [FontForge] - starting from version 20230101 - have vastly improved UFO3 support. It's important to use release since then and also be sure that your version of pysilfont is current, as we have recently added built-in support for handling FontForge-produced UFOs. The workflow is:

- Open individual UFOs in FontForge, make changes *(but do not save!)*
- Choose File / Generate Fonts... and specify the output format as *Unified Font Object (UFO3)*, replacing the original UFO. *You can now quit FontForge - there is no need to save the file.*
- Type `./preflightff` to normalize and sync. Note that this is a special FontForge-specific version of *preflight*.
- Review the changes in your git client and commit the changes you want to keep.

Note: Most of our projects do not have the special *preflightff* script yet. If the project doesn't yet have it you can run the normal `./preflight`, but be aware that, if there are background glyphs, FontForge will copy anchors and Unicode values between layers. You can avoid this by creating your own *preflightff* script based on the example in [Andika Mtihani preflightff]. We'll be adding *preflightff* files to our projects as soon as we can.

This FontForge workflow works well, but there are two issues that you may encounter:

- If the UFO contains a features.fea file, FontForge will likely change it considerably. You will want to use your git client to discard any changes to that file prior to commit.
- FontForge will remove any `note` elements it finds in .glif files.

It is also possible to use FontForge on another OS (and macOS in particular) to modify the UFOs in a folder shared with the container, then switch to the container and run *preflightff* there.

#### FontLab 

Recent versions of FontLab have improved UFO3 support, however there are still significant issues. We hope to provide a workflow for FontLab at some point, however it is not a high priority for us as we no longer use FontLab ourselves as our primary font editor.

#### Other font editors

Other font editors will be reviewed and their workflow steps described here in the future.

## Contributing Changes

Making changes is one thing, contributing changes so that they can become part of the original project and not another derivative is something else. Sometimes the change is small enough that you may not want to continue maintaining your own derivative longer-term but you'd rather have the changes be available to everyone in a newer version of the original font project.

We want to keep the process of accepting changes low friction but we will be reviewing the changes thoroughly before integrating them. Like for other open software projects, contributing a change does not mean an absolute guarantee that it will be included but it certainly helps!

To maximize your chances of getting changed merged back into an original version you need to consider the following:

- making sure changes are expressed in open formats for interoperability: like UFO or other similar non-opaque open standards-compliant file format
- preparing changes so they are correctly isolated from other changes (a minimal working example) and can easily be tested with corresponding data
- optionally providing the FONTLOG entry corresponding to the proposed change
- opening a Github issue to describe the proposed change in the appropriate repository
- understanding the way copyright and the [OFL (SIL Open Font License)] work and how to fill in an copyright statement and font metadata appropriately:
this means updating the copyright statement to add an extra entry but without removing any existing ones. There may be a CLA (Contributor's License Agreement) to take care of as well. Making sure that authorship is above board and that changes are properly credited is essential. The [OFL-FAQ] is a great resource to answer your questions. You should read it. 
- making a patch/diff or a branch publicly available with the changes, then submitting a PR (Pull Request) or MR (Merge Request) in the original project.

We hope you will enjoy building our open fonts, adapting them to your local needs and maybe also contributing something back to the original version. You will be properly credited with any changes you contribute back which gets included in the original version. 

Please [get in touch](/support/contact/) if you have any feedback. 

[Andika Mtihani]: https://github.com/silnrsi/font-andika-mtihani
[Andika Mtihani preflightff]: https://github.com/silnrsi/font-andika-mtihani/blob/master/preflightff
[Building Font Projects]: #building-font-projects
[Configuring WSL]: #configuring-wsl
[designspace]: https://github.com/fonttools/fonttools/tree/main/Doc/source/designspaceLib/index.rst
[Docker]: https://www.docker.com
[.fea format]: https://github.com/adobe-type-tools/afdko/blob/develop/docs/OpenTypeFeatureFileSpecification.md
[.feax format]: https://github.com/silnrsi/pysilfont/blob/master/docs/feaextensions.md
[fontdocs]: https://github.com/silnrsi/fontdocs
[FontForge]: http://www.fontforge.org/
[FontLab VI]: https://www.fontlab.com/font-editor/fontlab/
[Fontra]: https://fontra.xyz
[FTML]: https://github.com/silnrsi/ftml
[GDL (Graphite Description Language)]: https://silnrsi.github.io/graphite/graphite_devFont#fontDev
[Git Credentials Manager]: https://github.com/git-ecosystem/git-credential-manager
[Git]: https://git-scm.com/
[GitHub]: https://github.com/
[Glyphs]: https://glyphsapp.com/
[glyphsLib]: https://github.com/googlei18n/glyphsLib
[Modifying Font Sources]: #modifying-font-sources
[OFL-FAQ]: https://openfontlicense.org/ofl-faq
[OFL (SIL Open Font License)]: https://openfontlicense.org
[psfnormalize]: https://github.com/silnrsi/pysilfont/blob/master/docs/scripts.md#psfnormalize
[pysilfont]: https://github.com/silnrsi/pysilfont
[pysilfont scripts]: https://github.com/silnrsi/pysilfont/blob/master/docs/scripts.md
[Repository Structures]:  #repository-structures
[Reserved Font Names (RFNs)]: https://openfontlicense.org/ofl-reserved-font-names/
[RoboFont]: https://robofont.com/
[Setting Up Tools]: #setting-up-tools
[SILE]: https://sile-typesetter.org/
[SIL Open Font License]: https://openfontlicense.org
[SIL's open font projects]: https://software.sil.org/fonts
[SIL's WSTech team]: https://software.sil.org/wstech
[Smith]: https://github.com/silnrsi/smith
[Source Formats]: #source-formats
[Sourcetree]: https://sourcetreeapp.com/
[TeX]: https://tug.org/xetex/
[UFO3 format]: https://unifiedfontobject.org/versions/ufo3/
[Workflow Overview]: #workflow-overview
