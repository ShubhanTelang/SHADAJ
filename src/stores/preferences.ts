import {create} from 'zustand';
import {persist} from 'zustand/middleware';
type Preferences={theme:'light'|'dark';volume:number;reducedMotion:boolean;lastJob:string|null;setTheme:(t:'light'|'dark')=>void;setVolume:(v:number)=>void;setReducedMotion:(v:boolean)=>void;setLastJob:(v:string)=>void};
export const usePreferences=create<Preferences>()(persist(set=>({theme:'light',volume:.8,reducedMotion:false,lastJob:null,setTheme:theme=>set({theme}),setVolume:volume=>set({volume}),setReducedMotion:reducedMotion=>set({reducedMotion}),setLastJob:lastJob=>set({lastJob})}),{name:'shadaj-preferences'}));
