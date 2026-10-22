import React from 'react';
import {describe,it,expect,vi,afterEach} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {RagaCard} from './common';
import {AudioPlayer} from './AudioPlayer';
import {Button} from './ui/button';
import type {Raga} from '../services/api';
const waves=vi.hoisted(()=>({create:vi.fn(()=>({on:vi.fn(),destroy:vi.fn(),setVolume:vi.fn()}))}));
vi.mock('wavesurfer.js',()=>({default:waves}));
afterEach(cleanup);
const r:Raga={id:'yaman',name:'Yaman',available:false,reason:'No executable rule engine supplied.',version:null,profile:{},aroha:null,avaroha:null,time:null,metadata_source:null,validation:'unavailable'};
describe('Studio states',()=>{
 it('prevents selecting an unavailable engine without inventing musical metadata',()=>{
  const select=vi.fn();render(<MemoryRouter><RagaCard raga={r} onSelect={select}/></MemoryRouter>);
  fireEvent.click(screen.getByRole('button',{name:'Yaman'}));expect(select).not.toHaveBeenCalled();expect(screen.getAllByText('Not provided')).toHaveLength(2);
 });
 it('selects an available raga and exposes its detail link',()=>{
  const select=vi.fn();render(<MemoryRouter><RagaCard raga={{...r,available:true}} onSelect={select}/></MemoryRouter>);
  fireEvent.click(screen.getByRole('button',{name:'Yaman'}));expect(select).toHaveBeenCalledOnce();expect(screen.getByRole('link',{name:'About Yaman'}).getAttribute('href')).toBe('/ragas/yaman');
 });
 it('does not auto-play or enable seeking before the waveform is ready',()=>{
  render(<AudioPlayer url="/api/jobs/test/artifacts/wav"/>);expect((screen.getByRole('button',{name:'Play'}) as HTMLButtonElement).disabled).toBe(true);expect((screen.getByRole('slider',{name:'Seek audio'}) as HTMLInputElement).disabled).toBe(true);
 });
 it('preserves native disabled semantics',()=>{const click=vi.fn();render(<Button disabled onClick={click}>Generate</Button>);fireEvent.click(screen.getByRole('button'));expect(click).not.toHaveBeenCalled()});
});
