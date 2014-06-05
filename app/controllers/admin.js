exports.index = function (req, res) {
    if (req.session.user) {
        res.render('home/user');
    } else {
        res.render('home/login');
    }
};