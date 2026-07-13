# Workshop Setup Guide

**Build Interactive, Branching Prototypes in Cursor with AI**

Hey, it’s Krystian! 👋

Thank you so much for signing up for the workshop — I can’t wait to build with you!

Before the live session, there are a few things you’ll need to set up so everyone can jump straight into prototyping.

Please complete this guide before the workshop. It should take around **30–45 minutes**, although most of that time is simply waiting for software to install.

**By the end of this setup, you should be able to:**

- Open the starter project in Cursor.
- Run the project locally.
- See the welcome screen in your browser.

If you can do those three things, you’re all set for the workshop.

If you get stuck, don’t worry! Just email us with a screenshot of the error and let us know which step you were on. And if we can’t resolve it beforehand, simply join **15 minutes early** and we’ll get you up and running together (please, let us know in advance)



---

## What you'll need (overview)


| What                                          | Why                                               | Cost                   |
| --------------------------------------------- | ------------------------------------------------- | ---------------------- |
| A laptop you can install software on          | Everything below                                  | —                      |
| **Node.js 20.9 or newer**                     | Runs the prototype locally                        | Free                   |
| **Git**                                       | Downloads the project, saves/reverts your changes | Free                   |
| **Cursor ** **(or any other AI-powered IDE)** | The AI editor we build in                         | Paid plan recommended* |
| **GitHub account**                            | Access the starter project                        | Free                   |
| **Figma account**                             | The starter designs                               | Free                   |


The free Cursor plan works but has a small quota of AI requests. This is a highly iterative workshop, you'll be making many AI requests, so a paid plan (or free trial) is strongly recommended so you don't run out mid-session.



---

## Step 1 — Install Node.js

Node.js is what runs the prototype on your machine. **You need version 20.9 or newer** (the project won't start on older versions).

### Check if you already have it

Open **Terminal** (Mac: press `Cmd+Space`, type "Terminal") or **PowerShell** (Windows: press `Win`, type "PowerShell") and run:

```bash
node --version
```

If you see `v20.9.0` or higher (e.g. `v22.x`, `v24.x`) — you're done, skip to Step 2. If you see "command not found" or an older version, install it:

### Mac

**Option A (simplest):** download the **LTS** installer from [nodejs.org](https://nodejs.org) and run it like any other app.

**Option B (if you already use Homebrew):**

```bash
brew install node
```

> You do **not** need to install Homebrew for this workshop. If you don't have it, just use Option A.

### Windows

Download the **LTS** installer from [nodejs.org](https://nodejs.org) and run it. Accept the defaults — you don't need Chocolatey or the "native modules" checkbox.

### Verify

Close and reopen your terminal, then:

```bash
node --version   # should print v20.9.0 or higher
npm --version    # should print a version number (npm comes with Node)
```



---

## Step 2 — Install Git

Git downloads the project and — importantly for this workshop — lets you **save checkpoints and revert** when an AI change goes wrong. We'll use this a lot.

### Check if you already have it

```bash
git --version
```

If you see a version number, skip ahead.

### Mac

Run `git --version` in Terminal — if Git is missing, macOS will pop up a dialog offering to install the "Command Line Developer Tools". Click **Install** and wait (~5 min). That's it.

### Windows

Download and install [Git for Windows](https://git-scm.com/download/win). Accept all the defaults.



---

## Step 4 — Get the starter project running

This is the most important step. You'll receive the GitHub repository link by email before the session (it looks like `https://github.com/.../...`).

1. **Sign in to GitHub** at [github.com](https://github.com) (create a free
  account if you don't have one), and make sure you can open the repository link we sent.
2. **Clone the project.** In your terminal:
  ```bash
   cd Documents
   git clone <THE-REPO-URL-FROM-THE-EMAIL>
   cd <THE-PROJECT-FOLDER>
  ```
  > Prefer buttons to terminals? Installing [GitHub Desktop](https://desktop.github.com) and using **File → Clone Repository** works just as well.
3. **Install the project's dependencies** (one-time, ~1–2 min):
  ```bash
   npm install
  ```
4. **Run it:**
  ```bash
   npm run dev
  ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.



✅ **You should see the Next.js starter page load without errors.** That's the finish line — the project is deliberately almost empty. Building the actual prototype from the brief is what the workshop is for.

To stop the project, press `Ctrl+C` in the terminal. (You'll start it the same way — `npm run dev` — during the workshop.)

Finally, **open the project folder in Cursor**: File → Open Folder → select the project folder you cloned. Have a peek at `docs/BRIEF.md` if you're  curious — that's what we'll be building from.



---

## Step 5 — Figma

Make sure you're signed in at [figma.com](https://figma.com). We'll share the starter design file link before the session — open it once to check you have access (view access is all you need).



---

## Pre-workshop checklist

Run through this the day before:

- [ ] `node --version` prints **v20.9.0 or higher**
- [ ] `git --version` prints a version number
- [ ] Cursor is installed and you're signed in (paid plan or trial active)
- [ ] The starter project is cloned and **`npm run dev` loads at
  ```
  localhost:3000 without errors**
  ```
- [ ] The project folder opens in Cursor
- [ ] You can log in to GitHub and Figma



---

## Troubleshooting

**"command not found: node" right after installing** Close the terminal window completely and open a new one — the installer updates settings that only apply to new windows.

`npm run dev` **says the Node version is too old** Install the LTS from [nodejs.org](https://nodejs.org) again (it replaces the old version), then open a fresh terminal.

**"Port 3000 is already in use"** Something else (probably another copy of the project) is running. Either close the other terminal, or press `Ctrl+C` and run `npm run dev` again — Next.js will offer to use another port. Both are fine.

`npm install` **fails with permission / EACCES errors (Mac)** Don't use `sudo`. Reinstalling Node from the nodejs.org installer usually fixes ownership issues.

**Company laptop with a proxy / security software** `npm install` may be blocked by corporate networks. Try from a home network or personal hotspot — and if it still fails, email us before the session.

**Anything else** Email us with a screenshot of the error and what step you were on. Worst case: come 15 minutes early and we'll sort it out together (please, let us know in advance).