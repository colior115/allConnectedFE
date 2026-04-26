import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppMainView, createAppHost } from 'repluggable'
import { mainViewPackage } from './packages/main-view-package'
import { ScreensPackage } from './packages/screens-package'
import { AuthPackage } from './packages/auth-package'
import { I18nPackage } from './packages/i18n-package'
import { BusinessPackage } from './packages/business-package'
import { UserPackage } from './packages/user-package'
import { EmployeePackage } from './packages/employee-package'

const host = createAppHost([
  ...mainViewPackage,
  ...I18nPackage,
  ...ScreensPackage,
  ...AuthPackage,
  ...UserPackage,
  ...BusinessPackage,
  ...EmployeePackage,
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
    ],
  })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppMainView host={host} />
  </StrictMode>,
)
