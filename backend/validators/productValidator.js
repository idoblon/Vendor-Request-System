const { body, param, validationResult } = require('express-validator');

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

// Create product validation
const validateCreateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 2, max: 200 })
        .withMessage('Product name must be between 2 and 200 characters')
        .escape(),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters')
        .escape(),

    body('price')
        .isFloat({ min: 0, max: 10000000 })
        .withMessage('Price must be a positive number and less than 10,000,000'),

    body('quantity')
        .isInt({ min: 0, max: 1000000 })
        .withMessage('Quantity must be a non-negative integer and less than 1,000,000'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
        .isMongoId()
        .withMessage('Invalid category ID format'),

    body('image')
        .optional()
        .trim()
        .isURL()
        .withMessage('Image must be a valid URL'),

    handleValidationErrors
];

// Update product validation
const validateUpdateProduct = [
    param('id')
        .isMongoId()
        .withMessage('Invalid product ID format'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage('Product name must be between 2 and 200 characters')
        .escape(),

    body('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters')
        .escape(),

    body('price')
        .optional()
        .isFloat({ min: 0, max: 10000000 })
        .withMessage('Price must be a positive number and less than 10,000,000'),

    body('quantity')
        .optional()
        .isInt({ min: 0, max: 1000000 })
        .withMessage('Quantity must be a non-negative integer and less than 1,000,000'),

    body('category')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('Invalid category ID format'),

    body('image')
        .optional()
        .trim()
        .isURL()
        .withMessage('Image must be a valid URL'),

    body('isAvailable')
        .optional()
        .isBoolean()
        .withMessage('isAvailable must be a boolean value'),

    handleValidationErrors
];

// Delete product validation
const validateProductId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid product ID format'),

    handleValidationErrors
];

module.exports = {
    validateCreateProduct,
    validateUpdateProduct,
    validateProductId,
    handleValidationErrors
};
