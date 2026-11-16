/**
 * Submit a lead to the Google Apps Script backend.
 */
export async function submitLead(data) {
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;
  if (!endpoint) {
    throw new Error("Missing VITE_LEADS_ENDPOINT");
  }

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Network error");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid response");
  }

  if (!result || result.ok !== true) {
    throw new Error("Submission failed");
  }

  return result;
}
