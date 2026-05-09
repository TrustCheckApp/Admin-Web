import { apiRequest } from '@/lib/api-client';

export type ModerationStatus = 'pending_moderation' | 'published' | 'rejected' | 'closed_unresolved';

export interface ModerationCase {
  id: string;
  publicId: string;
  companyName: string;
  consumerDisplayName: string;
  category: string;
  description: string;
  status: ModerationStatus;
  createdAt: string;
  evidences: Evidence[];
  moderationHistory: ModerationHistory[];
}

export interface Evidence {
  id: string;
  url: string;
  type: 'image' | 'document';
}

export interface ModerationHistory {
  id: string;
  adminId: string;
  adminName: string;
  decision: 'approved' | 'rejected';
  reason?: string;
  timestamp: string;
}

export interface ModerationFilters {
  status?: ModerationStatus;
  category?: string;
  ageRange?: '0-7' | '8-30' | '31-90' | '90+';
}

export async function getModerationQueue(filters?: ModerationFilters): Promise<ModerationCase[]> {
  return apiRequest<ModerationCase[]>('/moderation/queue', {
    method: 'GET',
    ...(filters && {
      body: JSON.stringify(filters),
    }),
  });
}

export async function getModerationCase(id: string): Promise<ModerationCase> {
  return apiRequest<ModerationCase>(`/moderation/cases/${id}`, {
    method: 'GET',
  });
}

export async function approveCase(id: string, comment?: string): Promise<void> {
  return apiRequest<void>(`/moderation/${id}/approve`, {
    method: 'POST',
    body: JSON.stringify({ comment }),
  });
}

export async function rejectCase(id: string, reason: string): Promise<void> {
  return apiRequest<void>(`/moderation/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
}
