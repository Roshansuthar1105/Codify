# Codify

## Description
Codify is a comprehensive web application that offers courses and roadmaps to various technical fields of computer science. The application features a user-friendly interface, real-time feedback, and a variety of resources to enhance learning.

## Features
- Engaging bitwise operations lessons
- Knowledge assessment through coding challenges
- User authentication and personalized profiles
- Comprehensive admin panel for content and user management
- Optimized responsive design for seamless mobile and desktop experiences
- New unified Hero section with stable layout (no button jumping) and video background
- Desktop navigation now shows primary links (Home, About, Editor, Courses, Roadmaps, Notes, Questions, Bookmarks, Contributors, Contact) without needing the hamburger menu
- Accessible focus states (focus-visible rings) added to all navigation links & CTAs
- Playwright end-to-end tests for responsive navbar behavior

## Technologies Used
- **Frontend:** React, React Router, CSS 💻
- **Backend:** Node.js, Express 🚀
- **Database:** MongoDB 🛢️
- **Authentication:** JWT (JSON Web Tokens) 🔒
## Deployment
[Preview URL](https://codifylearn.netlify.app) 👀
## Preview
 ### Images
![Screenshot 2024-11-10 162052](https://github.com/user-attachments/assets/18bb2c91-12e4-45e7-b1e6-2cbee943975c)
![Screenshot 2024-11-10 162108](https://github.com/user-attachments/assets/b1a0dfcd-d7e5-4bb9-940f-ba6137ee2320)
![Screenshot 2024-11-10 162328](https://github.com/user-attachments/assets/1f856972-a964-42a6-a552-d10867f8dc85)
![Screenshot 2024-11-10 162356](https://github.com/user-attachments/assets/d9fb69da-0258-4a77-85be-f77cfcfd193d)
 ### Videos
  

https://github.com/user-attachments/assets/9ba51e5e-8e16-48f1-96d3-fe1e497541a0


## Installation

### Installation Steps

1. Clone the repository using the command `git clone https://github.com/roshansuthar1105/codify-frontend.git`
2. Navigate to the project directory using `cd client`
3. Install the dependencies using `npm install` or `yarn install`
4. Start the application using `npm run dev` or `yarn run dev`
5. Open your web browser and navigate to `http://localhost:5173` to view the application

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Additional Requirements

- Ensure you have a code editor or IDE installed (e.g., Visual Studio Code, IntelliJ IDEA)
- Familiarize yourself with the project structure and file organization

## Usage
Once the application is running, navigate to `http://localhost:5173` in your web browser to access the app. You can create an account, log in, and start learning about bitwise operations.

### Running E2E Tests (Playwright)
1. From the `client` directory install dependencies (including Playwright): this will auto-install browsers on first run.
2. Run tests:
```
pnpm test:e2e (or) npm run test:e2e
```
Optional:
```
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:headed   # Run in headed browsers
```

The navbar test validates:
- Desktop (xl) shows all primary links and hides the hamburger.
- Mobile view shows hamburger and reveals links after opening the menu.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Inspired by various online coding platforms and educational resources.
- Thanks to the contributors and the open-source community for their support.
