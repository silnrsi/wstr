import { lazy, Suspense } from "react";

const ApiBrowser = lazy(() => import('./Browser'));

export default function App() {
  return (
    <Suspense fallback={<PlaceHolder />}>
      <ApiBrowser />
    </Suspense>
  )
}

function PlaceHolder() {
  return (
    <div className='lff-container' style={{ 
      width: 300, height: '3.75rem', marginTop: 24, 
      backgroundColor: 'var(--sl-color-bg-nav)', 
      borderRadius: '2pt 2pt 0 0' 
    }}/>
  )
}