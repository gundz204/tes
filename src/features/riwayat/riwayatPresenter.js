// src/features/riwayat/riwayatPresenter.js
import { riwayatModel } from './riwayatModel';

export function getRiwayatData() {
  return riwayatModel.getAll();
}

export function getDetailRiwayat(id) {
  return riwayatModel.getById(id);
}

// Tambahan opsional (modular):
export function searchRiwayat(keyword) {
  return riwayatModel.search(keyword);
}

export function sortRiwayat(order) {
  return riwayatModel.sortByDate(order);
}
