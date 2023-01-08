/* Endpoints config. */
const endPoints = {
  url1: `http://localhost:5000/api/v1/records/`,
  url2: `http://localhost:5000/api/v1/records/quiz/`,
  url3: `http://localhost:5000/api/v1/records/get/`,
  url4: `http://localhost:5000/api/v1/records/post/`,
  url5: `http://localhost:5000/api/v1/records/post/batch/`,
  url6: `http://localhost:5000/api/v1/records/update/`,
  url7: `http://localhost:5000/api/v1/records/delete/`,
};

const authRoute = {
  url: (role, path) => {
    return `http://localhost:5000/api/v1/${role}/${path}`;
  },
  url2: (role, email) => {
    return `http://localhost:5000/api/v1/${role}/${email}`;
  },
};

export { endPoints, authRoute };
