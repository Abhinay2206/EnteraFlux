import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    fetchFaersData,
    fetchGlp1Trials,
    addRecordsBatch,
    adminLogout,
    auth,
    onAuthStateChanged,
} from '../firebase';
import {
    Loader2, LogOut, RefreshCw, BarChart3, AlertCircle, Search,
    Menu, X, Activity, Database, Beaker,
    Filter, RotateCcw, Download, Eye, ArrowUpDown, Upload, CheckCircle, XCircle,
} from 'lucide-react';
import type { FaersRecord, GLP1Trial } from '../utils/drugAnalyticsUtils';
import DrugRiskAnalytics from '../components/admin/DrugRiskAnalytics';

/* ═══════════════════════════════════════════
   Tab Types
   ═══════════════════════════════════════════ */

type Tab = 'analytics' | 'faers' | 'trials';

const TABS: { key: Tab; label: string; icon: React.ElementType; shortLabel: string }[] = [
    { key: 'faers', label: 'FAERS Dataset', shortLabel: 'FAERS', icon: Database },
    { key: 'trials', label: 'Trials Dataset', shortLabel: 'Trials', icon: Beaker },
    { key: 'analytics', label: 'Drug Analytics', shortLabel: 'Analytics', icon: Activity },
];

/* ═══════════════════════════════════════════
   Expandable Table Cell
   ═══════════════════════════════════════════ */

function ExpandableCell({ value }: { value: string }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = value.length > 50;
    const display = !isLong || expanded ? value : value.slice(0, 47) + '…';

    return (
        <td
            onClick={isLong ? () => setExpanded((e) => !e) : undefined}
            className={`px-3 py-2 text-gray-700 max-w-[220px] ${
                expanded ? 'whitespace-normal break-words bg-blue-50/40' : 'whitespace-nowrap overflow-hidden text-ellipsis'
            } ${isLong ? 'cursor-pointer hover:bg-blue-50/30' : ''}`}
            title={isLong && !expanded ? value : undefined}
        >
            {display}
            {isLong && !expanded && <span className="text-blue-400 ml-0.5 text-[9px]">▸</span>}
        </td>
    );
}

/* ═══════════════════════════════════════════
   Dataset Tab Content (Table View)
   ═══════════════════════════════════════════ */

interface DatasetViewProps {
    data: Record<string, unknown>[];
    title: string;
    color: string;
    collectionName: string;
    onUploadComplete: () => void;
}

function DatasetView({ data, title, color, collectionName, onUploadComplete }: DatasetViewProps) {
    const [search, setSearch] = useState('');
    const [filterField, setFilterField] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
    const [showFilters, setShowFilters] = useState(false);
    const [page, setPage] = useState(1);
    const PER_PAGE = 50;

    // CSV upload state
    const [showUpload, setShowUpload] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadMsg, setUploadMsg] = useState('');
    const [uploadStats, setUploadStats] = useState<{ total: number; duplicates: number; newRows: number } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Get columns (exclude id, uploaded_at)
    const columns = useMemo(() => {
        if (data.length === 0) return [];
        return Object.keys(data[0]).filter((k) => k !== 'id' && k !== 'uploaded_at');
    }, [data]);

    // Get unique values for currently selected filter field
    const filterOptions = useMemo(() => {
        if (!filterField || data.length === 0) return [];
        const set = new Set<string>();
        for (const r of data) {
            const v = r[filterField];
            if (v !== null && v !== undefined && v !== '') {
                const s = String(v).trim();
                if (s && s.length < 80) set.add(s);
            }
        }
        return Array.from(set).sort().slice(0, 50);
    }, [data, filterField]);

    // Filter + search
    const filtered = useMemo(() => {
        let list = data;

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((r) =>
                Object.values(r).some((v) => String(v ?? '').toLowerCase().includes(q))
            );
        }

        if (filterField && filterValue) {
            list = list.filter((r) => String(r[filterField] ?? '') === filterValue);
        }

        if (sortField) {
            list = [...list].sort((a, b) => {
                const av = String(a[sortField] ?? '');
                const bv = String(b[sortField] ?? '');
                const numA = parseFloat(av);
                const numB = parseFloat(bv);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return sortDir === 'asc' ? numA - numB : numB - numA;
                }
                return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            });
        }

        return list;
    }, [data, search, filterField, filterValue, sortField, sortDir]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    useEffect(() => { setPage(1); }, [search, filterField, filterValue, sortField, sortDir]);

    const activeFilterCount = (filterValue ? 1 : 0) + (search ? 1 : 0);

    const handleExportCSV = () => {
        if (filtered.length === 0) return;
        const header = columns.join(',');
        const rows = filtered.map((r) =>
            columns.map((k) => {
                const v = r[k];
                const str = String(v ?? '');
                return `"${str.replace(/"/g, '""')}"`;
            }).join(',')
        );
        const csv = [header, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleHeaderSort = (col: string) => {
        if (sortField === col) {
            setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(col);
            setSortDir('asc');
        }
    };

    const formatCell = (val: unknown): string => {
        if (val === null || val === undefined || val === '') return '—';
        if (typeof val === 'number') return val.toLocaleString();
        const s = String(val).trim();
        return s || '—';
    };

    /* ── CSV Upload Handler ── */
    const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadStatus('validating');
        setUploadMsg('Parsing CSV...');
        setUploadStats(null);

        try {
            const text = await file.text();
            const lines = text.split('\n').filter((l) => l.trim());
            if (lines.length < 2) {
                setUploadStatus('error');
                setUploadMsg('CSV file is empty or has no data rows.');
                return;
            }

            // Parse header
            const csvHeaders = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

            // Validate columns match
            const missingCols = columns.filter((c) => !csvHeaders.includes(c));
            const extraCols = csvHeaders.filter((c) => !columns.includes(c));

            if (missingCols.length > 0) {
                setUploadStatus('error');
                setUploadMsg(`Column mismatch — missing: ${missingCols.join(', ')}`);
                return;
            }
            if (extraCols.length > 0) {
                setUploadStatus('error');
                setUploadMsg(`Column mismatch — unexpected columns: ${extraCols.join(', ')}`);
                return;
            }

            setUploadMsg('Checking for duplicates...');

            // Parse rows
            const parsedRows: Record<string, unknown>[] = [];
            for (let i = 1; i < lines.length; i++) {
                const vals = lines[i].match(/("[^"]*"|[^,]*)/g)?.map((v) => v.trim().replace(/^"|"$/g, '')) || [];
                if (vals.length === 0 || (vals.length === 1 && vals[0] === '')) continue;
                const row: Record<string, unknown> = {};
                csvHeaders.forEach((h, j) => {
                    const v = vals[j] ?? '';
                    const num = Number(v);
                    row[h] = v !== '' && !isNaN(num) && v === String(num) ? num : v;
                });
                parsedRows.push(row);
            }

            // Dedup: build fingerprints of existing data, then filter
            const fingerprint = (r: Record<string, unknown>) =>
                columns.map((c) => String(r[c] ?? '')).join('||');

            const existingSet = new Set(data.map(fingerprint));
            const seenNew = new Set<string>();
            const uniqueNewRows: Record<string, unknown>[] = [];

            for (const row of parsedRows) {
                const fp = fingerprint(row);
                if (!existingSet.has(fp) && !seenNew.has(fp)) {
                    seenNew.add(fp);
                    uniqueNewRows.push(row);
                }
            }

            const dupCount = parsedRows.length - uniqueNewRows.length;
            setUploadStats({ total: parsedRows.length, duplicates: dupCount, newRows: uniqueNewRows.length });

            if (uniqueNewRows.length === 0) {
                setUploadStatus('success');
                setUploadMsg(`All ${parsedRows.length} rows are duplicates — nothing to upload.`);
                return;
            }

            setUploadStatus('uploading');
            setUploadMsg(`Uploading ${uniqueNewRows.length} new rows...`);

            await addRecordsBatch(collectionName, uniqueNewRows);

            setUploadStatus('success');
            setUploadMsg(`Successfully added ${uniqueNewRows.length} rows (${dupCount} duplicates skipped).`);
            onUploadComplete();
        } catch (err) {
            console.error(err);
            setUploadStatus('error');
            setUploadMsg(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            // Reset file input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div>
            {/* Dataset header info */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                        {data.length} records · {columns.length} fields
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { setShowUpload(!showUpload); setUploadStatus('idle'); setUploadMsg(''); setUploadStats(null); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            showUpload ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <Upload className="w-3.5 h-3.5" />
                        Import CSV
                    </button>
                    <button
                        onClick={handleExportCSV}
                        disabled={filtered.length === 0}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export
                    </button>
                </div>
            </div>

            {/* CSV Upload Panel */}
            {showUpload && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Import CSV</h4>
                        <button onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleCSVUpload}
                            disabled={uploadStatus === 'validating' || uploadStatus === 'uploading'}
                            className="block text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-gray-900 file:text-white file:cursor-pointer hover:file:bg-gray-800 disabled:opacity-40"
                        />
                        {(uploadStatus === 'validating' || uploadStatus === 'uploading') && (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                        )}
                    </div>
                    {uploadMsg && (
                        <div className={`mt-3 flex items-start gap-2 p-3 rounded-lg text-xs ${
                            uploadStatus === 'error' ? 'bg-red-50 text-red-700' :
                            uploadStatus === 'success' ? 'bg-emerald-50 text-emerald-700' :
                            'bg-blue-50 text-blue-700'
                        }`}>
                            {uploadStatus === 'error' && <XCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                            {uploadStatus === 'success' && <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                            {(uploadStatus === 'validating' || uploadStatus === 'uploading') && <Loader2 className="w-4 h-4 animate-spin shrink-0 mt-0.5" />}
                            <div>
                                <p>{uploadMsg}</p>
                                {uploadStats && (
                                    <p className="mt-1 text-[10px] opacity-70">
                                        Parsed: {uploadStats.total} · Duplicates: {uploadStats.duplicates} · New: {uploadStats.newRows}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    <p className="mt-2 text-[10px] text-gray-400">
                        CSV must have the exact same columns as this dataset. Duplicate rows will be automatically skipped.
                    </p>
                </div>
            )}

            {/* Search + Filter Toggle */}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search all fields..."
                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none transition-colors"
                    />
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-lg border text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                        showFilters || activeFilterCount > 0
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <Filter className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Filters</span>
                    {activeFilterCount > 0 && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            showFilters || activeFilterCount > 0 ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
                        }`}>{activeFilterCount}</span>
                    )}
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Filter & Sort</h4>
                        {(filterValue || sortField) && (
                            <button
                                onClick={() => { setFilterField(''); setFilterValue(''); setSortField(''); }}
                                className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                            >
                                <RotateCcw className="w-3 h-3" /> Clear all
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Filter Field</label>
                            <select
                                value={filterField}
                                onChange={(e) => { setFilterField(e.target.value); setFilterValue(''); }}
                                className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer"
                            >
                                <option value="">Select field...</option>
                                {columns.map((c) => (
                                    <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Filter Value</label>
                            <select
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                disabled={!filterField}
                                className="w-full px-2.5 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-700 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 focus:outline-none cursor-pointer disabled:opacity-40"
                            >
                                <option value="">All values</option>
                                {filterOptions.map((v) => (
                                    <option key={v} value={v}>{v.length > 50 ? v.slice(0, 50) + '…' : v}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Results count + Pagination */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-xs text-gray-400">
                    {filtered.length === data.length
                        ? `${data.length} records`
                        : `${filtered.length} of ${data.length} records`}
                    {totalPages > 1 && ` · Page ${page}/${totalPages}`}
                </span>
                {totalPages > 1 && (
                    <div className="flex items-center gap-1">
                        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-2 py-1 rounded text-[10px] font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer">← Prev</button>
                        <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-2 py-1 rounded text-[10px] font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer">Next →</button>
                    </div>
                )}
            </div>

            {/* ── Data Table ── */}
            {paginated.length === 0 ? (
                <div className="text-center py-12">
                    <Eye className="w-8 h-8 text-gray-200 mx-auto mb-3" />
                    <p className="text-xs text-gray-400">
                        {search || filterValue ? 'No records match your filters.' : 'No records available.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="sticky left-0 z-10 bg-gray-50 px-3 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider w-12 border-r border-gray-200">
                                        #
                                    </th>
                                    {columns.map((col) => (
                                        <th
                                            key={col}
                                            onClick={() => handleHeaderSort(col)}
                                            className="px-3 py-2.5 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap cursor-pointer hover:text-gray-800 hover:bg-gray-100 transition-colors select-none"
                                        >
                                            <div className="flex items-center gap-1">
                                                {col.replace(/_/g, ' ')}
                                                {sortField === col && (
                                                    <span className="text-emerald-600">{sortDir === 'asc' ? '↑' : '↓'}</span>
                                                )}
                                                {sortField !== col && (
                                                    <ArrowUpDown className="w-2.5 h-2.5 text-gray-300" />
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((record, i) => (
                                    <tr
                                        key={(record as { id?: string }).id || `row-${i}`}
                                        className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors"
                                    >
                                        <td className="sticky left-0 z-10 bg-white px-3 py-2 text-[10px] font-medium text-gray-400 border-r border-gray-100">
                                            {(page - 1) * PER_PAGE + i + 1}
                                        </td>
                                        {columns.map((col) => {
                                            const raw = formatCell(record[col]);
                                            return (
                                                <ExpandableCell key={col} value={raw} />
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Bottom pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-4">
                    <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer">← Previous</button>
                    <span className="text-xs text-gray-400 mx-2">Page {page} of {totalPages}</span>
                    <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 cursor-pointer">Next →</button>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════ */

export default function AdminDrugAnalytics() {
    const [faersData, setFaersData] = useState<FaersRecord[]>([]);
    const [trialsData, setTrialsData] = useState<GLP1Trial[]>([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('faers');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Auth guard
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) navigate('/admin', { replace: true });
            else setAuthChecking(false);
        });
        return unsub;
    }, [navigate]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [faers, trials] = await Promise.all([
                fetchFaersData(),
                fetchGlp1Trials(),
            ]);
            setFaersData(faers as FaersRecord[]);
            setTrialsData(trials as GLP1Trial[]);
        } catch (err) {
            console.error(err);
            setError('Failed to load drug analytics data. Check Firestore rules and connection.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!authChecking) loadData();
    }, [authChecking, loadData]);

    const handleLogout = async () => {
        await adminLogout();
        navigate('/admin', { replace: true });
    };

    if (authChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ── Header ── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600">
                                <Activity className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h1 className="text-sm sm:text-base font-bold text-gray-900">Datasets & Drug Analytics</h1>
                                <p className="text-[10px] sm:text-[11px] text-gray-400">EnteraFlux Pharmacovigilance Engine</p>
                            </div>
                        </div>

                        {/* Desktop actions */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={loadData}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <BarChart3 className="w-3.5 h-3.5" />
                                Dashboard
                            </Link>
                            <Link
                                to="/admin/feedback"
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Feedback
                            </Link>
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Sign Out
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="sm:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="sm:hidden mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 pb-1">
                            <button
                                onClick={() => { loadData(); setMobileMenuOpen(false); }}
                                disabled={loading}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 cursor-pointer"
                            >
                                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
                            </button>
                            <Link
                                to="/admin/dashboard"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-100"
                            >
                                <BarChart3 className="w-3 h-3" /> Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium text-gray-500 hover:bg-gray-100 cursor-pointer"
                            >
                                <LogOut className="w-3 h-3" /> Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Tab Bar ── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide -mb-px">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${isActive
                                        ? 'border-emerald-600 text-emerald-700'
                                        : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span className="sm:hidden">{tab.shortLabel}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    {tab.key === 'faers' && faersData.length > 0 && (
                                        <span className={`ml-0.5 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
                                            isActive ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>{faersData.length}</span>
                                    )}
                                    {tab.key === 'trials' && trialsData.length > 0 && (
                                        <span className={`ml-0.5 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${
                                            isActive ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>{trialsData.length}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* ── Body ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                {/* Error */}
                {error && (
                    <div className="mb-4 sm:mb-6 flex items-center gap-2 p-3 sm:p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <p className="text-xs sm:text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center py-24 sm:py-32">
                        <div className="text-center">
                            <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-gray-300 mx-auto mb-3" />
                            <p className="text-xs sm:text-sm text-gray-400">Loading drug analytics data...</p>
                        </div>
                    </div>
                )}

                {!loading && (
                    <>
                        {/* Analytics Tab */}
                        {activeTab === 'analytics' && (
                            <DrugRiskAnalytics faersData={faersData} trialsData={trialsData} />
                        )}

                        {/* FAERS Dataset Tab */}
                        {activeTab === 'faers' && (
                            <DatasetView
                                data={faersData as unknown as Record<string, unknown>[]}
                                title="FAERS Semaglutide Adverse Events"
                                color="bg-blue-500"
                                collectionName="faers_semaglutide"
                                onUploadComplete={loadData}
                            />
                        )}

                        {/* Trials Dataset Tab */}
                        {activeTab === 'trials' && (
                            <DatasetView
                                data={trialsData as unknown as Record<string, unknown>[]}
                                title="GLP-1 Clinical Trials"
                                color="bg-emerald-500"
                                collectionName="glp1_trials"
                                onUploadComplete={loadData}
                            />
                        )}
                    </>
                )}

                {/* Footer */}
                <div className="text-center mt-8 sm:mt-12 pb-4 sm:pb-6">
                    <p className="text-[10px] sm:text-[11px] text-gray-400">
                        © {new Date().getFullYear()} EnteraFlux — Drug Risk Analytics · Powered by FAERS + ClinicalTrials.gov
                    </p>
                </div>
            </div>
        </div>
    );
}
