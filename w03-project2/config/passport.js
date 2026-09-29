const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { getDatabase } = require("../db/database");

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const db = getDatabase();
                const users = db.collection("users");

                const email =
                    profile.emails?.find((email) => email.primary)?.value ||
                    profile.emails?.[0]?.value ||
                    null;

                const existingUser = await users.findOne({
                    githubId: profile.id
                });

                if (existingUser) {
                    return done(null, existingUser);
                }

                const newUser = {
                    githubId: profile.id,
                    username: profile.username,
                    displayName: profile.displayName,
                    email: email,
                    avatarUrl: profile.photos?.[0]?.value || null,
                    createdAt: new Date()
                };

                const result = await users.insertOne(newUser);

                newUser._id = result.insertedId;

                return done(null, newUser);
            } catch (error) {
                console.error("GitHub authentication error:", error);
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = getDatabase();
        const users = db.collection("users");

        const user = await users.findOne({ _id: id });

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;