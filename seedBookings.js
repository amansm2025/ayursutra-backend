const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Booking = require('./src/models/Booking');

const seedBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get users
    const patients = await User.find({ role: 'patient' });
    const practitioners = await User.find({ role: 'practitioner' });

    if (patients.length === 0 || practitioners.length === 0) {
      console.log('No patients or practitioners found. Run seedUsers.js first.');
      process.exit(1);
    }

    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('Cleared existing bookings');

    // Create test bookings
    const bookings = [
      {
        patient: patients[0]._id,
        practitioner: practitioners[0]._id,
        therapy: 'Abhyanga',
        date: new Date(),
        time: '10:00',
        amount: 1500,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'upi'
      },
      {
        patient: patients[1]._id,
        practitioner: practitioners[0]._id,
        therapy: 'Shirodhara',
        date: new Date(),
        time: '14:00',
        amount: 2000,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'card'
      },
      {
        patient: patients[0]._id,
        practitioner: practitioners[1]._id,
        therapy: 'Panchakarma',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        time: '11:00',
        amount: 3000,
        status: 'completed',
        paymentStatus: 'paid',
        paymentMethod: 'upi'
      }
    ];

    const createdBookings = await Booking.insertMany(bookings);
    console.log(`Created ${createdBookings.length} bookings successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding bookings:', error);
    process.exit(1);
  }
};

seedBookings();