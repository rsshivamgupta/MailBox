import axios from "axios";
import { useEffect, useState } from "react";

export const usePost = (url, obj, headers) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(url, obj, { headers }).then((result) => {
      setData(result);
    });
  }, [url]);

  return [data];
};

export const useGet = (url, headers = null) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(url, { headers }).then((result) => {
      setData(result);
    });
  }, [url]);

  return [data];
};
