# Codify – Interactive Coding Learning Platform [Live Demo](https://codifylearn.netlify.app)

<img src="https://miro.medium.com/v2/resize:fit:400/1%2AZfYWXN0zA6TqQQ7wGNJUOg.jpeg" alt="GSSoC Logo" width="100"/>

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/roshansuthar1105/codify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

> Welcome to **Codify**, your all-in-one coding learning platform! Bookmarked learning paths, interactive courses, personalized dashboards, dark/light themes, and more — all in one place.

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=24&duration=3000&pause=1000&color=38B2AC&center=true&vCenter=true&width=900&lines=Learn+by+Doing+%F0%9F%92%BB;Interactive+Courses+%26+Curated+Roadmaps+%F0%9F%93%9A;Contribute+and+Grow+with+Open+Source+%F0%9F%8C%8D;Happy+Coding+%E2%9C%A8" alt="Typing Banner"/>
</div>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

## 📊 Project Insights

<table align="center">
  <thead>
    <tr>
      <td><b>🌟 Stars</b></td>
      <td><b>🍴 Forks</b></td>
      <td><b>👥 Contributors</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img alt="Stars" src="https://img.shields.io/github/stars/roshansuthar1105/codify?style=flat&logo=github"/></td>
      <td><img alt="Forks" src="https://img.shields.io/github/forks/roshansuthar1105/codify?style=flat&logo=github"/></td>
      <td><img alt="Contributors Count" src="https://img.shields.io/github/contributors/roshansuthar1105/codify?style=flat&color=blue&logo=github"/></td>
    </tr>
  </tbody>
</table>
<table align="center">
  <thead>
    <tr>
      <td><b>🐛 Issues</b></td>
      <td><b>🔔 Open PRs</b></td>
      <td><b>🔕 Closed PRs</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img alt="Issues" src="https://img.shields.io/github/issues/roshansuthar1105/codify?style=flat&logo=github"/></td>
      <td><img alt="Open PRs" src="https://img.shields.io/github/issues-pr/roshansuthar1105/codify?style=flat&logo=github"/></td>
      <td><img alt="Closed PRs" src="https://img.shields.io/github/issues-pr-closed/roshansuthar1105/codify?style=flat&color=critical&logo=github"/></td>
    </tr>
  </tbody>
</table>

<p align="center">
  <a href="https://github-readme-stats.vercel.app/api/pin/?username=roshansuthar1105&repo=codify">
    <img src="https://github-readme-stats.vercel.app/api/pin/?username=roshansuthar1105&repo=codify&show_owner=true" alt="Repo Card"/>
  </a>
</p>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## ✨ Highlights

- 🎓 **Interactive Courses** with hands-on lessons  
- 🧭 **Curated Roadmaps** for multiple tech stacks  
- 🌓 **Dark/Light Themes** with customization  
- 📈 **Progress Tracking** and resume learning  
- 📱 **Responsive UI** across devices  
- 🛡️ **JWT Auth**, role-based access (Admin/Learner)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🌐 Live Demo

**Try Codify:** https://codifylearn.netlify.app

<details>
  <summary><b>Demo Accounts</b></summary>

- **User**: `demo@codify.com` • `demo123`  
- **Admin**: `admin@codify.com` • `admin123`
</details>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🚀 Getting Started

Follow these steps to set up **Codify** locally and begin contributing.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Git
- Code editor (VS Code recommended)

### Installation

**Clone Codify Repository**
### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/Roshansuthar1105/Codify.git
   ```
2. Navigate to the client directory
   ```bash
   cd codify/client
   ```
3. Install dependencies
   ```bash
   npm install
   ```
2. Environment (Frontend)

   Create .env in client/:
   
   ```bash
    VITE_SERVER_API=http://localhost:5050
    VITE_YOUTUBE_API=add_your_youtube_api_here
   ```
4. Run Frontend
   
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:5173`

### Backend Setup
1. Navigate to the server directory
   ```bash
   cd ..
   cd codify/server
   ```
2. Install dependencies
   ```bash
   npm install
   ```
6. Environment (Backend)

   Create .env in server/:
   
   ```bash
    MONGODB_URI="mongodb+srv://publicuser:public_codify@cluster0.5bysaia.mongodb.net/" 
    #this is the owner MONGODB URI, you can use it!
    PORT=5050
    JWT_SECRET=your_jwt_secret
    CLIENT_CORS=http://localhost:5173
   ```
8. Run Backend

   ```bash
   npm run start
   # API: http://localhost:5050
   ```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔧 Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| **Banner image not showing** | Wrong path or file not uploaded | Check if the image exists in `/assets/` and update the correct path in README |
| **Animations not visible** | Browser does not support CSS animations | Use a modern browser like Chrome/Edge/Firefox |
| **Project not running after clone** | Dependencies not installed | Run `npm install` or `yarn install` |
| **Git upstream not working** | Upstream not added properly | Run `git remote add upstream <repo-url>` and verify using `git remote -v` |
| **Merge conflicts while updating fork** | Conflicting changes between fork and upstream | Resolve conflicts manually, then `git add .`, `git commit`, and `git push` |

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Note:
 You might need to run both the client and server simultaneously for fetching data in your local machine.


## 📁 Project Structure

```
client/
├── public/             # Static files
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/        # React Context providers
│   ├── layouts/        # Page layout components
│   ├── pages/          # Main application pages
│   ├── store/          # State management
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
└── vite.config.js      # Vite configuration

server/
├── controllers/        # Request handlers
├── models/             # Database models
├── routes/             # API routes
├── middleware/         # Custom middleware
├── utils/              # Utility functions
└── server.js           # Server entry point
```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🤝 Contributing to Codify

| Step | Guideline |
|------|------------|
| **Pick Issues** | Choose an unassigned issue (or open a new one) and wait for approval. |
| **Responsive Design** | Ensure Tailwind CSS responsiveness across breakpoints. |
| **Code Quality** | Write clean, modular components inside `src/components/*`. Use **ESLint** & **Prettier**. |
| **Pull Requests** | Submit one issue per PR with a clear description & screenshots (where relevant). |
| **Communication** | Use Discussions/Issues for queries. Avoid spammy comments. |

### Quick Flow 

```bash
git checkout -b feature/amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
# then open a Pull Request
```
### detailed description 

1. Fork the repository
2. Add an upstream to keep your fork synchronized with the original repository
   ```bash
   git remote add upstream https://github.com/Roshansuthar1105/Codify.git
   ```
3. Fetch Changes from the upstream
   ```bash
   git fetch upstream
   ```
3. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. Commit your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
6. Open a Pull Request


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

**🤝👤 Contribution Guidelines**

We love our contributors! CONTRIBUTE.md `Will be Coming Soon`.

>Thank you once again to all our contributors who has contributed to **Codify** Your efforts are truly appreciated. 💖👏
<!-- Contributors badge (auto-updating) -->

[![Contributors](https://img.shields.io/github/contributors/roshansuthar1105/codify?style=for-the-badge)](https://github.com/roshansuthar1105/codify/graphs/contributors)

<p align="left"> <a href="https://github.com/roshansuthar1105/codify/graphs/contributors"> <img src="https://contrib.rocks/image?repo=roshansuthar1105/codify" alt="Contributors"/> </a> </p>

See the full list of contributors and their contributions on the [`GitHub Contributors Graph`](https://github.com/roshansuthar1105/codify/graphs/contributors).

<h2 align="center">
<p style="font-family:var(--ff-philosopher);font-size:3rem;"><b> Show some <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" alt="Red Heart" width="40" height="40" /> by starring this awesome repository!
</p>
</h2>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**💡 Suggestions & Feedback**

Feel free to open issues or discussions if you have any feedback, feature suggestions, or want to collaborate!

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**🙌 Support & Star**

***If you find this project helpful, please give it a star ⭐ to support more such educational initiatives!***

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

**⭐ Stargazers**

<div align="center">
  <a href="https://github.com/roshansuthar1105/codify/graphs/stargazers">
    <img src="https://reporoster.com/stars/roshansuthar1105/codify?type=svg&limit=100&names=false" alt="Stargazers" />
  </a>
</div>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**🍴 Forkers**

<div align="center">
  <a href="https://github.com/roshansuthar1105/codify/network/members">
    <img src="https://reporoster.com/forks/roshansuthar1105/codify?type=svg&limit=100&names=false" alt="Forkers" />
  </a>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

<h2>🧑‍💻Project Admin:</h2>
<table>
<tr>
<td align="center">
<a href="https://github.com/Roshansuthar1105"><img src="https://avatars.githubusercontent.com/u/117620582?v=4" height="140px" width="140px" alt="Roshan Suthar"></a><br><sub><b>Roshan Suthar</b><br><a href="https://www.linkedin.com/in/roshansuthar/"><img src="https://github-production-user-asset-6210df.s3.amazonaws.com/73993775/278833250-adb040ea-e3ef-446e-bcd4-3e8d7d4c0176.png" width="45px" height="45px"></a></sub>
</td>
</tr>
</table>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">

<h1 align="center"><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /> Give us a Star and let's make magic! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Glowing%20Star.png" alt="Glowing Star" width="25" height="25" /></h1>

<p align="center">
     <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mirror%20Ball.png" alt="Mirror Ball" width="150" height="150" />
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

**👨‍💻 Built with ❤️ by the Codify Team**
**❤️ Roshan Suthar and Contributors ❤️** [open an issue](https://github.com/Roshansuthar1105/Codify/issues) | [Watch Demo](https://codifylearn.netlify.app/)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="150%">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=65&section=footer"/>

**Ready to show off your coding achievements? Get started with Codify today! 🚀**
