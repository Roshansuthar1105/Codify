import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export function configurePassport() {
  // Google Login
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_LOGIN_CALLBACK_URL,
    GOOGLE_SIGNUP_CALLBACK_URL,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_LOGIN_CALLBACK_URL,
  } = process.env;

  const hasGoogleCreds = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_LOGIN_CALLBACK_URL && GOOGLE_SIGNUP_CALLBACK_URL);
  const hasGithubCreds = Boolean(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET && GITHUB_LOGIN_CALLBACK_URL);

  if (!hasGoogleCreds) {
    console.warn("Google OAuth environment variables are missing; Google strategies will not be registered.");
  }
  if (!hasGithubCreds) {
    console.warn("GitHub OAuth environment variables are missing; GitHub strategy will not be registered.");
  }

  if (hasGoogleCreds) {
    passport.use(
      "google-login",
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          //callbackURL: "/api/v1/auth/google/login/callback",
          callbackURL: GOOGLE_LOGIN_CALLBACK_URL,
          prompt: "select_account",
        },
        async (_, accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(null, false, { message: "Email not found" });

            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
              // Link existing account by email if exists (For users who signed up manually)
              const existingUser = await User.findOne({ email });
              if (!existingUser) {
                return done(null, false, { message: "Account not found. Please sign up first." });
              }
              existingUser.googleId = profile.id;
              existingUser.isOAuth = true;
              existingUser.avatar = profile.photos?.[0]?.value || "";
              await existingUser.save();
              user = existingUser;
            }

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
              expiresIn: "30d",
            });

            return done(null, { user, token });
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
  }

  // Google Signup 
  if (hasGoogleCreds) {
    passport.use(
      "google-signup",
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_SIGNUP_CALLBACK_URL,
          prompt: "select_account",
        },
        async (_, accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(null, false, { message: "Email not found" });

            let existingUser = await User.findOne({ email });
            if (existingUser) {
              return done(null, false, { message: "Email already registered. Please login." });
            }

            // Create unique username
            let username = profile.displayName?.replace(/\s+/g, "_") || `user_${Date.now()}`;
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
              username = `${username}_${profile.id.substring(0, 5)}`;
            }

            const user = await User.create({
              googleId: profile.id,
              username,
              email,
              avatar: profile.photos?.[0]?.value || "",
              isOAuth: true,
            });

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
              expiresIn: "30d",
            });

            return done(null, { user, token });
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
  }

  // GitHub Login + Signup (merged)
  if (hasGithubCreds) {
    passport.use(
      "github",
      new GitHubStrategy(
        {
          clientID: GITHUB_CLIENT_ID,
          clientSecret: GITHUB_CLIENT_SECRET,
          callbackURL: GITHUB_LOGIN_CALLBACK_URL,
          scope: ["user:email"],
        },
        async (_, __, ___, profile, done) => {
          try {
            const emails = profile.emails || [];
            const verifiedEmail = emails.find(e => e.verified && e.value)?.value;
            const primaryEmail = emails.find(e => e.primary && e.value)?.value;
            const anyEmail = emails.find(e => e.value)?.value;
            
            const email = verifiedEmail || primaryEmail || anyEmail;

            if (!email) {
              return done(null, false, {
                message: "No email found. Please make your GitHub email public or verify it.",
              });
            }

            let user = await User.findOne({ email });
            let isNewUser = false;

            if (!user) {
              // Create new user if not found
              isNewUser = true;
              let username = profile.username || `user_${Date.now()}`;
              const usernameExists = await User.findOne({ username });
              if (usernameExists) {
                username = `${username}_${profile.id.substring(0, 5)}`;
              }

              user = await User.create({
                githubId: profile.id,
                username,
                email,
                avatar: profile.photos?.[0]?.value || `https://github.com/${profile.username}.png`,
                isOAuth: true,
              });
            } else if (!user.githubId) {
              // Link GitHub ID if existing user but no GitHub linked
              user.githubId = profile.id;
              user.isOAuth = true;
              user.avatar = profile.photos?.[0]?.value || `https://github.com/${profile.username}.png`;
              await user.save();
            }

            const token = jwt.sign(
              { id: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "30d" }
            );

            return done(null, { user, token, isNewUser });
          } catch (err) {
            console.error("Error in GitHub strategy:", err);
            return done(err, null);
          }
        }
      )
    );
  }

  passport.serializeUser((data, done) => done(null, data));
  passport.deserializeUser((data, done) => done(null, data));
}
