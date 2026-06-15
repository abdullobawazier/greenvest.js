import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('admin_user') || '{}');

    useEffect(() => {
    api.get('/admin/dashboard')
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Gagal mengambil data dari server:", err);
            setLoading(false);
        });
}, []);

    const handleLogout = async () => {
        try {
            await api.post('/admin/logout');
        } catch (err) {
            console.error("Gagal log out di server:", err);
        } finally {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            window.location.href = '/';
        }
    };

    if (loading || !data) {
        return (
            <div style={styles.loadingWrap}>
                <div style={styles.loadingText}>Memuat dashboard...</div>
            </div>
        );
    }

    return (
        <div style={styles.layout}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.sidebarLogo}>
                    <div style={styles.logoIcon}>🌿</div>
                    <div>
                        <div style={styles.logoText}>GREENVEST.CO</div>
                        <div style={styles.logoSub}>Ecological Ledger</div>
                    </div>
                </div>

                <nav style={styles.nav}>
                    <a href="/dashboard" style={styles.navItemActive}>
                        <span>▦</span> Dashboard
                    </a>
                    <a href="#" style={styles.navItem}>
                        <span>📄</span> Articles
                    </a>
                    <a href="#" style={styles.navItem}>
                        <span>💬</span> Comments
                    </a>
                    <a href="#" style={styles.navItem}>
                        <span>👤</span> Profile
                    </a>
                </nav>

                <div style={styles.sidebarFooter}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        ⎋ Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={styles.main}>
                {/* Topbar */}
                <header style={styles.topbar}>
                    <div style={styles.topbarTitle}>Dashboard</div>
                    <div style={styles.topbarAdmin}>
                        <span style={styles.adminName}>{user.name}</span>
                        <div style={styles.adminAvatar}>
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main style={styles.content}>
                    <div style={styles.sectionLabel}>RINGKASAN</div>
                    <h1 style={styles.pageTitle}>Dashboard</h1>

                    {/* Stats Cards */}
                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>📄</div>
                            <div style={styles.statNum}>{data?.total_articles ?? 0}</div>
                            <div style={styles.statLabel}>Total Artikel</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>💬</div>
                            <div style={styles.statNum}>{data?.total_comments ?? 0}</div>
                            <div style={styles.statLabel}>Total Komentar</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

const styles = {
    loadingWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0A3A20',
    },
    loadingText: {
        color: '#fff',
        fontSize: '18px',
        fontFamily: 'sans-serif'
    },
    layout: { display: 'flex', height: '100vh' },
    sidebar: { width: '260px', backgroundColor: '#0A3A20', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column' },
    sidebarLogo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' },
    logoIcon: { fontSize: '24px' },
    logoText: { fontWeight: 'bold', fontSize: '16px' },
    logoSub: { fontSize: '11px', color: '#A3E635' },
    nav: { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 },
    navItemActive: { display: 'flex', alignItems: 'center', gap: '10px', color: '#A3E635', textDecoration: 'none', padding: '10px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.05)' },
    navItem: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', textDecoration: 'none', padding: '10px' },
    sidebarFooter: { marginTop: 'auto' },
    logoutBtn: { width: '100%', padding: '10px', backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '6px', cursor: 'pointer' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' },
    topbar: { height: '60px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', borderBottom: '1px solid #e2e8f0' },
    topbarTitle: { fontWeight: '600', color: '#1e293b' },
    topbarAdmin: { display: 'flex', alignItems: 'center', gap: '10px' },
    adminName: { fontSize: '14px', color: '#475569' },
    adminAvatar: { width: '32px', height: '32px', backgroundColor: '#A3E635', color: '#0A3A20', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px' },
    content: { padding: '30px', flex: 1, overflowY: 'auto' },
    sectionLabel: { fontSize: '12px', fontWeight: 'bold', color: '#A3E635', letterSpacing: '1px' },
    pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#0A3A20', marginTop: '5px', marginBottom: '25px' },
    statsRow: { display: 'flex', gap: '20px' },
    statCard: { flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
    statIcon: { fontSize: '24px', marginBottom: '10px' },
    statNum: { fontSize: '28px', fontWeight: 'bold', color: '#0A3A20' },
    statLabel: { fontSize: '14px', color: '#64748b', marginTop: '5px' }
};