const Joi = require('joi');

const validateSignup = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required().min(3).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        first_name: Joi.string().required(),
        last_name: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateUserUpdate = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30),
        email: Joi.string().email(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        profile_picture: Joi.string().uri(),
        bio: Joi.string().max(500)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateBook = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        author_id: Joi.number().required(),
        isbn: Joi.string().required(),
        description: Joi.string().required(),
        cover_image: Joi.string().uri(),
        genre: Joi.string().required(),
        publication_date: Joi.date().required(),
        publisher: Joi.string().required(),
        page_count: Joi.number().integer().min(1),
        language: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateBookClub = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        cover_image: Joi.string().uri(),
        is_private: Joi.boolean(),
        max_members: Joi.number().integer().min(1)
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateDiscussion = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        book_id: Joi.number().integer(),
        club_id: Joi.number().integer(),
        is_public: Joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateAuthor = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        bio: Joi.string().required(),
        profile_picture: Joi.string().uri(),
        website: Joi.string().uri(),
        social_media: Joi.object({
            twitter: Joi.string().uri(),
            facebook: Joi.string().uri(),
            instagram: Joi.string().uri(),
            goodreads: Joi.string().uri()
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateListing = (req, res, next) => {
    const schema = Joi.object({
        book_id: Joi.number().integer().required(),
        price: Joi.number().min(0).required(),
        condition: Joi.string().valid('new', 'like_new', 'good', 'fair', 'poor').required(),
        description: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateOrder = (req, res, next) => {
    const schema = Joi.object({
        shipping_address: Joi.string().required(),
        payment_method: Joi.string().valid('credit_card', 'paypal').required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

const validateOrderStatus = (req, res, next) => {
    const schema = Joi.object({
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            error: error.details[0].message
        });
    }
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    validateUserUpdate,
    validateBook,
    validateBookClub,
    validateDiscussion,
    validateAuthor,
    validateListing,
    validateOrder,
    validateOrderStatus
}; 