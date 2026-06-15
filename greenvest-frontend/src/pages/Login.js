import React, { useState } from 'react';
import api from '../api';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const res = await api.post('/admin/login', { email, password });
        
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_user', JSON.stringify(res.data.user));

        window.location.href = '/dashboard';
        
    } catch (err) {
        setError(err.response?.data?.message || 'Email atau password salah.');
    } finally {
        setLoading(false);
    }
};

    const EyeIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>
    );

    const EyeOffIcon = () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
    );

    const LockIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    );

    return (
        <div className="auth-page">
            <div style={styles.container}>

                {/* LEFT PANEL */}
                <div style={styles.leftPanel}>
                    <div style={styles.leftContent}>
                        <div style={styles.logoWrap}>
                            <div style={styles.logoIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D8F3DC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 22c0 0 4-2 8-6s6-10 6-10-6 2-10 6-4 10-4 10z"/>
                                    <path d="M22 2s-4 2-8 6"/>
                                </svg>
                            </div>
                            <span style={styles.logoText}>GREENVEST.CO</span>
                        </div>

                        <div style={styles.tagline}>
                            <span style={styles.taglineWhite}>Edukasi Pintar</span>
                            <br />
                            <span style={styles.taglineGold}>Investasi Hijau.</span>
                        </div>
                        <p style={styles.taglineSub}>
                            Tempat edukasi pintar yang presisi untuk pengelolaan aset lingkungan masa depan. Selamat datang kembali di portal administrasi.
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div style={styles.rightPanel}>
                    <div style={styles.formWrap}>

                        <div style={styles.formHeader}>
                            <h1 style={styles.title}>Login Admin</h1>
                            <p style={styles.subtitle}>
                                Silakan masukkan kredensial Anda untuk mengakses dashboard Greenvest.
                            </p>
                        </div>

                        {error && (
                            <div style={styles.errorBox}>
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} autoComplete="off">

                            {/* Email */}
                            <div style={styles.field}>
                                <label style={styles.label}>EMAIL ADMINISTRATOR</label>
                                <div style={styles.inputWrap}>
                                    <span style={styles.inputIcon}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                            <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="admin@greenvest.co"
                                        style={styles.input}
                                        autoComplete="new-email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div style={styles.field}>
                                <div style={styles.labelRow}>
                                    <label style={styles.label}>KATA SANDI</label>
                                    <a href="#" style={styles.forgotLink}>Lupa Sandi?</a>
                                </div>
                                <div style={styles.inputWrap}>
                                    <span style={styles.inputIcon}><LockIcon /></span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        style={styles.input}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.eyeBtn}
                                    >
                                        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                style={loading ? styles.btnDisabled : styles.btn}
                                disabled={loading}
                            >
                                {loading ? 'Memproses...' : 'MASUK KE SISTEM →'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', width: '100%', maxWidth: 920, minHeight: 540, borderRadius: 24, overflow: 'hidden', background: '#FFFFFF', boxShadow: '0 20px 80px rgba(0,0,0,0.08)' },
    leftPanel: { width: '50%', background: 'linear-gradient(90deg,#184F37 0%,#104433 50%,#184F37 100%)', display: 'flex', alignItems: 'center', padding: '70px' },
    leftContent: { color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' },
    logoWrap: { display: 'flex', alignItems: 'center', gap: 18, marginBottom: 140 },
    logoIcon: { width: 60, height: 60, background: 'rgba(255,255,255,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    logoText: { fontSize: 24, fontWeight: 800, color: '#D8F3DC', letterSpacing: '1px' },
    tagline: { fontSize: 32, fontWeight: 700, lineHeight: 1.15, marginBottom: 24 },
    taglineWhite: { color: '#FFFFFF' },
    taglineGold: { color: '#E9C46A' },
    taglineSub: { fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.85)', maxWidth: 500, margin: 0 },
    rightPanel: { width: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '70px' },
    formWrap: { width: '100%', maxWidth: 520 },
    formHeader: { marginBottom: 40 },
    title: { fontSize: 32, fontWeight: 700, color: '#111827', margin: '0 0 12px 0' },
    subtitle: { fontSize: 20, color: '#6B7280', lineHeight: 1.7, margin: 0 },
    errorBox: { background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 12, padding: '14px 18px', fontSize: 14, marginBottom: 20 },
    field: { marginBottom: 24 },
    label: { display: 'block', fontSize: 13, fontWeight: 700, color: '#6B7280', letterSpacing: '2px', marginBottom: 10, textTransform: 'uppercase' },
    labelRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    forgotLink: { fontSize: 14, fontWeight: 600, color: '#8B6B1B', textDecoration: 'none' },
    inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
    inputIcon: { position: 'absolute', left: 20, display: 'flex', alignItems: 'center', zIndex: 1 },
    input: { width: '100%', height: 48, padding: '0 56px', background: '#FFFFFF', border: '2px solid #E5E7EB', borderRadius: 16, fontSize: 18, color: '#111827', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
    eyeBtn: { position: 'absolute', right: 18, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 },
    btn: { width: '100%', height: 48, background: '#8B6B1B', color: '#FFFFFF', border: 'none', borderRadius: 16, fontSize: 18, fontWeight: 700, cursor: 'pointer', marginTop: 12, letterSpacing: '1px' },
    btnDisabled: { width: '100%', height: 48, background: '#9CA3AF', color: '#FFFFFF', border: 'none', borderRadius: 16, fontSize: 18, fontWeight: 700, cursor: 'not-allowed', marginTop: 12 }
};