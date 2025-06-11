const API_BASE = "https://sehati-api.arykurnia.my.id/users";

function getAuthToken() {
  return localStorage.getItem("token");
}

function getUserId() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.userId;
}

export async function fetchUserProfile() {
  const id = getUserId();
  const token = getAuthToken();
  if (!id || !token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.statusText}`);
  }
  return res.json();
}

export async function updateUserProfile(data) {
  const id = getUserId();
  const token = getAuthToken();
  if (!id || !token) throw new Error("Unauthorized");

  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseBody = await res.json();

  if (!res.ok) {
    const errorMessage = responseBody?.message || res.statusText || "Gagal memperbarui data";
    throw new Error(errorMessage);
  }

  return responseBody;
}

