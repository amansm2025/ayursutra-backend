const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const practitioners = [
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@ayursutra.com',
    password: 'doctor123',
    role: 'practitioner',
    phone: '+91-9876543210',
    specialization: 'Panchakarma Specialist',
    experience: 15,
    qualification: 'BAMS, MD (Panchakarma)',
    consultationFee: 2000,
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    }
  },
  {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@ayursutra.com',
    password: 'doctor123',
    role: 'practitioner',
    phone: '+91-9876543211',
    specialization: 'Herbal Medicine',
    experience: 12,
    qualification: 'BAMS, MD (Dravyaguna)',
    consultationFee: 1800,
    availability: {
      days: ['monday', 'wednesday', 'friday', 'saturday'],
      timeSlots: ['10:00', '11:00', '12:00', '15:00', '16:00']
    }
  },
  {
    name: 'Dr. Amit Patel',
    email: 'amit.patel@ayursutra.com',
    password: 'doctor123',
    role: 'practitioner',
    phone: '+91-9876543212',
    specialization: 'General Ayurveda',
    experience: 8,
    qualification: 'BAMS',
    consultationFee: 1500,
    availability: {
      days: ['tuesday', 'thursday', 'saturday', 'sunday'],
      timeSlots: ['09:00', '10:00', '14:00', '15:00', '16:00', '17:00']
    }
  }
];

const seedPractitioners = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayursutra');
    console.log('Connected to MongoDB');

    // Remove existing practitioners
    await User.deleteMany({ role: 'practitioner' });
    console.log('Removed existing practitioners');

    // Create new practitioners
    for (const practitioner of practitioners) {
      const user = new User(practitioner);
      await user.save();
      console.log(`Created practitioner: ${practitioner.name}`);
    }

    console.log('Practitioners seeded successfully!');
    console.log('\nLogin credentials:');
    practitioners.forEach(p => {
      console.log(`${p.name}: ${p.email} / doctor123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding practitioners:', error);
    process.exit(1);
  }
};

seedPractitioners();