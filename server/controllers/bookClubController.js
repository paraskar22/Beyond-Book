const BookClub = require('../models/BookClub');
const BookClubMember = require('../models/BookClubMember');

// Get all book clubs
exports.getAllBookClubs = async (req, res) => {
  try {
    const bookClubs = await BookClub.findAll();
    res.json(bookClubs);
  } catch (error) {
    console.error('Error fetching book clubs:', error);
    res.status(500).json({ error: 'Failed to fetch book clubs' });
  }
};

// Get a single book club
exports.getBookClub = async (req, res) => {
  try {
    const bookClub = await BookClub.findByPk(req.params.id);
    if (!bookClub) {
      return res.status(404).json({ error: 'Book club not found' });
    }
    res.json(bookClub);
  } catch (error) {
    console.error('Error fetching book club:', error);
    res.status(500).json({ error: 'Failed to fetch book club' });
  }
};

// Join a book club
exports.joinBookClub = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookClubId = req.params.id;

    // Check if user is already a member
    const existingMember = await BookClubMember.findOne({
      where: { userId, bookClubId }
    });

    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member of this club' });
    }

    // Check if club has reached max members
    const bookClub = await BookClub.findByPk(bookClubId);
    const memberCount = await BookClubMember.count({ where: { bookClubId } });

    if (memberCount >= bookClub.maxMembers) {
      return res.status(400).json({ error: 'Book club has reached maximum capacity' });
    }

    // Add user as member
    await BookClubMember.create({
      userId,
      bookClubId,
      role: 'member'
    });

    res.json({ message: 'Successfully joined the book club' });
  } catch (error) {
    console.error('Error joining book club:', error);
    res.status(500).json({ error: 'Failed to join book club' });
  }
};

// Leave a book club
exports.leaveBookClub = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookClubId = req.params.id;

    const member = await BookClubMember.findOne({
      where: { userId, bookClubId }
    });

    if (!member) {
      return res.status(404).json({ error: 'User is not a member of this club' });
    }

    await member.destroy();
    res.json({ message: 'Successfully left the book club' });
  } catch (error) {
    console.error('Error leaving book club:', error);
    res.status(500).json({ error: 'Failed to leave book club' });
  }
}; 