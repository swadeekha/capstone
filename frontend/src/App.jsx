import React, {useState} from 'react'
import axios from 'axios'

const API = (path) => `${window.location.protocol}//${window.location.hostname}:8080${path}`

export default function App(){
  const [story, setStory] = useState('You wake up in a strange place. ')
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState([])

  async function extendStory(){
    setLoading(true)
    try{
      const res = await axios.post(API('/generate'), {prompt: story, max_new_tokens: 80})
      const cont = res.data.continuation
      setStory(story + cont)
    }catch(e){
      alert('Error: ' + e)
    }finally{setLoading(false)}
  }

  async function getChoices(){
    setLoading(true)
    try{
      const res = await axios.post(API('/choices'), {context: story})
      setChoices(res.data.choices)
    }catch(e){
      alert('Error: ' + e)
    }finally{setLoading(false)}
  }

  function pickChoice(c){
    setStory(prev => prev + '\n\n> ' + c + '\n')
    setChoices([])
  }

  return (
    <div style={{maxWidth:800, margin:'2rem auto', fontFamily:'system-ui, sans-serif'}}>
      <h1>Choose-Your-Own-Adventure — AI</h1>
      <div style={{whiteSpace:'pre-wrap', padding:16, border:'1px solid #ddd', borderRadius:8}}>{story}</div>
      <div style={{marginTop:12}}>
        <button onClick={extendStory} disabled={loading}>Continue Story</button>
        <button onClick={getChoices} disabled={loading} style={{marginLeft:8}}>Suggest Choices</button>
        <button onClick={()=>{setStory('You wake up in a strange place. '); setChoices([])}} style={{marginLeft:8}}>New Story</button>
      </div>
      <div style={{marginTop:12}}>
        {choices.map((c,i)=> (
          <button key={i} onClick={()=>pickChoice(c)} style={{display:'block', margin:'6px 0'}}>{c}</button>
        ))}
      </div>
    </div>
  )
}
