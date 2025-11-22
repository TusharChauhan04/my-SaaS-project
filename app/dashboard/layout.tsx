export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header style={{ padding: '20px', background: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
        <h1>BusinessZen Dashboard</h1>
        <nav style={{ marginTop: '10px' }}>
          <a href="/dashboard" style={{ marginRight: '20px' }}>Dashboard</a>
          <a href="/dashboard/seo" style={{ marginRight: '20px' }}>SEO Tracker</a>
          <a href="/dashboard/finance" style={{ marginRight: '20px' }}>Finance</a>
          <a href="/dashboard/content" style={{ marginRight: '20px' }}>Content</a>
          <a href="/dashboard/settings" style={{ marginRight: '20px' }}>Settings</a>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>{children}</main>
    </div>
  )
}
