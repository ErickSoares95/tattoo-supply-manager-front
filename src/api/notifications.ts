import { apiClient } from './client';

export async function reprocessNotifications(): Promise<void> {
  await apiClient.post('/notifications/reprocess');
}
