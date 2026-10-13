# Edglex Website

Static HTML website for [edglex.com](https://edglex.com).

## Structure

- `index.html` — landing page
- `blog/index.html` — blog listing (39 migrated posts)
- `blog/<slug>.html` — individual blog posts
- `legal/index.html` — disclaimer
- `privacy/index.html` — privacy policy
- `terms/index.html` — terms of use
- `support/index.html` — support
- `CNAME` — GitHub Pages custom domain

## Provenance

Edglex consolidates 3 former legal research sites: findmyloophole.com,
lawgaps.com, and legalexception.com. Their 39 blog posts (13 each) were
migrated here on 2026-07-29 with canonical URLs updated to edglex.com.

## Design

Pure static HTML with inline styles. No build system. No external CSS.
Accent color: #4338ca (indigo).

## Adding blog posts

Use the `new-blog-posts` skill: skill("new-blog-posts")