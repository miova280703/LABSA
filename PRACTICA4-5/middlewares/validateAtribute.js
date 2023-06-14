const {validateResult} = require('express-validator');

const validateAtribute = (req, res, next) => {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateAtribute : validateAtribute
};