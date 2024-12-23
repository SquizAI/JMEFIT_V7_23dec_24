import { supabase } from '../../lib/supabase';
import type { Content } from '../../types/content';

export class ContentService {
  static async createContent(data: Partial<Content>) {
    const { data: content, error } = await supabase
      .from('content')
      .insert([{
        ...data,
        version_count: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return content;
  }

  static async updateContent(id: string, data: Partial<Content>) {
    const { data: content, error } = await supabase
      .from('content')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return content;
  }

  static async scheduleContent(contentId: string, publishAt: Date) {
    const { data, error } = await supabase
      .from('scheduled_content')
      .insert([{
        content_id: contentId,
        publish_at: publishAt.toISOString(),
        created_by: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getContentVersions(contentId: string) {
    const { data, error } = await supabase
      .from('content_versions')
      .select('*')
      .eq('content_id', contentId)
      .order('version', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async revertToVersion(contentId: string, versionId: string) {
    const { data: version, error: versionError } = await supabase
      .from('content_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (versionError) throw versionError;

    const { data: content, error: contentError } = await supabase
      .from('content')
      .update({
        title: version.title,
        slug: version.slug,
        content: version.content,
        description: version.description,
        image_url: version.image_url,
        current_version: versionId,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId)
      .select()
      .single();

    if (contentError) throw contentError;
    return content;
  }
}