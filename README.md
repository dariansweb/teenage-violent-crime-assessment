# 🧠 JJIS – Juvenile Justice Informational Survey #1  
## Survey Focus: Teenage Violent Crime Assessment

---

### 🔗 Live Demo  
👉 [Teenage Violent Crime Assessment](https://teenage-violent-crime-assessment.vercel.app/)

---

### 📍 Purpose-Driven Design for Juvenile Justice

A structured, multi-phase **assessment survey system** for adjudicated youth engaged in violent or high-risk behavior.  
Built with compassion and modern UX, this tool equips **case managers, therapists, and juvenile justice professionals** with data-driven insight into behavioral patterns, environmental influences, and psychosocial stressors.

---

## 📋 Overview

This application is a fully dynamic, JSON-driven, client-side **survey wizard**, designed for ease of use, accessibility, and emotional sensitivity. Users can complete multiple sections, receive autosaved feedback, review answers, and export responses — all without backend infrastructure.

---

## ✨ Features

- ✅ Multi-step wizard interface with section tabs
- ✅ Sticky section headers that stay visible during scroll
- ✅ Live completion indicators with ✅ checkmarks
- ✅ Smooth animated transitions between sections
- ✅ Autosave to `localStorage` on input
- ✅ Field-level validation using `react-hook-form` + `Yup`
- ✅ Review page with editable responses before submission
- ✅ Export responses to:
  - 📄 CSV (`papaparse` + `file-saver`)
  - 🧾 JSON (coming soon)
  - 🖨️ PDF (coming soon)
- ✅ Email submission of full survey to caseworkers via [EmailJS](https://emailjs.com)
- ✅ Toast notifications (`react-hot-toast`)
- ✅ Fully responsive Tailwind UI with accessible, modular design
- ✅ Deploy-ready on [Vercel](https://vercel.com)

---

## 💻 Tech Stack

| Technology            | Role                                        |
|-----------------------|---------------------------------------------|
| **React**             | Component-based frontend framework          |
| **Vite**              | Modern dev server and build tool            |
| **Tailwind CSS**      | Utility-first responsive styling            |
| **React Hook Form**   | Form state and performance management       |
| **Yup**               | Declarative form validation                 |
| **React Router DOM**  | Seamless SPA routing                        |
| **EmailJS**           | Frontend-based email delivery integration   |
| **PapaParse**         | JSON-to-CSV export                          |
| **FileSaver.js**      | Triggers client-side file downloads         |
| **React Hot Toast**   | Animated toast notifications                |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### 🔧 Local Setup

```bash
# Clone the repository
git clone https://github.com/dariansweb/teenage-violent-crime-assessment.git

# Navigate to the project folder
cd teenage-violent-crime-assessment

# Install dependencies
npm install

# Start the dev server
npm run dev
