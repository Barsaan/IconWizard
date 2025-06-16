import { supabase } from './client';

export const isStyleFavorited = async (styleId: string): Promise<boolean> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    if (!session?.user?.id) return false;

    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('style_id', styleId)
      .eq('user_id', session.user.id)
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

export const toggleFavorite = async (
  styleId: string,
  styleName: string,
  styleImage: string
): Promise<boolean | undefined> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    if (!session?.user?.id) return undefined;

    const { data: existing, error: checkError } = await supabase
      .from('favorites')
      .select('id')
      .eq('style_id', styleId)
      .eq('user_id', session.user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    if (existing) {
      // Remove from favorites if it exists
      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('id', existing.id);

      if (deleteError) throw deleteError;
      return false;
    } else {
      // Add to favorites if it doesn't exist
      const { error: insertError } = await supabase
        .from('favorites')
        .insert([
          {
            style_id: styleId,
            style_name: styleName,
            style_image: styleImage,
            user_id: session.user.id,
          },
        ]);

      if (insertError) throw insertError;
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return undefined;
  }
};