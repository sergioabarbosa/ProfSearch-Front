import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.17:3000'
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
  const request = await api.post("/users", {
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

export const getUsers = async (access_token) => {
  try {
    const request = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(request.data);
    await AsyncStorage.setItem("users", JSON.stringify(request.data));
    return request.data;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return null;
  }
};

export const getUser = async (access_token, _id) => {
  try {
    const request = await api.get(`/users/${_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(request.data);
    return request.data;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    return null;
  }
};

export const updateUser = async (access_token, _id, name, email, password) => {
  try {
    const request = await api.put(`/users/${_id}`, { name, email, password }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(request.data);
    return request.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return null;
  }
};
