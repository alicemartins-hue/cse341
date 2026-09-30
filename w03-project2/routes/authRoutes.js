const express = require("express");
const passport = require("../config/passport");

const router = express.Router();

router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/"
    }),
    (req, res, next) => {
        console.log("SESSION BEFORE SAVE:", req.session);

        req.session.save((err) => {
            if (err) {
                console.error("SESSION SAVE ERROR:", err);
                return next(err);
            }

            console.log("SESSION AFTER SAVE:", req.session);

            res.json({
                message: "Authentication successful",
                user: req.user,
                session: req.session
            });
        });
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.redirect("/");
        });
    });
});

router.get("/status", (req, res) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.user || null
    });
});

router.get("/debug-session", (req, res) => {
    res.json({
        sessionID: req.sessionID,
        session: req.session,
        authenticated: req.isAuthenticated(),
        user: req.user || null,
        cookies: req.headers.cookie || null
    });
});

module.exports = router;