import dotenv from 'dotenv'
dotenv.config();
import pg from 'pg'
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

// const initializeDB = async () => {
//   const schemaPath = path.join(__dirname, 'schema.sql');
//   const seedsPath = path.join(__dirname, 'seeds.sql');

//   try {
//     const schema = await fs.promises.readFile(schemaPath, 'utf8');
//     await pool.query(schema);
//     console.log("Database schema created.");

//     const seeds = await fs.promises.readFile(seedsPath, 'utf8');
//     await pool.query(seeds);
//     console.log("Database seeded");
//   } catch (err) {
//     console.error("Error initializing database", err);
//   }
// };

// pool.connect()
//     .then(() => {
//     console.log("Connected to the Employee Tracking Database");
//     initializeDB();
//   })
//   .catch(err => {
//     console.error("Connection failed", err);
//   });

// module.exports = pool; //export the pool for use in other modules

const connectToDb = async () => {
  try {
      await pool.connect();
  } catch (error) {
      console.error('Error connecting to database:', error);
      process.exit(1);
  }
};

export { pool, connectToDb };