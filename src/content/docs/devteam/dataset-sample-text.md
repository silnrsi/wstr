---
title: Dataset - Sample text
lastUpdated: 2026-05-12
---

:::note
This is a guidance document for authors, primarily the Writing Systems Technology (WSTech) team.
:::

## File location(s)

`src/data/google-fonts-samples.json`

## Data format and model

It is a JSON file, which contains a single large object. It maps langtag keys, consiting of langauage and script subtags only, to a short utf-8 string value, which contians neutral text of 40-60 characters in length.

## Source and licensing

The data was extracted from the `styles` field of each language's `.textproto` file. These files came from the [Google/fonts github repository lang subrepo][google-fonts-lang-data]. See the [History][history] section for the date of retrieval. The `lang` subrepo is made available by Google LLC under the [Apache 2.0 license][apache-2.0].

[apache-2.0]: https://spdx.org/licenses/Apache-2.0.html
[google-fonts-lang-data]: https://github.com/google/fonts/tree/main/lang/Lib/gflanguages/data/languages
## Uses

This data is used to provide language specific sample text for use by the LFF `<Family />` component. This component displays representative text in the target language with the webfont which the LFF API returned. This is used in turn by the Language Font Finder Frontend <Browser /> component to present each family in the LFF API response.

## History
|||
|---|---|
|2026-05-11| Downloaded and extracted the `styles` sample text from commit `5835bfbb`, before converting to a JSON file. |

## Maintenance processes

### Amending the data

You can edit the data set file to add, remove, or correct any sample text you wish.  Property keys must always use a langtag consiting solely of language and script subtags. It is recommended add new languages to the end of the file, keeping our additions clustered in case we need to update from the google fonts source using a merge tool.

### Regenerating 

This is currently a highly manual process, but it should very rare. This will be scripted in the future:
1.Check out the Google/fonts repo:
    ```sh title="Checkout source repo"
    git clone https://github.com/google/fonts .vendor/google-fonts
    ```
2. `cd` to `.vendor/google-fonts/lang/Lib/gflanguages/data/languages`
3. Run the following command to extract the relevant field and convert it to a list of JSON properties:
    ```sh title="Extract sample text"
    grep -H 'styles:' *.textproto | cut -d: -f1,3- | sed -r 's/^(.*)\.textproto/"\1"/' > ../../../../../../../src/data/google-fonts-samples.new.json
    ```
4. Using a text editor insert the missing `{` and `}` as the first and last lines to get a correctly formated JSON file.
5. Use you favourite merge tool (Meld is a good example, as is VSCode) to merge changes from the new file into the current file.
6. Delete `src/data/google-fonts-samples.new.json` when the merge is complete.