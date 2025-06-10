
# Contributing to WSTR (Writing Systems Technical Resources)

A step-by-step guide to the recommended WSTR contributor workflow. *(This guide is intended only for WSTech, specifically contributors with write access to the [WSTR git repository](https://github.com/silnrsi/wstr)).*

You have two ways to contribute to WSTR: either directly from your browser in a hosted editor, or by using a local text editor and then pushing to the git repository manually. In both cases, contributors are authenticated via their GitHub account. It's recommended to stick with one approach per entry and not mix the two.

*The [Style Guide](https://writingsystems.info/reference/styleguide/) is useful no matter which approach you use. Remember that, although we have not advertised the URL very widely, this is a public website, and ongoing drafts are also stored in public branches. So you must not draft or publish private information and you must credit your sources and honor existing copyright and licensing statements.*

## Contributing or modifying an entry using your browser

WSTR is using Decap, a [headless web-based editor](https://decapcms.org/) configured to work with a [shared public git repository](https://github.com/silnrsi/wstr) and the [Starlight documentation theme](https://starlight.astro.build/) built on the [Astro framework](https://astro.build/). It's designed to run directly in your browser to help you add or modify existing entries.

To contribute or modify an entry:

- Go to the [WSTR admin interface at https://writingsystems.info/admin]( https://writingsystems.info/admin)
- Click on the **Login with GitHub** button
- Authorize your GitHub account to be used for Decap

In the admin interface, you will see a **Contents tab** to the left with the various sections called "collections". These represent the major topics. You can browse through the existing entries available under the different sections.

**Clicking on an entry** will bring up the content in edit mode.

Push the slider to the right (from Rich Text to Markdown) to be able to see the markdown source and to edit it directly. You can review and modify existing entries. (Markdown is the preferred option rather than Rich Text).

The **Workflow tab** allows you to see the statuses of the various entries currently being worked on. There are only three statuses: **Draft, In Review** and **Ready** and you can switch back and forth as needed. Once you click on an entry, you will be in edit mode.

The required frontmatter fields are **title, description and sidebar/order**, others are optional. The Order number corresponds to the WSTR classification from 1000 to 9999. See the WSTR classification spreadsheet.

Once you have made the desired changes to the entry, you can use the buttons at the top to save your changes or go back to other entries. Currently the workflow does not enforce a moderation step or require a review from someone else.

To publish your changes you need to change the status to Ready, then click on **Publish -> Publish Now**.
(If you press Publish-> Publish Now while still in draft, it will tell you that you need to change the status to In Review.) After confirming, your entry is now in **status Published**.

Bear in mind that the **View Live link** on the top right may not yet show all your modifications because fresh changes are still being generated. This workflow relies on git branches and PRs done in the background. When automatically merged back to the main branch, changes to the content get rebuilt by GitHub Actions and published to the website at [https://writingsystems.info/](https://writingsystems.info/). It may take up to a minute for all the content to be published. It will probably get a bit longer as we add more content, so it's not instant but not too long either.

## Contributing via your text editor (with local preview and git)

The beauty of Markdown is that you can use your preferred editor to author and modify it. You can also have a local preview that is faster than waiting for the whole site to be rebuilt. In this guide we are recommending VScode with a markdown preview extension. You can preview the entry you are currently working on directly or you can build the whole site locally and see your entry full integrated with the rest of the content like it would be on the live version.

To contribute or modify an entry, you have two ways of doing it locally:

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
npm install
npx astro dev --host --open
```

Then click on the link to point your browser to the local instance of WSTR running in the container. Now, all the changes you make to the various documents under `src/content/docs/` will be updated live in your browser. The Terminal panel should show *"watching for file changes..."*

You can stop the service by typing Ctrl-D (or Ctrl-C).

(If you want to halt, or remove up the container, the easiest is to manage the container via Docker Desktop.)

*Bear in mind that he search facility at the top is not active for a local container.*



When you are happy with the changes you made to the Markdown files, you can commit and push them to git in the usual way. GitHub Actions will then pick up your commits, generate the whole website again and publish everything to [https://writingsystems.info/](https://writingsystems.info/)

Note: You might like to run a linter in VSCode like Markdownlint to help you catch potential Markdown errors. Your Problems tab will reveal issues but you can also close it if it becomes too noisy.
