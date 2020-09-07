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
│  ├── index.md
│  ├── about.md
│  ├── assets
│  │  └── test.css
│  ├── blog
│  │  ├── index.md
│  │  ├── 2020-08-15.md
│  │  ├── 2020-08-16.md
│  │  └── 2020-09-04.md
│  └── posts
│     ├── index.md
│     ├── 2020-08-15.md
│     └── 2020-08-17.md
└── templates
   ├── footer.js
   ├── header.js
   ├── indexPages.js
   ├── newLayout.js
   └── site.js
```

### Blogli Config (`blogli.json`)
```json
{
  "title": "Blogli site!",
  "paths": {
    "targetDir": "output",
    "sourceDir": "content",
    "templates": "templates",
    "sourceAssetsDir": "content/assets",
    "targetAssetsDir": "assets"
  },
  "collections": {
    "include": ["posts", "blog"]
  },
  "prismjs": {
    "languages": ["javascript", "python", "rust"],
    "theme": "twilight"
  }
}
```

All paths are relative to where you run blogli with the exception of `targetAssetsDir`.  `targetAssetsDir` is relative to `targetDir`, so that the assets path can be used directly in linking css, js, or other assets in the rendered html.

### Commands
Until this project is put on npm, clone to your computer and install/link by running `npm install` and `npm link`

To build your blogli site, use `blogli` in the root of your site directory (where `blogli.json` is).

To build and server your output folder, run `blogli-serve`

### TODO:
- [ ] Meta/social tag generation
- [ ] Checkbox parsing and rendering
- [ ] Watchman integration
- [ ] Default project generator
- [ ] Custom highlighting functions 
- [ ] Image processing (sourceset, resizing)
- [ ] Create markdown-it configs (html, link thing, typographer thing)
- [x] Pages
- [x] Separate types into their own folder
- [x] Templates:
- [x] Index page for collections
- [x] Asset config for public assets
