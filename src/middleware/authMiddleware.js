


/**
 * Checks if the user is authenticated and allowed to access resources.
 * @param {object} req Express req object.
 * @param {object} res Express res object.
 * @param {object} next Express next object.
 */
export function checkifAuthenticated(req, res, next) {
    if(req.session.loggedIn !== true) {
     const err = new Error('Unauthorized')
     err.status = 401
     next(err)
     res.render('errors/401')
    } 
    next()
}

/**
 * Checks if the user is already authenticated and should not have access to for example, login page.
 * @param {object} req Express req object.
 * @param {object} res Express res object.
 * @param {object} next Express next object.
 */
export function checkifNotAuthenticated(req, res, next) {
    if(req.session.loggedIn === true) {
     const err = new Error('Forbidden')
     err.status = 403
     res.render('errors/403')
    } 
    next()
}

