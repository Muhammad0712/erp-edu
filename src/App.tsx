import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div className="color-change-5x scroll-auto">
      <Suspense fallback>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default App