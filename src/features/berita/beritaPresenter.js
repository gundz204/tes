import { getAllBerita } from "./beritaModel";

export const fetchBerita = async (onSuccess, onError) => {
  const { success, data, error } = await getAllBerita();

  if (success) {
    onSuccess(data);
  } else {
    onError(error);
  }
};
