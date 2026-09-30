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
    (req, res) => {
        res.json({
            message: "Authentication successful",
            user: req.user
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

module.exports = router;