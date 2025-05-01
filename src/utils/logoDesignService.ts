
import { supabase } from '@/integrations/supabase/client';

export interface LogoDesign {
  id?: string;
  user_id: string;
  brand_name: string;
  form_data: any;
  image_url?: string | null;
  prompt_text?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const logoDesignService = {
  async getUserLogoDesigns(userId: string) {
    return supabase
      .from('logo_designs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },
  
  async getLogoDesignById(id: string) {
    return supabase
      .from('logo_designs')
      .select('*')
      .eq('id', id)
      .single();
  },
  
  async saveLogoDesign(design: Omit<LogoDesign, 'id' | 'created_at' | 'updated_at'>) {
    return supabase
      .from('logo_designs')
      .insert(design)
      .select()
      .single();
  },
  
  async deleteLogoDesign(id: string) {
    return supabase
      .from('logo_designs')
      .delete()
      .eq('id', id);
  }
};
