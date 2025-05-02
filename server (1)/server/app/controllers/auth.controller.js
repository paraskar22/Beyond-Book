const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/auth.config');

class AuthController {
    static async signup(req, res) {
        try {
            const { username, email, password, first_name, last_name } = req.body;
            
            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, config.saltRounds);

            // Create user
            const userId = await User.create({
                username,
                email,
                password: hashedPassword,
                first_name,
                last_name
            });

            // Generate token
            const token = jwt.sign(
                { id: userId, email, username },
                config.secret,
                { expiresIn: config.jwtExpiration }
            );

            res.status(201).json({
                message: 'User created successfully',
                token,
                user: { id: userId, email, username, first_name, last_name }
            });
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign(
                { id: user.user_id, email: user.email, username: user.username },
                config.secret,
                { expiresIn: config.jwtExpiration }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.user_id,
                    email: user.email,
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            });
        } catch (error) {
            console.error('Error in login:', error);
            res.status(500).json({ message: 'Error during login', error: error.message });
        }
    }

    static async logout(req, res) {
        // Since we're using JWT, we don't need to do anything on the server side
        res.json({ message: 'Logout successful' });
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            const decoded = jwt.verify(refreshToken, config.secret);

            const newToken = jwt.sign(
                { id: decoded.id, email: decoded.email, username: decoded.username },
                config.secret,
                { expiresIn: config.jwtExpiration }
            );

            res.json({ token: newToken });
        } catch (error) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findByEmail(email);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate reset token
            const resetToken = jwt.sign(
                { id: user.user_id },
                config.secret,
                { expiresIn: '1h' }
            );

            // TODO: Send email with reset token
            res.json({ message: 'Password reset email sent' });
        } catch (error) {
            res.status(500).json({ message: 'Error processing forgot password request' });
        }
    }

    static async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            const decoded = jwt.verify(token, config.secret);

            const passwordHash = await bcrypt.hash(newPassword, 10);
            await User.updatePassword(decoded.id, passwordHash);

            res.json({ message: 'Password reset successful' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
    }
}

module.exports = AuthController; 