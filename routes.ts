/**
    Accessible routes for public
    those routes do not need authentication
    * @type {string[]}
*/

/* GEREKSIZ SUAN
export const publicRoutes = [
    "/*",
    "/auth/new-verification",
]
*/

/**
    *Accessible routes related with login things
    *those routes need authentication
    those will be redirect settings
    * @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    '/auth/error',
    "/auth/reset",
    "/auth/new-password",
]

export const hiddenRoutes = [
    "/tarif/yeni",
    "/ayarlar",
]


/**
    * prefix for api authentication * rotues
    * @type {string}
*/
export const apiAuthPrefix = "/api/auth"

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"