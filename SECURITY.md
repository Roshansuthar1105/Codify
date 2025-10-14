# 🔐 Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability in Codify, please report it responsibly:

- Email: roshansuthar1105@gmail.com
- GitHub Issues: [Open a security issue](https://github.com/Roshansuthar1105/Codify/issues)

Please include:
- A detailed description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested mitigation (if any)

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main`  | ✅ Yes     |
| others  | ❌ No      |

## Authentication & Authorization

- Uses **JWT-based authentication**
- Role-based access control: `Admin`, `Learner`
- OAuth integration via **Google Sign-In**

## Sensitive Data

- `.env` files must **not be committed**
- Avoid hardcoding secrets (e.g., `JWT_SECRET`, `EMAIL_PASS`)
- Use environment variables for:
  - MongoDB URI
  - Email credentials
  - Google OAuth keys
  - API tokens (YouTube, RapidAPI, GitHub)

## Recommendations

- 🔐 Rotate secrets periodically
- 🧪 Validate user input to prevent injection attacks
- 🛡️ Use HTTPS in production
- 🚫 Restrict CORS in production (`CLIENT_CORS=*` is unsafe)
- 📧 Use secure email transport (e.g., OAuth2 or App Passwords)

## Dependencies

- Keep all dependencies up-to-date
- Run `npm audit` regularly
- Use ESLint and Prettier for code hygiene

## Deployment Notes

- Never expose `.env` files publicly
- Use secure deployment platforms with access control
- Monitor logs for suspicious activity

---

Maintaining security is a shared responsibility. Let’s keep Codify safe for all learners! 💙
