/**
 * Spider Task 2
 * Mohamed Sohail
 */

const moment = require("moment");
const lib = require("../lib/prefetch");

exports = module.exports = (app, passport) => {

    app.get("/", (req, res) => {
        return res.render("index.ejs");
    });

    app.get("/home", isLoggedIn, (req, res) => {
        return lib.prefetchNotes(req.user.id, notes => {
            return lib.prefetchTodos(req.user.id, todos => {
                const ctx = {
                    notes: notes,
                    todos: todos,
                    moment: moment
                }

                return res.render("home.ejs", { prefetch: ctx });
            })
        });
    });

    app.get("/getnote/:noteid", isLoggedIn, (req, res) => {
        return lib.fetchNote(req.user.id, req.params.noteid, ctx => {
            if (ctx.length === 1) {
                return res.render("note.ejs", { "data": ctx });
            } else {
                return res.redirect("/home");
            }
        })
    })

    app.get("/test", (req, res) => {
        return lib.prefetchNotes(null, ctx => {
            return res.render("home.ejs", { prefetch: ctx });
        });
    });

    app.get("/signup", (req, res) => {
        return res.render("signup.ejs", { message: req.flash("signupMessage") });
    });

    app.post("/signup",passport.authenticate("local-signup", {
        successRedirect: "/signin",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.get("/signin", (req, res) => {
       return res.render("signin.ejs", { message: req.flash("signinMessage") });
    });

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/home",
        failureRedirect: "/signin",
        failureFlash : true
    }));

    app.get("/signout", (req, res) => {
        return req.session.destroy(err => {
            return res.redirect("/");
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        return res.redirect("/signin");
    };

};