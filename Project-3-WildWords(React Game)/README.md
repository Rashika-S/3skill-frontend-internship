# 🐾 WildWords

> **Guess the Animal. Save the Explorer.**

WildWords is an interactive animal guessing game inspired by the classic **Hangman** game. Instead of the traditional hangman mechanic, this project introduces an explorer survival theme where each incorrect guess brings the explorer closer to getting lost in the wilderness.

Built using **React**, **Vite**, and **Tailwind CSS**, the project focuses on creating an engaging user experience while strengthening my understanding of React fundamentals, component-based architecture, state management, and modern frontend development.

---

## 🌍 Live Demo

🔗 https://wildwords-hamgman-concept.vercel.app/

---

## 💡 Inspiration

The idea for WildWords came from the classic Hangman game, but I wanted to redesign it into something more immersive and visually engaging.

Instead of drawing a hanging figure after every wrong guess, I created an explorer-themed experience where the player must identify the hidden animal before the explorer loses all survival chances.

The objective was not only to recreate a familiar game using React but also to improve its visual appeal and overall user experience through modern UI design, animations, and sound effects.

---

## ✨ Features

- 🐾 Random animal generation
- 💡 Hint system for every animal
- 🏷️ Animal category display
- ⌨️ Interactive on-screen keyboard
- 🎨 Custom explorer illustration
- ❤️ Survival tracker
- 🔊 Sound effects
- 🔇 Mute / Unmute functionality
- 🎉 Confetti animation after winning
- 💀 Game Over screen with answer reveal
- 🔄 Restart game feature
- 📱 Responsive design

---

## 🛠 Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- Tailwind CSS
- Vite

### Libraries

- Canvas Confetti

### Tools

- Git
- GitHub
- VS Code
- Vercel

---

## 📂 Project Structure

```text
Project-3-WildWords/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── explorer_character.svg
│   │   │   └── Vision.png
│   │   │
│   │   └── sounds/
│   │       ├── click.mp3
│   │       ├── correct.mp3
│   │       ├── lose.mp3
│   │       ├── win.mp3
│   │       └── wrong.mp3
│   │
│   ├── components/
│   │   ├── ExplorerDrawing.jsx
│   │   ├── ExplorerPanel.jsx
│   │   ├── Footer.jsx
│   │   ├── GameInfo.jsx
│   │   ├── GameLayout.jsx
│   │   ├── Header.jsx
│   │   ├── Keyboard.jsx
│   │   ├── SoundButton.jsx
│   │   └── WordDisplay.jsx
│   │
│   ├── data/
│   │   └── animals.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Rashika-S/3skill-frontend-internship.git
```

Navigate to the project

```bash
cd Project-3-WildWords
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

---

## 🧠 What I Learned

Building WildWords helped me strengthen my understanding of:

- React Hooks (`useState`, `useEffect`, `useRef`)
- Component-based architecture
- Passing props between components
- State management
- Conditional rendering
- Event handling
- Working with sound effects
- Responsive UI development
- Creating reusable React components
- Git & GitHub workflow
- Deploying React applications using Vercel

---

## 🚀 Challenges Faced

During development, I encountered and solved several real-world frontend challenges, including:

- Managing game state efficiently
- Implementing random animal selection
- Handling keyboard interactions
- Building a restart mechanism
- Adding sound effects without affecting performance
- Implementing mute functionality
- Creating conditional game states (Win/Lose)
- Resolving Git merge conflicts
- Fixing Vercel deployment issues

These challenges provided valuable hands-on experience with debugging and modern frontend workflows.

---

## 🔮 Future Improvements

Some features I would like to add in future versions include:

- Difficulty levels
- Timer mode
- Score tracking
- Leaderboard
- More animal categories
- Explorer animations
- Accessibility improvements
- Better mobile interactions

---

## 👩‍💻 Author

**Rashika S**

B.Tech in Digital Transformation  
Minor in Design

GitHub: https://github.com/Rashika-S

LinkedIn: www.linkedin.com/in/s-rashika

---

## 📄 License

This project was developed for learning, practice, and portfolio purposes.

Inspired by the classic Hangman game and redesigned as an explorer-themed educational experience using React.
