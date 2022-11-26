import ErrorBoundary from '../components/ErrorBoundary'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
  <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>)
  
}

export default MyApp

// import ErrorBoundary from '../components/ErrorBoundary'
// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return (

//     <Component {...pageProps} />
//  )
  
// }

// export default MyApp

