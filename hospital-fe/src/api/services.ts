import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7200/",
  timeout: 1000
});

const drugs = {
  list: async (): Promise<string> => {
    try {
      return (await instance.get<string>("/drugs")).data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

const patients = {
  list: async (): Promise<string> => {
    try {
      return (await instance.get<string>("/patients")).data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export default { drugs, patients };
