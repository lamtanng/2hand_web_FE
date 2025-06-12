import axios from 'axios';
import { openaiPaths } from '../constants/apiPaths/openai';
import { baseURL, headers, withCredentials } from './axios.constants';

const axiosAI = axios.create({ baseURL, headers, withCredentials });

const getAIUrl = (url: string) => `${openaiPaths.promptAIPath}/${url}`;
const promptAIUrl = getAIUrl('');
const checkCommunityStandardsAIUrl = getAIUrl('check-violation');

const integrateAI = (content: any) => {
  return axiosAI.post(promptAIUrl, content);
};

const checkCommunityStandards = (content: (string|undefined)[], images: string[]) => {
  return axiosAI.post(checkCommunityStandardsAIUrl, { content, images });
};

export const openAIAPIs = { integrateAI, checkCommunityStandards };
