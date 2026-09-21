/*
  Seed script for backend database.

  Usage:
    # import sample data
    node seed.js

    # destroy (remove) sample data
    node seed.js -d

  Make sure backend/.env has a valid MONGO_URI and run from the project root.
*/

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const Product = require('./model/Product');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fstack';

const usersData = [
  { name: 'Admin User', email: 'admin@example.com', password: 'adminpass', role: 'admin' },
  { name: 'John Doe', email: 'john@example.com', password: 'password1' },
  { name: 'Jane Doe', email: 'jane@example.com', password: 'password2' }
];

const productsData = [
  {
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald.',
    price: 12.99,
    category: 'Books',
    stock: 50,
    imageUrl: 'https://via.placeholder.com/400x300?text=Gatsby'
  },
  {
    name: 'Wireless Headphones',
    description: 'Comfortable over-ear Bluetooth headphones.',
    price: 59.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://via.placeholder.com/400x300?text=Headphones'
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for everyday training.',
    price: 79.99,
    category: 'Sports',
    stock: 40,
    imageUrl: 'https://via.placeholder.com/400x300?text=Shoes'
  }
];

async function connectDB() {
  mongoose.connect(process.env.MONGO_URI);
  console.log('Seed: Connected to', MONGO);
}

async function importData() {
  try {
    await connectDB();
    // cleanup existing
    await User.deleteMany();
    await Product.deleteMany();

    // hash passwords
    const usersToInsert = [];
    for (const u of usersData) {
      const hashed = await bcrypt.hash(u.password, 10);
      usersToInsert.push({ ...u, password: hashed });
    }

    const createdUsers = await User.insertMany(usersToInsert);
    console.log('Seed: created users:', createdUsers.map(u => ({ email: u.email, role: u.role })));

    // create products
    const createdProducts = await Product.insertMany(productsData);
    console.log('Seed: created products:', createdProducts.map(p => p.name));

    console.log('Seed: Import completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seed import error:', err);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await connectDB();
    await User.deleteMany();
    await Product.deleteMany();
    console.log('Seed: Data destroyed (users, products cleared)');
    process.exit(0);
  } catch (err) {
    console.error('Seed destroy error:', err);
    process.exit(1);
  }
}

if (process.argv.includes('-d')) {
  destroyData();
} else {
  importData();
}
