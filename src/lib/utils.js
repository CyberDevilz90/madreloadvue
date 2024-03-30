import axios from "axios";

class session {
  /*
    
  the interface for authUser is:
    {
      id_sales: number,
      id_user: number,
      nama_user: string,
      token: string,
      user_email: string
    }

  */
  setSession(item) {
    sessionStorage.setItem("authUser", item);
  }

  getSession() {
    const token = sessionStorage.getItem("authUser");
    return JSON.parse(token);
  }

  clearSession() {
    sessionStorage.clear();
  }
}

export const sessionDisk = new session();

export const apiUrl = process.env.VUE_APP_API_URL;

export const axiosPostFetch = (url, body) =>
  axios.post(url, body, {
    headers: { Authorization: `Bearer ${sessionDisk.getSession().token}` },
  });

export const getClock = () => {
  let clock = new Date();

  const formatClock = new Intl.DateTimeFormat("default", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  }).format(clock);

  const formatString =
    formatClock[0].length < 2 ? formatClock.padStart(8, "0") : formatClock;
  return formatString;
};

export const parseCurrency = (number) =>
  new Intl.NumberFormat("de-DE").format(number);

export const fetchWithAuth = (method, url, body) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let res;
    try {
      if (method === "POST") {
        res = await axiosPostFetch(url, body && body);
      } else if (method === "GET") {
        res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${sessionDisk.getSession().token}`,
          },
        });
      }
      resolve(res?.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const deepCopy = (value) => {
  return JSON.parse(JSON.stringify(value));
};
