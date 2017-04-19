import React from 'react'
import './index.css'

export const History = ({ state }) => {

  const { routes } = state.config
  const hidden = routes.history !== location.hash

  return <section className='History secondary panel' hidden={hidden}>

    <header>
      <h1>Mijn metingen</h1>
    </header>

    <article>

      <p>Hier worden afgeronde metingen (binnenkort) opgeslagen.</p>

    </article>

    <nav>
      <button><a href={routes.home}>Sluit</a></button>
    </nav>

  </section>

}