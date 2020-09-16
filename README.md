# Blogli

A simple static site generator.

## Goals:
- Use Markdown
- Support just enough templating for a simple content site
- Fast and light

## Example:

See https://github.com/JimSchofield/blogli-test-setup for an example project config and templates.

### Site Structure
```
.
├── blogli.json
├── content
│  ├── about.md
│  ├── assets
│  │  └── test.css
│  ├── blog
│  │  ├── 2020-08-15.md
│  │  ├── 2020-08-16.md
│  │  └── 2020-09-04.md
│  ├── index.md
│  └── posts
│     ├── cow.md
│     ├── dog.md
│     └── index.md
├── shortcodes
│  ├── checkbox.js
│  └── test.js
└── templates
   ├── footer.js
   ├── header.js
   ├── indexPages.js
   └── site.js
```

### Blogli Config (`blogli.json`)
```json
{
  "title": "Blogli Site Title",
  "paths": {
    "targetDir": "output",
    "sourceDir": "content",
    "sourceAssetsDir": "content/assets",
    "targetAssetsDir": "assets"
  },
  "collections": {
    "include": ["posts", "blog"]
  },
  "prismjs": {
    "languages": ["javascript", "python", "rust"],
    "theme": "twilight"
  },
  "address": "http://www.mysite.com/",
  "seo": {
    "defaultDescription": "Here is the default site description",
    "defaultImage": "http://placehold.it/300"
  },
  "shortcodes": ["checkbox", "test"]
}
```

All paths are relative to where you run blogli with the exception of `targetAssetsDir`.  `targetAssetsDir` is relative to `targetDir`, so that the assets path can be used directly in linking css, js, or other assets in the rendered html.

## Commands
Until this project is put on npm, clone to your computer and install/link by running `npm install` and `npm link`

To build your blogli site, use `blogli` in the root of your site directory (where `blogli.json` is).

- `blogli` - build site
- `bligli-serve` - Build site and start `http-server`
- `blogli-watch` - Build site, start a server, and watch files for changes

## Todo
Tasks and todos moved to github projects
