const User = require('../models/auth.model');

// GET privacy setting
exports.getPrivacySetting = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware
    const user = await User.findById(userId).select('privacy');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ privacy: user.privacy });
  } catch (error) {
    console.error('Get privacy error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE privacy setting
exports.updatePrivacySetting = async (req, res) => {
  try {
    const userId = req.user.id;
    const { privacy } = req.body;

    if (typeof privacy !== 'boolean') {
      return res.status(400).json({ message: 'Privacy must be true or false' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { privacy },
      { new: true }
    ).select('privacy');

    res.status(200).json({ message: 'Privacy setting updated', privacy: updatedUser.privacy });
  } catch (error) {
    console.error('Update privacy error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
