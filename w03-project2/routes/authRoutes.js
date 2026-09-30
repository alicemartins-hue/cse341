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
        req.session.save((err) => {
            if (err) {
                return next(err);
            }

            res.json({
                message: "Authentication successful",
                user: req.user
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

module.exports = router;