// Specify the file extension you want to import
declare module "*/sources.yaml" {
  type Entry = {
      abstract?: string,
      addendum?: string,
      author?: string,
      annotation?: string,
      booktitle?: string,
      date?: string,
      editor?: string,
      entrytype: NonNullable<"@article" | "@book" | "@inbook" | "@inproceedings" | "@misc" | "@online">,
      entrysubtype?: 'f',
      isbn?: string,
      issn?: string,
      journaltitle?: string,
      keywords: [string],
      location?: string,
      number?: string,
      organization?: string,
      pages?: string,
      presort?: integer,
      publisher?: string,
      series?: string,
      sortname?: string,
      title: NonNullable<string>,
      url?: string,
      urldate?: string,
      volume?: string,
  };
  const value: Readonly<Record<string, Entry>>; // Add type definitions here if desired
  export default value;
}
