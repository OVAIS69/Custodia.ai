'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Upload, FileText, AlertTriangle, CheckCircle, Activity, Brain } from 'lucide-react';

export default function AnalyzePage() {
    const [file, setFile] = React.useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);
    const [result, setResult] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:8000/api/v1/analyze/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || 'Analysis failed');
            }

            const data = await res.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyber-cyan mb-2">
                    Custom Data Analysis
                </h1>
                <p className="text-gray-400">
                    Upload your CSV logs to run the UEBA engine and get AI-powered security insights.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-cyber-cyan/30 bg-cyber-cyan/5">
                        <CardContent className="p-6">
                            <CardTitle className="mb-4 flex items-center">
                                <Upload className="w-5 h-5 mr-2 text-cyber-cyan" />
                                Upload Dataset
                            </CardTitle>

                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-cyber-cyan/50 transition-colors bg-black/20">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="csv-upload"
                                />
                                <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
                                    <FileText className="w-12 h-12 text-gray-400 mb-4" />
                                    <span className="text-white font-medium mb-1">
                                        {file ? file.name : "Click to select CSV"}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Must contain: user_id, resource, action, timestamp
                                    </span>
                                </label>
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={!file || isAnalyzing}
                                className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center transition-all ${!file || isAnalyzing
                                        ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                        : 'bg-cyber-cyan text-black hover:bg-cyber-cyan/90 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                    }`}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                                        Running UEBA Engine...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="w-4 h-4 mr-2" />
                                        Analyze Data
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex items-start">
                                    <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {result && (
                        <Card>
                            <CardContent className="p-6">
                                <CardTitle className="mb-4">Key Metrics</CardTitle>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Total Events</span>
                                        <span className="font-mono text-white">{result.total_events}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Anomalies</span>
                                        <span className="font-mono text-red-400 font-bold">{result.anomalies_found}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                        <span className="text-gray-400">Processing Time</span>
                                        <span className="font-mono text-cyber-cyan">{result.processing_time}s</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {result ? (
                        <>
                            {/* LLM Insight */}
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/10 border border-cyber-cyan/30 p-8">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <Brain className="w-24 h-24 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                    <Brain className="w-6 h-6 mr-3 text-cyber-cyan" />
                                    AI Security Insight
                                </h2>
                                <p className="text-lg text-silver leading-relaxed font-light">
                                    {result.summary_insight}
                                </p>
                            </div>

                            {/* Anomaly Table */}
                            <Card>
                                <CardContent className="p-6">
                                    <CardTitle className="mb-6 flex items-center justify-between">
                                        <span>Detected Anomalies</span>
                                        <span className="text-sm font-normal text-gray-500">Top {result.critical_anomalies.length} Critical Events</span>
                                    </CardTitle>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/10 text-gray-400 text-sm">
                                                    <th className="py-3 px-4">Timestamp</th>
                                                    <th className="py-3 px-4">User</th>
                                                    <th className="py-3 px-4">Action</th>
                                                    <th className="py-3 px-4">Resource</th>
                                                    <th className="py-3 px-4 text-right">Anomaly Score</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {result.critical_anomalies.map((event: any, idx: number) => (
                                                    <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                        <td className="py-3 px-4 font-mono text-gray-400">{event.timestamp}</td>
                                                        <td className="py-3 px-4 text-white font-medium">{event.user_id}</td>
                                                        <td className="py-3 px-4 text-cyber-cyan">{event.action}</td>
                                                        <td className="py-3 px-4 text-gray-300">{event.resource}</td>
                                                        <td className="py-3 px-4 text-right">
                                                            <span className="inline-block px-2 py-1 rounded bg-red-500/20 text-red-400 font-bold text-xs">
                                                                {((event.anomaly_score) * 100).toFixed(0)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
                            <Activity className="w-16 h-16 text-gray-600 mb-4" />
                            <p className="text-gray-500 text-lg">Detailed analysis results will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
