import React from 'react'
import './Premium.css'

export default function Premium(){
  const plans = [
    {id:'monthly', title:'Monthly', price:'$9.99', features:['Unlimited likes','Boost once a week','See who liked you']},
    {id:'yearly', title:'Yearly', price:'$59.99', features:['Everything in monthly','5 boosts','Priority ranking']},
  ]
  return (
    <div className="page container">
      <h2>Lovely Premium</h2>
      <div className="row" style={{gap:20, marginTop:12}}>
        {plans.map(p=>(
          <div key={p.id} className="card pricing">
            <h3>{p.title}</h3>
            <div className="price">{p.price}</div>
            <ul>
              {p.features.map(f=><li key={f}>{f}</li>)}
            </ul>
            <button className="btn primary">Choose</button>
          </div>
        ))}
      </div>
    </div>
  )
}
