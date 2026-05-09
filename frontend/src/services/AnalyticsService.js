import { request } from './request';

export const getAnalytics = async () => {
  return await request("GET", "/api/analytics");
}