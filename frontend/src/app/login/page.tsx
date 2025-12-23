'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, BarChart2, ShieldCheck, ArrowRight, Code } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuth();

    return (
        <div className="min-h-screen bg-deep-navy flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyber-purple/20 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-cyan/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            <div className="w-full max-w-4xl z-10">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                            <ShieldCheck className="w-16 h-16 text-cyber-cyan animate-pulse" />
                            <div className="absolute inset-0 bg-cyber-cyan/20 blur-xl rounded-full"></div>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyber-cyan to-cyber-purple mb-4 font-mono tracking-tight">
                        CUSTODIA
                    </h1>
                    <p className="text-silver text-xl max-w-2xl mx-auto leading-relaxed">
                        Select your role to access the identity security dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Software Engineer Card */}
                    <div
                        onClick={() => login('Software Engineer')}
                        className="group relative bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-cyber-cyan/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur-xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20 group-hover:bg-cyber-cyan/20 transition-colors">
                                <Code className="w-10 h-10 text-cyber-cyan" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">Software Engineer</h3>
                                <p className="text-gray-400">Access development resources, API keys, and infrastructure logs.</p>
                            </div>

                            <div className="flex items-center text-sm text-cyber-cyan font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <span>Login as Engineer</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Data Analyst Card */}
                    <div
                        onClick={() => login('Data Analyst')}
                        className="group relative bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-cyber-purple/50 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] backdrop-blur-xl"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyber-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-cyber-purple/10 flex items-center justify-center border border-cyber-purple/20 group-hover:bg-cyber-purple/20 transition-colors">
                                <BarChart2 className="w-10 h-10 text-cyber-purple" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-purple transition-colors">Data Analyst</h3>
                                <p className="text-gray-400">View risk metrics, access logs, and anomaly reports.</p>
                            </div>

                            <div className="flex items-center text-sm text-cyber-purple font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <span>Login as Analyst</span>
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-500 mt-12 text-sm">
                    © 2024 Custodia AI Security. All rights reserved.
                </p>
            </div>
        </div>
    );
}
