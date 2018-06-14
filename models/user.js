/**
 * Spider Task 2
 * Mohamed Sohail
 */

exports = module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User", {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		email: {
			type: Sequelize.STRING,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		}
    });

    User.associate = models => {
        User.hasMany(models.Note, { onDelete: "cascade" });
    };

	return User;
};