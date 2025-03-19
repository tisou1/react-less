import Header from './header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content pt-16">
        {children}
      </div>
    </div>
  )
}
