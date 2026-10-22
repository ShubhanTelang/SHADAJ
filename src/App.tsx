import {createContext,useContext,useEffect,useState} from 'react';
import {Link,NavLink,Route,Routes,useLocation} from 'react-router-dom';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {MotionConfig} from 'framer-motion';
import {Home,SlidersHorizontal,Library,History,AudioLines,ShieldCheck,Settings,Menu,Moon,Sun,ArrowUpRight,LogOut} from 'lucide-react';
import {api,message,setCsrf,type User,type Raga} from './services/api';
import {usePreferences} from './stores/preferences';
import {Button} from './components/ui/button';
import {Landing,RagaLibrary,RagaDetail,SettingsPage,HowItWorks} from './pages/Explore';
import {CreatePage,ResultPage,HistoryPage,QAPage,AdminPage,AuthPage} from './pages/Studio';
const AuthContext=createContext<{user:User|null;refresh:()=>Promise<void>}>({user:null,refresh:async()=>{}});
export const useAuth=()=>useContext(AuthContext);
export function useRagas(){return useQuery({queryKey:['ragas'],queryFn:async()=>(await api.get<Raga[]>('/ragas')).data})}
export default function App(){
 const client=useQueryClient();const location=useLocation();const [menu,setMenu]=useState(false);const {theme,setTheme,reducedMotion}=usePreferences();
 const session=useQuery({queryKey:['session'],queryFn:async()=>{const {data}=await api.get('/session');setCsrf(data.csrf);return data}});
 const user=session.data?.user||null;
 async function refresh(){await client.invalidateQueries({queryKey:['session']});await client.invalidateQueries({queryKey:['history']})}
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.dataset.motion=reducedMotion?'reduced':'auto'},[theme,reducedMotion]);
 useEffect(()=>{setMenu(false);window.scrollTo(0,0)},[location.pathname]);
 const nav=[['/','Home',Home],['/create','Create',SlidersHorizontal],['/ragas','Ragas',Library],['/history','History',History],['/studio','Audio Studio',AudioLines],['/qa','QA',ShieldCheck],['/settings','Settings',Settings]] as const;
 return <AuthContext.Provider value={{user,refresh}}><MotionConfig reducedMotion={reducedMotion?'always':'user'}><a className="skip" href="#content">Skip to content</a>
 <aside className={'sidebar '+(menu?'open':'')}><Link to="/" className="brand"><span className="brand-symbol">श</span><span>shadaj<small>THE CLASSICAL STUDIO</small></span></Link><p className="sidebar-label">YOUR CREATIVE SPACE</p><nav>{nav.map(([path,label,Icon])=><NavLink key={path} to={path} end={path==='/'}><Icon size={18}/>{label}</NavLink>)}{user?.role==='admin'&&<NavLink to="/admin"><ShieldCheck size={18}/>Administration</NavLink>}</nav><div className="sidebar-bottom"><div className="mini-wave">│╷│╵│╷│╵│</div><p>Rooted in tradition.<br/>Open to possibility.</p><Link to="/how-it-works">How Shadaj works <ArrowUpRight size={14}/></Link></div></aside>
 {menu&&<button className="nav-scrim" aria-label="Close navigation" onClick={()=>setMenu(false)}/>}
 <div className="shell"><header className="topbar"><button className="icon-button mobile-menu" aria-label="Toggle navigation" aria-expanded={menu} onClick={()=>setMenu(!menu)}><Menu/></button><span className="topbar-note">A space for thoughtful music.</span><div className="top-actions"><button className="icon-button" aria-label={'Switch to '+(theme==='light'?'dark':'light')+' mode'} onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?<Moon size={18}/>:<Sun size={18}/>}</button>{user?<><span className="account-email">{user.email}</span><button className="icon-button" aria-label="Sign out" onClick={async()=>{await api.post('/auth/logout');await refresh()}}><LogOut size={18}/></button></>:<Link to="/auth" className="signin">Sign in <ArrowUpRight size={15}/></Link>}</div></header>
 <main id="content">{session.isError&&<div className="connection-error" role="alert">{message(session.error)} <Button variant="outline" onClick={()=>session.refetch()}>Reconnect</Button></div>}
 <Routes><Route path="/" element={<Landing/>}/><Route path="/create" element={<CreatePage/>}/><Route path="/ragas" element={<RagaLibrary/>}/><Route path="/ragas/:id" element={<RagaDetail/>}/><Route path="/auth" element={<AuthPage/>}/><Route path="/jobs/:id" element={<ResultPage/>}/><Route path="/studio" element={<ResultPage/>}/><Route path="/history" element={<HistoryPage/>}/><Route path="/qa" element={<QAPage/>}/><Route path="/settings" element={<SettingsPage/>}/><Route path="/how-it-works" element={<HowItWorks/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="*" element={<div className="page"><h1>Page not found</h1><Link to="/">Return home</Link></div>}/></Routes>
 </main><footer className="site-footer"><span>SHADAJ</span><span>Preserve the grammar. Empower the expression.</span></footer></div></MotionConfig></AuthContext.Provider>
}
