const User = require('./Users');
const Blog = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(Blog, Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsToMany(User, { through: User }, Blog, { through: Blog });

module.exports = { User, Blog, Comment };
