import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import supabase from 'lib/supabase/client';
export const fetcher = async (url: AxiosRequestConfig<any>) => {
  try {
    const res = await axios(url);
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err);
  }
};
