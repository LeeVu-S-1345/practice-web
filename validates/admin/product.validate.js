module.exports.createPost = (req, res, next) => {
    if(!req.body.title){
        req.flash("error", "Enter title again!");
        res.redirect(req.get('Referer') || '/');
        return;
    }

    if(!req.body.id){
        req.flash("error", "Enter id again!");
        res.redirect(req.get('Referer') || '/');
        return;
    }

    next();
}