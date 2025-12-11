import constant from '../constant/constant';

const commonApi = async (endpoint, method = "GET", body = null, isFormData = false, headers = {}) => {
  const url = `${constant.base_url}/${endpoint}`;

  const options = {
    method,
    headers: {
      ...headers,
    },
  };

  if (body) {
    if (isFormData) {
      options.body = body;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error("Fetch API Error:", error);
    throw error;
  }
};

export default commonApi;
