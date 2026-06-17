# V2 Page Color Palette & Design System

This document outlines the color palette, gradients, and glowing blur-effect styling tokens implemented for the **Hire From Us V2 Page**.

---

## 🎨 Core Color Tokens

| Token Name | Hex Code | Visual Sample | Usage & Context |
| :--- | :--- | :--- | :--- |
| **Pure Black** (Background) | `#000000` | 🖤 | Main page background (dark theme contrast). |
| **Silver Gray** (Main Text) | `#DADADA` | ▫️ | Primary typography color; readable and sleek. |
| **Brand Pink** (Accent) | `#D528A2` | 💗 | Primary action highlights, main buttons, and particle color. |
| **Brand Orange** (Accent) | `#F4A863` | 🧡 | Icons, badge accents, sub-labels, and particle color. |
| **Brand Purple** (Accent) | `#9B3DCE` | 💜 | Mid-gradient transition, glows, and particle color. |
| **Card background** | `#0B0A14` | ⬛ | Glassmorphism card surfaces (`bg-[#0B0A14]/75` with `backdrop-blur`). |
| **Card Border** | `rgba(255,255,255,0.05)` | ◽ | Soft border around cards for deep glassmorphism contrast. |

---

## 🌈 Gradient Specifications

### 1. Brand Primary Gradient (`btn-gradient`)
* **Colors:** `#D528A2` (Pink) $\rightarrow$ `#F4A863` (Orange)
* **Usage:** Action buttons, prominent highlighted texts, and main heading accents (`gradient-text`).

### 2. Tech Dashboard Frame Glow
* **Colors:** `#D528A2` (Pink) $\rightarrow$ `#9B3DCE` (Purple) $\rightarrow$ `#F4A863` (Orange)
* **Opacity:** Pink (25%), Purple (15%), Orange (20%)
* **Blur:** `blur-[50px]`
* **Usage:** Shadow gradients behind the center solution mockup.

---

## ✨ Glowing Blur & Floating Spheres

### 1. Background Aurora Blobs (`AuroraBackground`)
* **Top Left:** `#D528A2` @ 12% opacity with `blur-[120px]`
* **Bottom Right:** `#F4A863` @ 8% opacity with `blur-[130px]`
* **Center Left:** `#D528A2` @ 6% opacity with `blur-[100px]`

### 2. Edge Floating Spheres (Limited Access Card)
* **Top-Left Sphere:** `#D528A2` $\rightarrow$ `#9B3DCE` @ 45% opacity with `blur-md`
* **Bottom-Right Sphere:** `#F4A863` $\rightarrow$ `#D528A2` @ 40% opacity with `blur-lg`
* **Top-Right Side Sphere:** `#9B3DCE` $\rightarrow$ `#F4A863` @ 35% opacity with `blur-md`
* **Bottom-Left Side Sphere:** `#D528A2` $\rightarrow$ `#F4A863` @ 40% opacity with `blur-sm`

---

## 💡 Micro-interactions (Particle Brackets)
* The interactive canvas curly braces `{ }` use an even scatter of:
  * **Brand Pink** (`#D528A2`)
  * **Brand Purple** (`#9B3DCE`)
  * **Brand Orange** (`#F4A863`)
  * Random sizes ($0.8\text{px} \rightarrow 2.3\text{px}$) with client-side physics reaction (magnetic repulsion & spring back return-to-base).
