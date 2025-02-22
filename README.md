# 📊 Data Science Club Website
[![Vercel Production Deployment](https://github.com/Google-Developer-Groups-Skyline-College/project.DSC-Website/actions/workflows/vercel-merge.yml/badge.svg)](https://github.com/Google-Developer-Groups-Skyline-College/project.DSC-Website/actions/workflows/vercel-merge.yml)

This is primarily a React project, built with Next.js and TailwindCSS, created for our sister club, the Data Science Club. The website is designed to showcase the Data Science Club of Skyline College and introduce the world to what they do and who they are.

### 🔗 View the website here: [project-dsc-website.vercel.app](https://project-dsc-website.vercel.app/)

🙋‍♂️ We encourage all Chapter members to contribute in any way to this project!

---

## Table of Contents
- [📊 Repository Contribution Activity](#repository-contribution-activity)
- [🔰 Quick Setup / Getting Started](#quick-setup--getting-started)
- [Usage](#usage)

---

### Repository Contribution Activity

![Alt](https://repobeats.axiom.co/api/embed/647b41049a0a9600b906e83dd7b4819c35b95a3a.svg "Repobeats analytics image")

## Quick Setup / Getting Started

### **1.** **Install Node.Js**

Before you begin, ensure you have Node.js installed on your machine.
You can download it from the [official Node.js website](https://nodejs.org/en/download).<br>
From there, get a prebuilt Node.Js for your system.<br>
**Please make sure you are using Node.js version 22.14.0 (LTS).** This is the standardized version for this project, chosen for its stability and long-term support (LTS), which ensures reliability and compatibility throughout development.

![Node Screenshot](docs/assets/nodeSS.png)<br>
Then, just download the installer, and install Node.Js
![Win Node Screenshot](docs/assets/winNodeSS.png)
Or, for mac:
![Mac Node Screenshot](docs/assets/macNodeSS.png)

Check if you have npm installed by running this on your command line:

```bash
npm - v
```

Although we are not using Node.Js for this project, we will still be using the package manager that comes with it, **npm**.

### **2.** **Cloning The Repository**

Clone this repository locally to your computer using [Git](https://git-scm.com/downloads).<br>
Make a directory where you'll be working on the Data Science Club Website.<br>
Then, start by clicking the green <> Code button above, copying the URL, and putting the url inside:

```bash
git clone <repository_url>
```

Move to the repository directory by:

```bash
cd <repository_name>
```

### **3.** **Installing Dependencies**

Once inside the project directory, install the required dependencies by running:

```bash
npm install
```

This will install all the necessary packages listed in `package.json`.

## Usage

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
# If you only just installed Node.js:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file. The home page is found at `/src/app/page.tsx`.

### **Making Changes And Committing Code**

If you make changes, follow these steps:

```bash
git checkout -b feature-branch  # Create a new branch
git add .                       # Stage changes
git commit -m "Description of changes"  # Commit changes
git push origin feature-branch  # Push to GitHub
```

If you have any questions on this process, please contact a team member or project leader.

## 🗃️ Important Resources and Documentation

- Our project uses [**Node.js**](https://nodejs.org/en), the JavaScript runtime engine that powers the logic of our website.

- Our project uses [**React.js**](https://react.dev), our website's core HTML/TypeScript-orientated structuring framework.

- Our project uses [**Tailwind CSS**](https://tailwindcss.com), our website's core CSS styling library.

- Our project uses [**Framer Motion**](https://www.framer.com/motion/), a comprehensive, production-ready animation library for React.

- Our project uses [**Vercel**](https://vercel.com/), a cloud service that provides the infrastructure to integrate, build, scale, and deploy our website.

🧠 To specifically **learn more** about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## ⚙️ Important Technical Details

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## 🔺 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss](/.github/assets/powered-by-vercel.svg)](https://vercel.com?utm_source=github_readme_stats_team&utm_campaign=oss)
