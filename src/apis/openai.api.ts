import axios from "axios";
import { openaiPaths } from "../constants/apiPaths/openai";
import { baseURL, headers, withCredentials } from "./axios.constants";

const axiosAI = axios.create({ baseURL, headers, withCredentials });

const getAIUrl = (url: string) => `${openaiPaths.promptAIPath}/${url}`;
const promptAIUrl = getAIUrl('');

const integrateAI = (content: any) => {
    return axiosAI.post(promptAIUrl, content);
  };

export const openAIAPIs = { integrateAI };