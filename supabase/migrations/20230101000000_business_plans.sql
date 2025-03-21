
-- Create business plans table
CREATE TABLE IF NOT EXISTS business_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  form_data JSONB NOT NULL,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS policies
ALTER TABLE business_plans ENABLE ROW LEVEL SECURITY;

-- Users can only read their own business plans
CREATE POLICY "Users can read own business plans" 
  ON business_plans 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can only insert their own business plans
CREATE POLICY "Users can insert own business plans" 
  ON business_plans 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own business plans
CREATE POLICY "Users can update own business plans" 
  ON business_plans 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can only delete their own business plans
CREATE POLICY "Users can delete own business plans" 
  ON business_plans 
  FOR DELETE 
  USING (auth.uid() = user_id);
