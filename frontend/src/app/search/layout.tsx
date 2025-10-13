export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-20">
        {children}
      </div>
    </div>
  )
}