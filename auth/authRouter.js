/**
 * Spider Task 2
 * Mohamed Sohail
 */

module.exports = (app, passport) => {

	app.get("/", (req, res) => {
		res.render("index.ejs");
    });
    
	app.get("/home", isLoggedIn, (req, res) => {
		res.render("home.ejs");
	});    

	app.get("/signup", (req, res) => {
		res.render("signup.ejs", {
            message: req.flash("signupMessage")
        });
	});

	app.post("/signup",passport.authenticate("local-signup", {
        successRedirect: "/home",
        failureRedirect: "/signup",
        failureFlash: true
    }));

	app.get("/signin", (req, res) => {
		res.render("signin.ejs", {
			message: req.flash("signinMessage")
		});
    });

	app.post("/signin", passport.authenticate("local-signin", {
		successRedirect: "/home",
		failureRedirect: "/signin",
		failureFlash : true
	}));    

	app.get("/logout", (req, res) => {
		req.session.destroy(err => {
			res.redirect("/");
		});
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) return next();
		res.redirect("/signin");
    };
    
};