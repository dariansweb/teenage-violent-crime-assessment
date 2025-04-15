# 🧠 Teenage Violent Crime Assessment — Survey App

Live Site: [https://teenage-violent-crime-assessment.vercel.app/survey](https://teenage-violent-crime-assessment.vercel.app/)  
GitHub: [https://github.com/dariansweb/teenage-violent-crime-assessment](https://github.com/dariansweb/teenage-violent-crime-assessment)

---

## 📋 Overview

This project is a modern, dynamic, and user-friendly **survey web application** designed to assess potential risk factors and backgrounds associated with teenage violent crime. It is intended as a compassionate, accessible data-collection tool for mental health professionals, researchers, and institutions.

This app uses a **multi-step wizard interface**, autosaves progress, validates input fields, and allows users to review, edit, and export their results before submitting.

---

## ✨ Features

- ✅ Multi-step form wizard with tabs for each section
- ✅ Completion checkmarks per section
- ✅ Autosave to `localStorage`
- ✅ Validation using `react-hook-form` + `Yup`
- ✅ Dynamic review page with editable sections
- ✅ Export responses to:
  - 📄 CSV (via `papaparse` + `file-saver`)
  - 🧾 JSON (coming soon)
  - 🖨️ PDF (coming soon)
- ✅ Toast notifications via `react-hot-toast`
- ✅ Clean, accessible Tailwind UI
- ✅ Fully deployed on [Vercel](https://vercel.com)

---

## 🧱 Technology Stack

| Tech               | Purpose                                  |
|--------------------|-------------------------------------------|
| **React**          | UI framework                              |
| **Vite**           | Lightning-fast dev server + build tool    |
| **Tailwind CSS**   | Utility-first styling                     |
| **React Hook Form**| Form state management                     |
| **Yup**            | Validation schema                         |
| **React Router DOM**| SPA navigation                           |
| **react-hot-toast**| Toast notifications                      |
| **PapaParse**      | Convert JSON → CSV                        |
| **FileSaver.js**   | Trigger CSV downloads                     |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js ≥ 16
- npm

### 🔧 Install Dependencies

```bash
npm install
