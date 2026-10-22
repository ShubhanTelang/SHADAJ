import {Link} from 'react-router-dom';
import {ArrowUpRight,Info,Music2} from 'lucide-react';
import type {Raga} from '../services/api';
export function Badge({children,tone='neutral'}:{children:React.ReactNode;tone?:string}){return <span className={'badge '+tone}>{children}</span>}
export function Empty({title,children}:{title:string;children?:React.ReactNode}){return <section className="panel empty"><Music2 size={32}/><h2>{title}</h2><div>{children}</div></section>}
export function PageHead({eyebrow,title,children}:{eyebrow:string;title:string;children?:React.ReactNode}){return <header className="page-head"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children&&<div className="muted">{children}</div>}</header>}
export function RagaCard({raga,index=0,selected,onSelect}:{raga:Raga;index?:number;selected?:boolean;onSelect?:()=>void}){return <article className={'raga-card '+(selected?'selected':'')}>
<div className="card-top"><span className="catalog-number">{String(index+1).padStart(2,'0')}</span><Link to={'/ragas/'+raga.id} aria-label={'About '+raga.name}><Info size={18}/></Link></div>
{onSelect?<button className="raga-name" onClick={onSelect} disabled={!raga.available}>{raga.name}</button>:<Link className="raga-name" to={'/ragas/'+raga.id}>{raga.name}</Link>}
<div className="raga-lines"><p><span>AROHA</span>{raga.aroha||'Not provided'}</p><p><span>AVAROHA</span>{raga.avaroha||'Not provided'}</p></div><footer><span>{raga.time||'Time association not provided'}</span>{raga.available?<ArrowUpRight size={16}/>:<Badge>Unavailable</Badge>}</footer></article>}
