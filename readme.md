# Underlined Definitions PureJS version 1.0.1 by Andrey Laguta

Create underlined definitions for your choosed words and definitions.

License: [MIT](https://mit-license.org)

[![Underlined Definitions](https://ckkz-it.github.io/underlinedef-purejs/img/javascript.png "Underlined Definitions")](https://ckkz-it.github.io/underlinedef-purejs/)

## Requirement

Recommended: Babel (or you can just use minimized version, which is already optimized for old browsers)

## Demo
[View demo](https://ckkz-it.github.io/underlinedef-purejs/)

## Compatibility
Modern Chrome, Firefox, Opera, Safari

IE is not supported due to Object.assign

For IE9+ compatibility use jQuery version

## Usage
Underlined Definitions let you describe choosed words all over your site just by setting two arrays, Words and Definitions, which matches each other

You just define two arrays in your `main.js` and then call the plugin to the selector, in which you want words to be described.

````html
<body>
  ...
  <div class="wrapper">
    <div>
      ...
      <p>...</p>
      ...
    </div>
    <p>...</p>
    <p>...</p>
    <span>...</span>
    <p>...</p>
    ...
  </div>
  ...
</body>
````
Choose one or multiple selectors. It could be, for example, `<p>` paragraphs, `<div>` wrappers or just `<body>` tag. Or some of them listed one after another. I recommend use any classes, id's, tags but `<body>` and whole page wrappers, because it may slow down page render.

````javascript
underlineDef(".wrapper", {
  words: wordsArray,                       // Your words array you want to describe.
  definitions: definitionsArray,            // Your definitions array for chosen words. Remember, they have to match each other.

  // These are two required options, other are optional

  underlineClass: 'underline-definitions', // This class is defined in plugin and attached to head wrapped in style tag, if another class isn't defined. To use your own class, just set it in this option and edit in your stylesheet file as usual.
  tagName: 'span',                         // Default tag to wrap chosen words in.
  attr: 'title',                            // Default attribute for definitions. If you want to use custom tooltips for definitions, change attr to 'data-title' or other which is used in your custom tooltips plugin.
  search: false,                           // You can add search onclick event for words. Availiable options: "google", "wikipedia", "yandex". Also, you can add your own search engines in javascript source file.
  preventDefault: false                   // Use when "search" option is set. Useful if tagName is "a" and you want to prevent default action.
});
````

And that's it. Chosen words should be underlined on your pages.


## Other Resources
- [jQuery-UnderlineDefinitions.js: jQuery version of plugin.](https://github.com/ckkz-it/underlinedef-jquery)
