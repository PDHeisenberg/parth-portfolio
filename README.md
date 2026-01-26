# Parth Dhawan Portfolio

A modern, scalable portfolio website built with vanilla JavaScript and Vite.

## Features

- 🎨 **Bento Grid Layout** - Modern card-based design
- ⚡ **Fast** - Built with Vite for optimal performance
- 📱 **Responsive** - Works on all devices
- 🎯 **SEO Friendly** - Proper meta tags and semantic HTML
- 🔄 **Client-side Routing** - Smooth navigation without page reloads
- 📝 **Data-driven** - All content centralized in `src/data/content.js`

## Project Structure

```
parth-portfolio/
├── index.html              # Entry point
├── src/
│   ├── main.js            # App initialization
│   ├── router.js          # Client-side routing
│   ├── components/
│   │   ├── pages.js       # Page rendering
│   │   └── icons.js       # SVG icons
│   ├── data/
│   │   └── content.js     # All portfolio content
│   ├── styles/
│   │   └── main.css       # Styles with CSS variables
│   └── assets/
│       └── images/        # Portfolio images
├── vite.config.js         # Vite configuration
├── netlify.toml           # Netlify deployment config
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Updating Content

All content is stored in `src/data/content.js`. To update:

1. **Profile info**: Edit the `profile` object
2. **Experience**: Modify the `experience` array
3. **Case studies**: Update the `caseStudies` array
4. **Services**: Change the `services` array
5. **Social links**: Edit `socialLinks` and `additionalLinks`

## Deployment

This project is configured for Netlify. Simply push to the connected GitHub repo and it will auto-deploy.

Manual deploy:
```bash
npm run build
netlify deploy --prod
```

## Design Tokens

CSS variables are defined in `src/styles/main.css`:
- Colors: `--color-bg`, `--color-accent`, etc.
- Typography: `--font-size-*`
- Spacing: `--spacing-*`
- Border radius: `--radius-*`

---

Built with ⚡ by Spark
