const { body, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value
            }))
        });
    }
    next();
};

// Password strength validation
const passwordStrength = () => {
    return body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character (@$!%*?&)');
};

// Registration validation rules
const validateRegistration = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .toLowerCase(),

    body('role')
        .isIn(['vendor', 'center', 'admin'])
        .withMessage('Role must be either vendor, center, or admin'),

    passwordStrength(),

    // Vendor-specific fields
    body('businessName')
        .if(body('role').equals('vendor'))
        .trim()
        .notEmpty()
        .withMessage('Business name is required for vendors')
        .isLength({ min: 2, max: 100 })
        .withMessage('Business name must be between 2 and 100 characters')
        .escape(),

    body('pan')
        .if(body('role').equals('vendor'))
        .trim()
        .notEmpty()
        .withMessage('PAN number is required for vendors')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        .withMessage('Invalid PAN number format'),

    body('phone')
        .if(body('role').equals('vendor'))
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[0-9]{10}$/)
        .withMessage('Phone number must be 10 digits'),

    body('province')
        .if(body('role').equals('vendor'))
        .trim()
        .notEmpty()
        .withMessage('Province is required'),

    body('district')
        .if(body('role').equals('vendor'))
        .trim()
        .notEmpty()
        .withMessage('District is required'),

    // Center-specific fields
    body('category')
        .if(body('role').equals('center'))
        .trim()
        .notEmpty()
        .withMessage('Category is required for centers'),

    handleValidationErrors
];

// Login validation rules
const validateLogin = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .toLowerCase(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];

// Password reset request validation
const validatePasswordResetRequest = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .toLowerCase(),

    handleValidationErrors
];

// Password reset validation
const validatePasswordReset = [
    body('token')
        .notEmpty()
        .withMessage('Reset token is required'),

    passwordStrength(),

    body('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    handleValidationErrors
];

module.exports = {
    validateRegistration,
    validateLogin,
    validatePasswordResetRequest,
    validatePasswordReset,
    handleValidationErrors
};
