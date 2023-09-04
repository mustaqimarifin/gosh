import axios, { type AxiosRequestConfig } from "axios"

export const fetcher = async (url: AxiosRequestConfig<any>) => {
  try {
    const res = await axios(url)
    const { data } = res
    return data
  } catch (err) {
    console.log(err)
  }
}
