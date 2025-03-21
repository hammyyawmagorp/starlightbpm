-- First, drop the existing table if it exists
DROP TABLE IF EXISTS "services" CASCADE;

-- Create a new table with a simple structure
CREATE TABLE "services" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "priceRange" VARCHAR(255) NOT NULL,
    "jobType" VARCHAR(255) NOT NULL
); 