
import { supabase } from '@/integrations/supabase/client';

// Types for business plans in the database
export interface StoredBusinessPlan {
  id?: string;
  user_id: string;
  business_name: string;
  form_data: Record<string, any>;
  plan_data: Record<string, string>;
  created_at?: string;
  updated_at?: string;
  industry?: string;
  status?: 'draft' | 'published' | 'archived';
}

// Helper functions for business plans
export const businessPlanService = {
  async savePlan(plan: Omit<StoredBusinessPlan, 'id' | 'created_at' | 'updated_at'>) {
    return supabase
      .from('business_plans')
      .insert(plan)
      .select()
      .single();
  },
  
  async getUserPlans(userId: string) {
    return supabase
      .from('business_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  async getPlanById(planId: string) {
    return supabase
      .from('business_plans')
      .select('*')
      .eq('id', planId)
      .single();
  },
  
  async updatePlan(planId: string, updates: Partial<StoredBusinessPlan>) {
    return supabase
      .from('business_plans')
      .update(updates)
      .eq('id', planId)
      .select()
      .single();
  },
  
  async deletePlan(planId: string) {
    return supabase
      .from('business_plans')
      .delete()
      .eq('id', planId);
  }
};
