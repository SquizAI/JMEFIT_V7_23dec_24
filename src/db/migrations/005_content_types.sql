-- Content types for meals, workouts, outfits, and advice
CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK(type IN ('meal', 'snack')) NOT NULL,
  calories INTEGER,
  protein DECIMAL(5,2),
  carbs DECIMAL(5,2),
  fats DECIMAL(5,2),
  ingredients TEXT,
  instructions TEXT,
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workout_splits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
  type TEXT CHECK(type IN ('push', 'pull', 'legs', 'upper', 'lower', 'full')) NOT NULL,
  exercises TEXT NOT NULL, -- JSON array of exercise objects
  duration INTEGER, -- in minutes
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS outfits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK(category IN ('workout', 'casual', 'athleisure')) NOT NULL,
  items TEXT NOT NULL, -- JSON array of clothing items
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nutrition_advice (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK(category IN ('general', 'macros', 'supplements', 'timing')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Downloadable content and products
CREATE TABLE IF NOT EXISTS digital_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK(type IN ('guide', 'plan', 'recipe_book', 'cheat_sheet')) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  file_url TEXT,
  preview_url TEXT,
  downloads INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Client onboarding
CREATE TABLE IF NOT EXISTS questionnaires (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  questions TEXT NOT NULL, -- JSON array of question objects
  type TEXT CHECK(type IN ('health', 'nutrition', 'fitness', 'goals')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  questionnaire_id INTEGER REFERENCES questionnaires(id),
  responses TEXT NOT NULL, -- JSON object of answers
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grocery_lists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT CHECK(type IN ('staples', 'custom')) NOT NULL,
  items TEXT NOT NULL, -- JSON array of grocery items
  user_id INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_meals_type ON meals(type);
CREATE INDEX IF NOT EXISTS idx_workout_splits_difficulty ON workout_splits(difficulty);
CREATE INDEX IF NOT EXISTS idx_outfits_category ON outfits(category);
CREATE INDEX IF NOT EXISTS idx_nutrition_advice_category ON nutrition_advice(category);
CREATE INDEX IF NOT EXISTS idx_digital_products_type ON digital_products(type);
CREATE INDEX IF NOT EXISTS idx_questionnaires_type ON questionnaires(type);