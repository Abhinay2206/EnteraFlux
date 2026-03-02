import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, auth, onAuthStateChanged } from '../firebase';
import { Shield, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Admin Login — EnteraFlux';
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) navigate('/admin/dashboard', { replace: true });
            else setChecking(false);
        });
        return unsub;
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await adminLogin(email, password);
            navigate('/admin/dashboard', { replace: true });
        } catch {
            setError('Invalid credentials. Access restricted to administrators.');
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 mb-4">
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Admin Access</h1>
                    <p className="text-sm text-gray-500 mt-1">EnteraFlux Survey Analytics</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-colors"
                            placeholder="admin@enteraflux.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-6">
                    © {new Date().getFullYear()} EnteraFlux — Restricted Access
                </p>
            </div>
        </div>
    );
}
