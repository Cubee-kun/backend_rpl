const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const db = require('../models')
const bcrypt = require('bcryptjs')

async function run() {
  try {
    await db.sequelize.authenticate()
    // do not drop tables; we assume DB exists and migrations applied

    const username = process.env.ADMIN_USER || 'admin'
    const plain = process.env.ADMIN_PASS || 'admin123'
    const hash = bcrypt.hashSync(plain, 10)

    const [user, created] = await db.User.findOrCreate({
      where: { username },
      defaults: { password: hash, role: 'admin' },
    })

    if (!created) {
      user.password = hash
      user.role = 'admin'
      await user.save()
      console.log(`Updated password/role for existing user '${username}'`)
    } else {
      console.log(`Created admin user '${username}'`)
    }

    console.log('Seeder finished. Credentials:')
    console.log(`  username: ${username}`)
    console.log(`  password: ${plain}`)
    process.exit(0)
  } catch (err) {
    console.error('Seeder error:', err)
    process.exit(1)
  }
}

run()
