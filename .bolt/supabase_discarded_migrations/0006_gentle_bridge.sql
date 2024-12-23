/*
  # Add popular column to memberships table

  1. Changes
    - Add `popular` column to memberships table
    - Update existing memberships to set popular flag
*/

-- Add popular column if it doesn't exist
DO $$ 
BEGIN
    ALTER TABLE public.memberships ADD COLUMN IF NOT EXISTS popular BOOLEAN DEFAULT false;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;

-- Update existing memberships to set popular flag
UPDATE public.memberships 
SET popular = CASE 
    WHEN name = 'Pro' THEN true 
    ELSE false 
END
WHERE name IN ('Basic', 'Pro', 'Elite');