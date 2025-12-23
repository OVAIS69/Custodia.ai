'use client';

import React from 'react';
import { Bell, Search, LogOut, Code, BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function UserProfile() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className={`p-2 rounded-lg ${user.role === 'Software Engineer' ? 'bg-cyber-cyan/10 text-cyber-cyan' : 'bg-cyber-purple/10 text-cyber-purple'}`}>
                {user.role === 'Software Engineer' ? <Code className="h-4 w-4" /> : <BarChart2 className="h-4 w-4" />}
            </div>
            <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-white leading-none">{user.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user.role}</p>
            </div>
            <button
                onClick={logout}
                className="ml-2 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                title="Logout"
            >
                <LogOut className="h-4 w-4" />
            </button>
        </div>
    );
}

export function Header() {
    const router = useRouter();
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<any[]>([]);
    const [showResults, setShowResults] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query.length > 2) {
                setIsSearching(true);
                fetch(`http://localhost:8000/api/v1/search?q=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data);
                        setShowResults(true);
                        setIsSearching(false);
                    })
                    .catch(() => setIsSearching(false));
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (result: any) => {
        router.push(result.link);
        setShowResults(false);
        setQuery('');
    };

    return (
        <header className="h-20 glass-panel border-b-0 sticky top-0 z-30 px-6 flex items-center justify-between m-4 rounded-2xl relative">
            {/* Search Bar */}
            <div className="relative w-96 group z-50">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-cyber-cyan/50 group-focus-within:text-cyber-cyan transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-black/20 text-white placeholder-gray-500 focus:outline-none focus:bg-black/40 focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/50 sm:text-sm transition-all backdrop-blur-sm"
                    placeholder="Search users or resources..."
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    onFocus={() => query.length > 2 && setShowResults(true)}
                />

                {/* Search Results Dropdown */}
                {showResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
                        {results.length > 0 ? (
                            <ul className="py-1">
                                {results.map((result, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => handleSelect(result)}
                                        className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-white">{result.label}</p>
                                                <p className="text-xs text-gray-400 capitalize">{result.subtext}</p>
                                            </div>
                                            <span className="text-xs text-cyber-cyan border border-cyber-cyan/30 px-2 py-0.5 rounded-full bg-cyber-cyan/5">
                                                {result.type}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                {isSearching ? "Searching..." : "No results found"}
                            </div>
                        )}
                    </div>
                )}

                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-xs text-gray-500 border border-white/10 rounded px-1.5 py-0.5">⌘K</span>
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-cyber-cyan transition-all duration-300 group">
                    <Bell className="h-5 w-5 group-hover:animate-pulse" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyber-purple border border-black shadow-[0_0_5px_#7c3aed]"></span>
                </button>

                <div className="h-8 w-px bg-white/10 mx-2"></div>

                {/* User Profile */}
                <UserProfile />
            </div>
        </header>
    );
}

