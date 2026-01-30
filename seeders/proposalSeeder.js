const { Proposal, User } = require('../models');

async function seedProposals() {
  try {
    // Don't clear proposals here, will be done in main seeder  
    console.log('Creating proposals...');

    // Get organisasi users
    const orgUsers = await User.findAll({ where: { role: 'organisasi' } });
    
    if (orgUsers.length === 0) {
      console.log('❌ No organisasi users found. Please run user seeder first.');
      return;
    }
    
    console.log(`Found ${orgUsers.length} organisasi users`);

    // Sample proposals
    const proposals = [
      {
        userId: orgUsers[0]?.id, // bem_ftik
        judul: 'Seminar Nasional Teknologi Informasi 2026',
        deskripsi: 'Seminar nasional dengan tema "AI dan Masa Depan Digital Indonesia". Menghadirkan pembicara dari industri tech terkemuka dan akademisi.',
        dana_diajukan: 15000000,
        tgl_pelaksanaan: '2026-03-15',
        organisasi: 'BEM',
        penanggung_jawab: 'Ahmad Rizki',
        status: 'pending'
      },
      {
        userId: orgUsers[1]?.id, // hima_if
        judul: 'Workshop Machine Learning untuk Pemula',
        deskripsi: 'Workshop 3 hari tentang dasar-dasar machine learning menggunakan Python. Target peserta mahasiswa semester 4-6.',
        dana_diajukan: 8500000,
        tgl_pelaksanaan: '2026-02-20',
        organisasi: 'HIMA',
        penanggung_jawab: 'Sarah Dewi',
        status: 'approved'
      },
      {
        userId: orgUsers[2]?.id, // hima_si
        judul: 'Kompetisi Sistem Informasi Innovation Challenge',
        deskripsi: 'Kompetisi pengembangan sistem informasi inovatif untuk menyelesaikan masalah nyata di masyarakat.',
        dana_diajukan: 12000000,
        tgl_pelaksanaan: '2026-04-10',
        organisasi: 'HIMA',
        penanggung_jawab: 'Budi Santoso',
        status: 'revision'
      },
      {
        userId: orgUsers[3]?.id, // ukm_robotika
        judul: 'Pelatihan Robotika dan IoT',
        deskripsi: 'Pelatihan pembuatan robot sederhana dan implementasi Internet of Things untuk smart home.',
        dana_diajukan: 18000000,
        tgl_pelaksanaan: '2026-03-25',
        organisasi: 'UKM',
        penanggung_jawab: 'Indra Kusuma',
        status: 'pending'
      },
      {
        userId: orgUsers[4]?.id || orgUsers[0]?.id, // ukm_music or fallback to first org
        judul: 'Festival Musik Kampus 2026',
        deskripsi: 'Festival musik tahunan dengan menampilkan band-band kampus dan guest star dari musisi nasional.',
        dana_diajukan: 25000000,
        tgl_pelaksanaan: '2026-05-12',
        organisasi: 'UKM',
        penanggung_jawab: 'Lisa Permata',
        status: 'rejected'
      },
      {
        userId: orgUsers[0]?.id, // bem_ftik
        judul: 'Bakti Sosial Desa Digital',
        deskripsi: 'Program pengabdian masyarakat untuk digitalisasi administrasi desa dan pelatihan literasi digital.',
        dana_diajukan: 10000000,
        tgl_pelaksanaan: '2026-06-08',
        organisasi: 'BEM',
        penanggung_jawab: 'Andi Pratama',
        status: 'approved'
      }
    ].filter(p => p.userId); // Filter out any proposals without valid userId
    // Insert proposals
    const createdProposals = await Proposal.bulkCreate(proposals);
    
    console.log('\n✅ Proposal seeder completed successfully!');
    console.log(`\n📊 Created ${createdProposals.length} sample proposals:`);
    console.log('- Pending: 2 proposals');
    console.log('- Approved: 2 proposals');
    console.log('- Revision: 1 proposal');
    console.log('- Rejected: 1 proposal');
    
    return createdProposals;
  } catch (error) {
    console.error('❌ Error seeding proposals:', error);
    throw error;
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedProposals()
    .then(() => {
      console.log('\n🎉 Proposal seeder finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Proposal seeder failed:', error);
      process.exit(1);
    });
}

module.exports = seedProposals;