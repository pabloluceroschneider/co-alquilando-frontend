const ADMIN = 'ADMIN';
/**
 * Check is user has ADMIN role
 * @param {User} user 
 * @return {bool} true if user is admin
 */
export default (user) => user?.role.toUpperCase() === ADMIN