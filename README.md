# @summitml/react-lightbox

**Dead-simple, swipe-friendly lightbox for React + Tailwind CSS—no extra installs needed.**

**⚠️ Currently in beta ⚠️**

<p align="left">
  <a href="https://www.npmjs.com/package/@summitml/react-lightbox"><img alt="npm version" src="https://img.shields.io/npm/v/@summitml/react-lightbox.svg?style=flat-square&color=teal"></a>
  <a href="https://bundlephobia.com/package/@summitml/react-lightbox"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@summitml/react-lightbox?style=flat-square"></a>
  <a href="https://github.com/summit-ml/react-lightbox/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/summit-ml/react-lightbox?style=flat-square"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/npm/l/@summitml/react-lightbox?style=flat-square"></a>
</p>

## ✨ Features

* ⚡ **Tiny** – just hooks, inline SVG icons, and Tailwind class strings.
* 🖱️ **Mouse, keyboard, swipe** navigation out of the box.
* 🌓 **Dark-mode ready** – inherits your Tailwind theme.
* ♿ **A11y** – ESC to close, arrow keys to navigate, focus handled.
* 🧩 **Component-agnostic** – works with `<img>`, `<video>`, or any JSX.

---

## 🔧 Installation

```bash
npm i @summitml/react-lightbox
# React ≥ 18, React-DOM ≥ 18, and Tailwind ≥ 3 must already be in your app
```

## Tailwind content glob (required)
Add one line to your tailwind.config.js so Tailwind's purge step sees the classes:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@summitml/react-lightbox/**/*.{js,jsx}', // 👈 add this
  ],
  theme: { extend: {} },
  plugins: [],
};
```
Restart your dev server after editing the config.

## 🚀 Quick start
```jsx
import { useState } from 'react';
import { Lightbox } from '@summitml/react-lightbox';

export default function Gallery() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Open lightbox
      </button>

      <Lightbox isOpen={open} onClose={() => setOpen(false)}>
        <img src="/photos/one.jpg" alt="" />
        <img src="/photos/two.jpg" alt="" />
        <img src="/photos/three.jpg" alt="" />
      </Lightbox>
    </>
  );
}
```

## 🎨 Customizing with className props

You can customize the appearance of any element in the Lightbox by passing className props. We use `tailwind-merge` internally, so your classes will properly override any conflicting default classes:

```jsx
<Lightbox 
  isOpen={open} 
  onClose={() => setOpen(false)}
  containerClassName="bg-gray-900/95 z-100" // Will override default z-50 with z-100
  closeButtonClassName="bg-red-500 hover:bg-red-600" // Red close button
  navigationButtonClassName="bg-blue-500 hover:bg-blue-600" // Blue nav buttons
  contentClassName="p-4" // Add padding to content area
>
  <img src="/photos/one.jpg" alt="" />
  <img src="/photos/two.jpg" alt="" />
</Lightbox>
```

## 📝 API

| Prop                     | Type          | Default | Description                                                            |
|--------------------------|---------------|---------|------------------------------------------------------------------------|
| `isOpen`                 | `boolean`     | —       | Controls visibility.                                                   |
| `onClose`                | `() => void`  | —       | Fires when user clicks outside, presses **Esc**, or swipes down.       |
| `defaultIndex`           | `number`      | `0`     | First child to show when the lightbox opens.                           |
| `children`               | `ReactNode[]` | —       | Any renderable elements (`<img>`, `<video>`, custom JSX, etc.).        |
| `containerClassName`     | `string`      | —       | Additional classes for the main container.                             |
| `closeButtonClassName`   | `string`      | —       | Additional classes for the close button.                               |
| `contentWrapperClassName`| `string`      | —       | Additional classes for the content wrapper.                            |
| `navigationButtonClassName` | `string`   | —       | Additional classes for both navigation buttons.                        |
| `prevButtonClassName`    | `string`      | —       | Additional classes for the previous button only.                       |
| `nextButtonClassName`    | `string`      | —       | Additional classes for the next button only.                           |
| `contentClassName`       | `string`      | —       | Additional classes for the content area.                               |
| `counterClassName`       | `string`      | —       | Additional classes for the counter text.                               |

## 🎛️ Keyboard & gesture shortcuts
| Action          | Trigger                                   |
|-----------------|-------------------------------------------|
| **Next / Prev** | Swipe ← / → or **Arrow ← / →** keys       |
| **Close**       | Swipe ↓ or **Esc** key                    |

## 🛠️ Local development

```bash
git clone https://github.com/summitml/react-lightbox.git
cd react-lightbox
npm i
npm run dev          # Rollup watch build
```

## Build & pack

```bash
npm run build        # outputs dist/index.js + dist/index.cjs
npm pack             # makes .tgz for local install tests
```

## Release workflow
```bash
npm version <patch|minor|major>
git push --follow-tags
npm publish --access public
```

## 📄 License
MIT © 2025 Summit ML