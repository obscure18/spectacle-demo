import React from 'react'
import ReactDOM from 'react-dom'
import './providers'
import './pages'
import './index.css'
import './firebaseConfig'
import { BarebonesApp } from '@spectacle/view-core'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.locale('en')
dayjs.extend(LocalizedFormat)

ReactDOM.render(
  <React.StrictMode>
    <BarebonesApp />
  </React.StrictMode>,
  document.getElementById('root')!
)
