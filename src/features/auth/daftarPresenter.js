import { registerUser } from "./daftarModel";

export async function handleRegister(formData) {
  // Map form input ke format API
  const payload = {
    name: formData.name,
    gender: formData.gender,
    birth: formData.birth,
    email: formData.email,
    password: formData.password,
  };

  try {
    const result = await registerUser(payload);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}