import * as profileModel from "./profilModel";

export function createProfilPresenter(viewCallbacks) {
  const loadUser = async () => {
    try {
      viewCallbacks.onLoadStart();
      const response = await profileModel.fetchUserProfile();
      const userData = response.data;
      viewCallbacks.onLoadSuccess(userData);
    } catch (error) {
      viewCallbacks.onLoadError(error.message);
    }
  };

  const updateUser = async (data) => {
    try {
      console.log("updateUser: Mengirim data ke model", data);
      const response = await profileModel.updateUserProfile(data);
      console.log("updateUser: Respons diterima", response);
    } catch (error) {
      console.error("updateUser: Terjadi kesalahan", error);
    }
  };


  return {
    loadUser,
    updateUser,
  };
}
