const userSeeder = require('./seeders/userSeeder');
const proposalSeeder = require('./seeders/proposalSeeder');
const { Proposal, ReportLPJ } = require('./models');

async function runAllSeeders() {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Clear all data in correct order (respecting foreign keys)
    console.log('🧹 Clearing existing data...');
    await ReportLPJ.destroy({ where: {} });
    await Proposal.destroy({ where: {} });
    console.log('Cleared reports and proposals');
    
    // 1. Seed users first
    console.log('\n👥 Seeding users...');
    await userSeeder();
    
    console.log('\n---\n');
    
    // 2. Seed proposals (depends on users)
    console.log('📋 Seeding proposals...');
    await proposalSeeder();
    
    console.log('\n🎉 ALL SEEDERS COMPLETED SUCCESSFULLY!');
    console.log('\n📝 Quick Start Guide:');
    console.log('1. Login as admin (admin / password123) to manage proposals');
    console.log('2. Login as organisasi (bem_ftik / password123) to create proposals'); 
    console.log('3. Login as public user (mahasiswa1 / password123) to view public content');
    console.log('\n🚀 Your RPL system is ready for testing!');
    
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runAllSeeders()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}

module.exports = runAllSeeders;