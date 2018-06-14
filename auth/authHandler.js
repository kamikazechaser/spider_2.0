/**
 * Spider Task 2
 * Mohamed Sohail
 */

const bCrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

exports = module.exports = (passport, user) => {
	const User = user;

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then(user => {
			if (user) return done(null, user.get());
			else return done(user.errors, null);
		});
	});

	passport.use("local-signup", new LocalStrategy({
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},

		function (req, email, password, done) {

			const generateHash = password => {
				return bCrypt.hashSync(password, 10);
			};

			User.findOne({where: { email: email }}).then(user => {
				if (user) {
					return done(null, false, req.flash("signUpMessage", "E-mail is already in use!"));
				} else {
					const hashedPassword = generateHash(password);
					const dbPush = {
						email: email,
						password: hashedPassword,
						name: req.body.name,
					};

					User.create(dbPush).then((createdUser, created) => {
						if (!createdUser) return done(null, false);
						if (createdUser) return done(null, createdUser);
					});
				}
			}).catch(error => {
				console.log(error);

				return done(null, false, req.flash("signUpMessage", "Server error! try again later."));
			});
		}
	));

	passport.use("local-signin", new LocalStrategy({
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			},

			function (req, email, password, done) {
				const validatePassword = (passwordSent, password) => {
					return bCrypt.compareSync(password, passwordSent);
				};

				User.findOne({where: { email: email } }).then(user => {
						if (!user) {
							return done(null, false, req.flash("signinMessage", "No such user exists!"));
						}

						if (!validatePassword(user.password, password)) {
							return done(null, false, req.flash("signinMessage", "Incorrect password!"));
						}

						const userInfo = user.get();

						return done(null, userInfo);
				}).catch(err => {
					console.log("Error:", err);

					return done(null, false, req.flash("signinMessage", "Server error! try again later."));
				});
			}
		)
	);
};