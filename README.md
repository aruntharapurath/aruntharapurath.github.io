# aruntharapurath.github.io

## Local preview

From this folder, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000 in your browser. Stop the server with Ctrl+C.

Use this URL instead of double-clicking `index.html`: browsers block the
resume download's file request when the page is opened through `file://`.
GitHub Pages serves the site over HTTPS and does not have this local-file restriction.
