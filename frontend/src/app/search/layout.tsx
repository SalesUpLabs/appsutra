export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {/* <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(to_bottom_right,_#B3A9FF_40%,_white,_#A9FFEB_40%)]"></div> */}
      {/* <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#B3A9FF] via-white to-[#A9FFEB]"></div> */}
      <div className="fixed inset-0 -z-10 overflow-hidden" style={{background: 'linear-gradient(149.34deg, rgba(179, 169, 255, 0.4) 0%, rgba(255,255,255,0) 40%), linear-gradient(333.38deg, rgba(169, 255, 235, 0.4) 0%, rgba(255,255,255,0) 40%)', backgroundColor: 'white'}}></div>
      <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-20">
        {children}
      </div>
    </div>
  )
}