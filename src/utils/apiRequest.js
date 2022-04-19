const HOST = process.env.REACT_APP_HOST;

const apiRequest = async ({ method, url, body }) => {
  const response = await fetch(HOST + url, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMDliNzYyNC1jODViLTQyMzAtODc0OC05YmQ5NWVhMTRjMWQiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTY1MjAxNjM1NCwiZXhwIjoxNjUzMzEyMzU0LCJhdWQiOiJodHRwczovL2V4YW1wbGUuaW4iLCJpc3MiOiJNeSBDb21wbnkgUHZ0IEx0ZCJ9.qrKajmY5rjZ7R0Zdfj-SaZRfhQl4EWZfsWXXpA8sJEg ',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default apiRequest;
