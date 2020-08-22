# Blogli

A simple static site generator.

## Goals:
- Use Markdown
- Support just enough templating for a simple content site
- Fast and light

## Example:

### Site Structure
```
├── blogli.json
├── content
│  ├── blog
│  │  ├── 2020-08-15.md
│  │  └── 2020-08-16.md
│  └── posts
│     ├── about.md
│     └── home.md
└── templates
   └── site.html
```

### Blogli Config (`blogli.json`)
```json
{
  "paths": {
    "targetDir": "output",
    "sourceDir": "content",
    "templates": "templates",
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

### TODO:

- [x] Asset config for public assets
- [ ] Templates:
    - [ ] flexible enough for collection index pages
    - [ ] nested templates (header, footter?)
- [ ] Index page for collections
- [ ] Custom highlighting functions 
- [ ] Checkbox parsing and rendering
- [ ] Create markdown-it configs (html, link thing, typographer thing)
