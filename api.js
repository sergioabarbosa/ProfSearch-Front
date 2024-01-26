import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const createSession = async (username, password) => {
  const request = await api.post("/auth/login", { username, password });
  console.log(request);
  return request;
};

export const createUser = async (
  name,
  username,
  userPlan,
  telephone,
  cpf,
  image,
  email,
  usertype,
  password,
  confirmpassword,
  address
) => {
  const request = await api.post("/auth/register", {
    name,
    username,
    userPlan,
    telephone,
    cpf,
    image,
    email,
    usertype,
    password,
    confirmpassword,
    address: {
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode
    }
  });
  console.log(request);
  return request;
};

export const getUsers = async (token) => {
  const request = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  localStorage.setItem("users", JSON.stringify(request.data));
  return request.data;
};
getUsers().then((users) => console.log(users));

// export const getUser = async (token, id) => {
//   const request = await api.get(`/users/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(request.data);
//   return request.data;
// };
// getUser().then((user) => console.log(user)); 

export const updateUser = async (token, id, name, email, password) => {
  const request = await api.put(`/users/${id}`, { name, email, password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  return request.data;
}
// updateUser().then((user) => console.log(user));