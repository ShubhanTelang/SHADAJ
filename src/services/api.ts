import axios from 'axios';
export const api=axios.create({baseURL:'/api',withCredentials:true});
export function setCsrf(value:string){api.defaults.headers.common['X-CSRFToken']=value}
export function message(e:unknown){return axios.isAxiosError(e)?e.response?.data?.error||'Cannot reach Shadaj. Check the backend connection.':String(e)}
export type User={id:number;email:string;role:string};
export type Raga={id:string;name:string;available:boolean;reason:string|null;version:string|null;profile:Record<string,any>;aroha:string|null;avaroha:string|null;time:string|null;metadata_source:string|null;validation:string};
export type Job={id:string;status:string;stage:string;cancel_requested:boolean;created_at:string;error:string|null;config:{raga:string;form:string;duration:number;tempo:string;tonic:number;instrument:string};saved:boolean;report:any;artifacts:{kind:string;url:string;size:number}[]};
