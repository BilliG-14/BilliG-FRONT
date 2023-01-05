/*Category CRUD */
import api from 'api/customAxios';
import { CategoryType } from 'types/categoryType';

const endPoint = 'category';
export const apiCategory = {
  GET: async () => {
    const { data } = await api.get(`${endPoint}`);
    return data;
  },
  CREATE: async (catogoryName: string) => {
    const { data } = await api.post(`/${endPoint}`, { name: catogoryName });
    return data;
  },
  UPDATE: async ({ _id, name }: CategoryType) => {
    await api.patch(`${endPoint}/${_id}`, { name: name });
  },
  DELETE: async (_id: string) => {
    await api.delete(`${endPoint}/${_id}`);
  },
};

export const getCategories = async () => {
  try {
    const data = await apiCategory.GET();
    return data;
  } catch (error) {}
};
