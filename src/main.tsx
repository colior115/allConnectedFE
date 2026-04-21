import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppMainView, createAppHost } from 'repluggable'
import { mainViewPackage } from './packages/main-view-package/mainViewPackage'

const host = createAppHost([
  mainViewPackage
],
{
    monitoring: {},
    layers: [
      {
        level: 0,
        name: 'INFRA',
      },
      {
        level: 60,
        name: 'DATA_SERVICE',
      },
      {
        level: 70,
        name: 'DERIVATIVE_STATE',
      },
      {
        level: 80,
        name: 'FLOWS',
      },
      {
        level: 90,
        name: 'UI',
      },
      {
        level: 100,
        name: 'APP',
      },
    ],
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppMainView host={host} />
  </StrictMode>,
)
