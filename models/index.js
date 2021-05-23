const User = require('./Users');
const Blog = require('./BlogPost');
const Comment = require('./Comment');

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    through: User,
    foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };
