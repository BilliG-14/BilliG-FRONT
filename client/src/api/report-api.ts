import { NewReportType } from 'types/reportType';
import api from './customAxios';

/*Report CRUD */
const endPoint = 'report';
export const apiReports = {
  GET: async () => {
    const { data } = await api.get(`/${endPoint}`);
    return data;
  },
  CREATE: async (newReport: NewReportType) => {
    const { data } = await api.post(`/report`, newReport);
    return data;
  },
  DELETE: async (_id: string) => {
    await api.delete(`/${endPoint}/${_id}`);
  },
};

export const getReports = async () => {
  const data = await apiReports.GET();
  return data;
};
