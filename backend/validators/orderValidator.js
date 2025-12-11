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

// Create order validation
const validateCreateOrder = [
    body('centerId')
        .trim()
        .notEmpty()
        .withMessage('Center ID is required')
        .isMongoId()
        .withMessage('Invalid center ID format'),

    body('items')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),

    body('items.*.productId')
        .trim()
        .notEmpty()
        .withMessage('Product ID is required')
        .isMongoId()
        .withMessage('Invalid product ID format'),

    body('items.*.quantity')
        .isInt({ min: 1, max: 10000 })
        .withMessage('Quantity must be between 1 and 10,000'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Notes must not exceed 500 characters')
        .escape(),

    handleValidationErrors
];

// Update order payment validation
const validateUpdatePayment = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID format'),

    body('paymentStatus')
        .isIn(['pending', 'completed'])
        .withMessage('Payment status must be either pending or completed'),

    handleValidationErrors
];

// Update order status validation (for centers/admins)
const validateUpdateOrderStatus = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID format'),

    body('status')
        .isIn(['pending', 'approved', 'rejected', 'paid', 'completed'])
        .withMessage('Invalid order status'),

    handleValidationErrors
];

// Get order by ID validation
const validateOrderId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid order ID format'),

    handleValidationErrors
];

module.exports = {
    validateCreateOrder,
    validateUpdatePayment,
    validateUpdateOrderStatus,
    validateOrderId,
    handleValidationErrors
};
