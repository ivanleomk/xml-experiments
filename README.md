# XML Experiments

This is a repository for experiments using XML to render content in a chat interface. I'm currently using the deepseek chat api to generate the content and react-markdown to render the content.

This is a work in progress so I apologize in advance for any bugs or issues.

Do make sure that you have a DEEPSEEK_API_KEY environment variable set in your .env file before running the app.

Currently we support two form of XML tags

- <thinking> : This represents a thinking block. It is used to represent the thinking process of the AI. This has a <title> and <content> tag that is nested within so that we can render the content in a markdown format.
- <citation> : This represents a citation. It is used to represent a citation from the user's data. We use the id to identify the specific original item and the title to render a title for the citation.

You can refer to the prompt to see how these tags are used

```
<thinking>
    <title>Determining the Capital of Turkey</title>
    <content>
      To answer the question "What is the capital of Turkey?", I need to recall or verify the current capital city of Turkey.
    </content>
  </thinking>

  I know that Turkey is a transcontinental country located mainly on the Anatolian Peninsula in Western Asia, with a smaller portion on the Balkan Peninsula in Southeast Europe.

  <citations>
    <citation id="1" type="email" title="Citation title">This was a citation</citation>
  </citations>
```
