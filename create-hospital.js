'use strict';

const { connectDB, mongoose } = require('./src/config/db');
const { User, Hospital, Settings } = require('./src/models');
const { hashPassword } = require('./src/utils/password');
const { uid } = require('./src/utils/helpers');

async function createHospital() {
  try {
    await connectDB();

    const email = 'santhoshhospital@example.com';
    const password = process.env.HOSPITAL_PASSWORD;

    if (!password || password.length < 8) {
      throw new Error('Set HOSPITAL_PASSWORD to a password of at least 8 characters.');
    }

    const existing = await User.findOne({ email });

    if (existing) {
      console.log('A user with this email already exists.');
      return;
    }

    const userId = uid('USR');

    const user = await User.create({
      id: userId,
      role: 'hospital',
      name: 'CITY CARE HOSPITAL',
      email,
      password_hash: hashPassword(password),
      phone: '9876543210',
      location: 'Coimbatore'
    });

    await Hospital.create({
      id: uid('HSP'),
      user_id: userId,
      name: 'CITY CARE HOSPITAL',
      reg_id: 'HOSP1001',
      address: 'Coimbatore, Tamil Nadu',
      contact: '9876543210',
      email,
      doctor: 'Hospital Administrator'
    });

    await Settings.create({
      id: uid('SET'),
      user_id: userId
    });

    console.log('Hospital account created successfully.');
    console.log('Login email:', email);
    console.log('Hospital registration ID: HOSP1001');
  } catch (error) {
    console.error('Hospital creation failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createHospital();
