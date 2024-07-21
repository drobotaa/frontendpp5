import React from 'react'
import NoResults from "../assets/noresults.png"
import styles from "../styles/NotFound.module.css"
import ResourceA from './ResourceA'

const NotFound = () => {
  return (
    <div className={styles.Notfound}>
        <ResourceA src={NoResults} message={'Sorry, the page does not exist'} />
    </div>
  )
}

export default NotFound