
# Contributing to WSTR (Writing Systems Technical Resources)

A step-by-step guide to the recommended WSTR contributor workflow. *(This guide is intended only for WSTech, specifically contributors with write access to the [WSTR git repository](https://github.com/silnrsi/wstr)).*

You can contribute to WSTR by using a text editor and then pushing to the git repository manually. Contributors are authenticated via their GitHub account.

*The [Style Guide in the Devteam section](https://writingsystems.info/devteam/) is useful no matter which approach you use. Remember that, although we have not advertised the URL very widely, this is a public website, and ongoing drafts are also stored in public branches. So you must not draft or publish private information and you must credit your sources and honor existing copyright and licensing statements.*

## Contributing or modifying an entry

WSTR is build from a [shared public git repository](https://github.com/silnrsi/wstr) using the [Starlight documentation theme](https://starlight.astro.build/) and the [Astro framework](https://astro.build/).

To contribute or modify an entry you simply edit the Mardown sources directly. The beauty of Markdown is that you can use your preferred editor. You can also have a local preview that is faster than waiting for the whole site to be rebuilt. In this guide we are recommending VScode with a markdown preview extension. You can preview the entry you are currently working on directly or you can build the whole site locally and see your entry fully integrated with the rest of the content like it would be on the live version.

### Using VScode (or any Markdown editor) without the local Docker container

The simplest method is just editing the Markdown files and seeing your changes previewed locally within your editor. When opening the repository folder in VSCode, simply decline to click **Reopen in Container** and close the dialog box, then open and modify the files with your editor and review the results via a local previewer. Or you can pick any Markdown-capable text editor. This won't give you the full integration with the rest of the website but it's still very useful for checking your changes before contributing.

- make sure you have a full local checkout (clone) of the WSTR git repository *(Windows users should really check out their git repositories inside a WSL share for speed and for changes to be picked up properly)*

- Open the folder by going to **File -> Open Folder** from VScode directly and browse to your local WSTR git repository. You should only add or modify files in `src/content/docs/`.

### Using VScode with a local Docker container

The more advanced method is using the Dev Containers capability of VScode to spin up a container that recreates the website as it would on the live website.

- make sure you have a full local checkout (clone) of the WSTR git repository *(Windows users should really check out their git repositories inside a WSL share for speed and for changes to be picked up properly)*
- open the local repository with VScode by typing:

```bash
cd ~/repositories/wstr (or wherever you checked it out)

code .
```

Or you could do **File -> Open Folder** from VScode directly and browse to your local WSTR git repository. You should only add or modify files in `src/content/docs/`.

VScode will then show you a dialog box in the bottom right-hand corner indicating *"Folder contains a Dev Container file, Reopen folder to develop in a container"*.

Press the **Reopen in Container** button. This will build the container and automatically install various components inside. It takes a moment but it will tell you when it's done.

Click on the Terminal tab, then type:

```bash
npm ci
npm run dev
```

(ci stands for clean-install)

Then click on the link to point your browser to the local instance of WSTR running in the container. Now, all the changes you make to the various documents under `src/content/docs/` will be updated live in your browser. The Terminal panel should show *"watching for file changes..."*

You can stop the service by typing Ctrl-D (or Ctrl-C).

(If you want to halt, or remove up the container, the easiest is to manage the container via Docker Desktop.)

*Bear in mind that the search facility at the top is not active for a local container.*

When you are happy with the changes you made to the Markdown files, you can commit and push them to git in the usual way. GitHub Actions will then pick up your commits, generate the whole website again and publish everything to [https://writingsystems.info/](https://writingsystems.info/)

Note: You might like to run a linter in VSCode like Markdownlint to help you catch potential Markdown errors. Your Problems tab will reveal issues but you can also close it if it becomes too noisy.
