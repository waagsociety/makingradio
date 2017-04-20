import React from 'react'
import './index.css'

export function HistoryList({ data }) {

  return <ul className='HistoryList'>
  {
    data.map(item => <li key={item.initialized} className='item'>
      <h1>{new Date(item.initialized).toLocaleString()}</h1>
      <ul>
        <li>Gemiddelde: {item.summary.mean.toFixed(2)}%</li>
        <li>Piek: {item.summary.max.toFixed(2)}%</li>
        <li>Nulmeting: {item.baseline.toFixed(2)}%</li>
      </ul>
    </li>)
  }
  </ul>

}