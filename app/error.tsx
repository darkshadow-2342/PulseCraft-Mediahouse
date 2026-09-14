'use client';
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className="error-page" id="main-content"><span className="mono">A brief intermission</span><h1>Let’s take <em>that again.</em></h1><p>This scene couldn’t load. Please try again.</p><button onClick={reset} className="editorial-link">Reload the scene ↗</button></main>}
