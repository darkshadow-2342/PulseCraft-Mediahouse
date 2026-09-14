export function SectionLabel({number,children}:{number:string;children:React.ReactNode}) {
  return <div className="section-label"><span className="scene-number">{number}</span><span>{children}</span></div>;
}
