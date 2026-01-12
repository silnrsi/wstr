---
title: Adding and Revising Content
lastUpdated: 2025-11-21
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## Articles and Topic Pages

### Adding an article that you will write

- If the article will be in the Topics sidebar
    - Go to the WSTR Classification spreadsheet
        - If the page is not something that already is listed add it in a sensible place and and assign a Topic number. Consult VG if you need help.
        - Fill in columns D-G
- (In all cases) Create a new Github issue
    - Begin the issue title with the Topic number if it should be in sidebar
    - Assign yourself
    - Assign Label `article`
    - Set Milestone to the upcoming one (unless you want to delay it for a few months)
    - Choose Create - the issue will be automatically assigned to the WSTR project and placed in the Backlog
- Make the page
    - Create an .md (or .mdx) page in the appropriate location (see [File Location and Frontmatter Reference](/devteam/file-location-and-frontmatter-reference))
    - Add any images to an `images` folder in the same location
    - Fill in frontmatter - the easist way to do this is to copy the frontmatter of a similar page and revise it as needed
        - `title:` and `lastUpdated:` are required
        - `sidebar:` properties are only needed for Topic pages
        - `tags` should be assigned (see [Tags](/devteam/file-location-and-frontmatter-reference#tags))
    - Write the content
    - If you are using any Components or want to check the content yourself before publishing preview it locally using Docker
- (Optional) If you feel that you want the content to be reviewed even before committing a draft to the live site, then use one of these methods:
    - Create a new branch in the repo named for the page (e.g. `content/encoding-conversion`) and commit the draft to it
    - Place the content in a temporary Google doc
    - Send the content to someone via email
- Commit changes to the project repo and push
    - Be sure you've pulled changes first!
- Update Github issue
    - Change issue Project Status to Ready for Review
    - Reassign the issue to whoever will review it
- Contact the reviewer and ask them nicely to look it over
- For Topic articles (only) update the status in the WSTR Classification sheet

### Suggesting an article that someone else should write

- If the article will be in the Topics sidebar
    - Go to the WSTR Classification spreadsheet
        - If the page is not something that already is listed add it in a sensible place and and assign a Topic number. Consult VG if you need help.
        - Fill in columns D-G
- (In all cases) Create a new Github issue
    - Begin the issue title with the Topic number if it should be in sidebar
    - Assign someone to write it - if you know who that is and think they would do it (you may want to ask first) otherwise leave it unassigned
    - Assign Label `article`
    - Set Milestone to the upcoming one if you think it should be written soon
    - Choose Create - the issue will be automatically assigned to the WSTR project and placed in the Backlog

### Reviewing an article

- Check that:
    - Main content (both text and images) is correct and well communicated
    - Style is consistent with the guidelines in the [Style Guide](/devteam/style-guide)
    - There are no typos or obvious spelling or grammar mistakes
    - All the links work
    - Frontmatter includes all that is needed
    - Appropriate tags are defined
    - The file is in a sensible location (in a Topic folder or the Article Library)
- If you are not confident about checking some things (e.g. spelling) then ask someone else to look it over too
- If there are changes that the author should make
    - Reassign the Github issue to the author
    - Change the Project Status to In Progress
- If needed changes are minor or trivial (e.g. fixing a typo)
    - Fix it
    - Commit your changes
    - Unassign the Github issue
    - Change the Project Status to Complete - this will close the issue automatically
    - For Topic articles (only) update the status in the WSTR Classification sheet
- If it is perfect with no needed changes
    - Congratulate the author
    - Unassign the Github issue
    - Change the Project Status to Complete - this will close the issue automatically
    - For Topic articles (only) update the status in the WSTR Classification sheet


## Links and bibliographic sources

(coming soon)

