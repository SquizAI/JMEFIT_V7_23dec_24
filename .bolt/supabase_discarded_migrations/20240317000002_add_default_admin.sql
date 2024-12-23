-- Add default admin user if not exists
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'admin@jmefit.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"display_name": "Admin User", "role": "admin"}',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@jmefit.com'
);

-- Ensure admin profile exists
INSERT INTO public.profiles (id, display_name, role)
SELECT 
  id,
  'Admin User',
  'admin'
FROM auth.users 
WHERE email = 'admin@jmefit.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';