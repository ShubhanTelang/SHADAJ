import {useEffect,useRef,useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
import {Pause,Play,Volume2} from 'lucide-react';
import {usePreferences} from '../stores/preferences';
import {Button} from './ui/button';
const clock=(n:number)=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
export function AudioPlayer({url}:{url:string}){
 const container=useRef<HTMLDivElement>(null);const wave=useRef<WaveSurfer>();const [playing,setPlaying]=useState(false);const [ready,setReady]=useState(false);const [time,setTime]=useState(0);const [duration,setDuration]=useState(0);const [error,setError]=useState('');
 const {volume,setVolume}=usePreferences();
 useEffect(()=>{if(!container.current)return;setReady(false);setError('');const w=WaveSurfer.create({container:container.current,url,waveColor:'#a8b4a2',progressColor:'#405c46',cursorColor:'#b17b42',height:138,barWidth:2,barGap:3,barRadius:2,normalize:false,fetchParams:{credentials:'same-origin'}});wave.current=w;
 w.on('ready',()=>{setReady(true);setDuration(w.getDuration());w.setVolume(usePreferences.getState().volume)});w.on('play',()=>setPlaying(true));w.on('pause',()=>setPlaying(false));w.on('timeupdate',setTime);w.on('error',()=>setError('Could not load the audio artifact.'));
 return()=>{w.destroy();wave.current=undefined}},[url]);
 useEffect(()=>{wave.current?.setVolume(volume)},[volume]);
 return <div className="audio-player"><div ref={container} aria-label="Audio waveform"/>{error&&<p role="alert" className="error">{error}</p>}<input className="seek" type="range" aria-label="Seek audio" min={0} max={duration||1} step={.1} value={time} disabled={!ready} onChange={e=>wave.current?.setTime(+e.target.value)}/><div className="player-controls"><Button aria-label={playing?'Pause':'Play'} disabled={!ready} onClick={()=>wave.current?.playPause()}>{playing?<Pause size={20}/>:<Play size={20}/>}</Button><span className="tabular">{clock(time)} <span className="muted">/ {clock(duration)}</span></span><label className="volume"><Volume2 size={18}/><input aria-label="Volume" type="range" min={0} max={1} step={.01} value={volume} onChange={e=>setVolume(+e.target.value)}/></label></div></div>
}
