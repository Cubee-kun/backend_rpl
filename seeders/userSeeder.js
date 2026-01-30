const bcrypt = require('bcryptjs');
const { User } = require('../models');

async function seedUsers() {
  try {
    // Don't clear users here, will be done in main seeder
    console.log('Creating users...');

    // Check if users already exist
    const existingUserCount = await User.count();
    if (existingUserCount > 0) {
      await User.destroy({ where: {} });
      console.log('Cleared existing users');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create users with different roles
    const users = [
      // Admin users
      {
        username: 'admin',
        email: 'admin@iwu.ac.id',
        password: hashedPassword,
        role: 'admin',
        full_name: 'Administrator System'
      },
      {
        username: 'admin2',
        email: 'admin2@iwu.ac.id', 
        password: hashedPassword,
        role: 'admin',
        full_name: 'Admin Kedua'
      },
      
      // Organisasi users
      {
        username: 'bem_ftik',
        email: 'bem@iwu.ac.id',
        password: hashedPassword,
        role: 'organisasi',
        full_name: 'BEM FTIK'
      },
      {
        username: 'hima_if',
        email: 'hima.if@iwu.ac.id',
        password: hashedPassword,
        role: 'organisasi',
        full_name: 'HIMA Informatika'
      },
      {
        username: 'hima_si',
        email: 'hima.si@iwu.ac.id',
        password: hashedPassword,
        role: 'organisasi',
        full_name: 'HIMA Sistem Informasi'
      },
      {
        username: 'ukm_robotika',
        email: 'robotika@iwu.ac.id',
        password: hashedPassword,
        role: 'organisasi',
        full_name: 'UKM Robotika'
      },
      {
        username: 'ukm_music',
        email: 'music@iwu.ac.id',
        password: hashedPassword,
        role: 'organisasi',
        full_name: 'UKM Music Club'
      },
      
      // Public users
      {
        username: 'mahasiswa1',
        email: 'mahasiswa1@student.ac.id',
        password: hashedPassword,
        role: 'publik',
        full_name: 'Mahasiswa Satu'
      },
      {
        username: 'mahasiswa2',
        email: 'mahasiswa2@student.ac.id',
        password: hashedPassword,
        role: 'publik',
        full_name: 'Mahasiswa Dua'
      },
      {
        username: 'public_user',
        email: 'public@mail.com',
        password: hashedPassword,
        role: 'publik',
        full_name: 'User Publik'
      }
    ];

    // Insert users
    const createdUsers = await User.bulkCreate(users);
    
    console.log('\n✅ User seeder completed successfully!');
    console.log('\n📋 Created users:');
    console.log('\n🔐 ADMIN ACCOUNTS:');
    console.log('Username: admin | Password: password123 | Role: admin');
    console.log('Username: admin2 | Password: password123 | Role: admin');
    
    console.log('\n🏢 ORGANISASI ACCOUNTS:');
    console.log('Username: bem_ftik | Password: password123 | Role: organisasi');
    console.log('Username: hima_if | Password: password123 | Role: organisasi');
    console.log('Username: hima_si | Password: password123 | Role: organisasi');
    console.log('Username: ukm_robotika | Password: password123 | Role: organisasi');
    console.log('Username: ukm_music | Password: password123 | Role: organisasi');
    
    console.log('\n👥 PUBLIC ACCOUNTS:');
    console.log('Username: mahasiswa1 | Password: password123 | Role: publik');
    console.log('Username: mahasiswa2 | Password: password123 | Role: publik');
    console.log('Username: public_user | Password: password123 | Role: publik');
    
    console.log('\n🚀 You can now login with any of these accounts to test different features!');
    
    return createdUsers;
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedUsers()
    .then(() => {
      console.log('\n🎉 Seeder finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeder failed:', error);
      process.exit(1);
    });
}

module.exports = seedUsers;