const API_url = "http://127.0.0.1:8000/api/companies/";

export const listCompanies = async () => {
  return await fetch(API_url);
};
export const getCompany = async (companyId) => {
  return await fetch(`${API_url}${companyId}`);
};

export const registerCompany = async (newCompany) => {
  return await fetch(API_url, {
    method: "POST",

    body: JSON.stringify({
      name: String(newCompany.name).trim(),
      foundation: parseInt(newCompany.foundation),
      website: String(newCompany.website).trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });
};
export const updateCompany = async (companyId, updatedCompany) => {
    console.log(companyId);
    console.log(updatedCompany);
  return await fetch(`${API_url}${companyId}`, {
    method: "PUT",
    body: JSON.stringify({
      name: String(updatedCompany.name).trim(),
      foundation: parseInt(updatedCompany.foundation),
      website: String(updatedCompany.website).trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteCompany = async (companyId) => {
  return await fetch(`${API_url}${companyId}`, {
    method: "DELETE",
  });
};
