const BookClub = require('../models/bookClub.model');

class BookClubController {
    static async createBookClub(req, res) {
        try {
            // Validate required fields
            if (!req.body.name) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    error: 'Name is required'
                });
            }

            // Ensure user is authenticated and has a valid userId
            if (!req.user || !req.user.userId) {
                return res.status(401).json({
                    message: 'Authentication required',
                    error: 'User ID not found in token'
                });
            }

            const bookClubData = {
                name: req.body.name,
                description: req.body.description || null,
                cover_image: req.body.cover_image || null,
                is_private: Boolean(req.body.is_private),
                max_members: req.body.max_members ? parseInt(req.body.max_members) : null,
                created_by: parseInt(req.user.userId)
            };

            const clubId = await BookClub.create(bookClubData);
            
            // Add creator as admin member
            await BookClub.addMember(clubId, req.user.userId, 'admin');
            
            const bookClub = await BookClub.findById(clubId);
            res.status(201).json(bookClub);
        } catch (error) {
            res.status(500).json({ message: 'Error creating book club', error: error.message });
        }
    }

    static async getAllBookClubs(req, res) {
        try {
            const bookClubs = await BookClub.getAllBookClubs();
            res.json(bookClubs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book clubs', error: error.message });
        }
    }

    static async getBookClub(req, res) {
        try {
            const { id } = req.params;
            const bookClub = await BookClub.findById(id);
            
            if (!bookClub) {
                return res.status(404).json({ message: 'Book club not found' });
            }
            
            res.json(bookClub);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book club', error: error.message });
        }
    }

    static async updateBookClub(req, res) {
        try {
            const { id } = req.params;
            await BookClub.update(id, req.body);
            const updatedBookClub = await BookClub.findById(id);
            res.json(updatedBookClub);
        } catch (error) {
            res.status(500).json({ message: 'Error updating book club', error: error.message });
        }
    }

    static async deleteBookClub(req, res) {
        try {
            const { id } = req.params;
            await BookClub.delete(id);
            res.json({ message: 'Book club deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book club', error: error.message });
        }
    }

    static async joinBookClub(req, res) {
        try {
            const { id } = req.params;
            await BookClub.addMember(id, req.user.userId);
            res.json({ message: 'Successfully joined book club' });
        } catch (error) {
            res.status(500).json({ message: 'Error joining book club', error: error.message });
        }
    }

    static async leaveBookClub(req, res) {
        try {
            const { id } = req.params;
            await BookClub.removeMember(id, req.user.userId);
            res.json({ message: 'Successfully left book club' });
        } catch (error) {
            res.status(500).json({ message: 'Error leaving book club', error: error.message });
        }
    }

    static async getBookClubMembers(req, res) {
        try {
            const { id } = req.params;
            const members = await BookClub.getMembers(id);
            res.json(members);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book club members', error: error.message });
        }
    }

    static async createReadingSchedule(req, res) {
        try {
            const { id } = req.params;
            const scheduleData = {
                ...req.body,
                club_id: id,
                created_by: req.user.userId
            };
            const scheduleId = await BookClub.createReadingSchedule(scheduleData);
            const schedule = await BookClub.getReadingSchedule(id);
            res.status(201).json(schedule);
        } catch (error) {
            res.status(500).json({ message: 'Error creating reading schedule', error: error.message });
        }
    }

    static async getReadingSchedule(req, res) {
        try {
            const { id } = req.params;
            const schedule = await BookClub.getReadingSchedule(id);
            res.json(schedule);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching reading schedule', error: error.message });
        }
    }

    static async updateReadingSchedule(req, res) {
        try {
            const { id, scheduleId } = req.params;
            await BookClub.updateReadingSchedule(id, scheduleId, req.body);
            const updatedSchedule = await BookClub.getReadingSchedule(id);
            res.json(updatedSchedule);
        } catch (error) {
            res.status(500).json({ message: 'Error updating reading schedule', error: error.message });
        }
    }
}

module.exports = BookClubController; 