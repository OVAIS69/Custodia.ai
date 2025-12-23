'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { UserProfileCard } from '@/components/risk/UserProfileCard';
import { RiskFactorBreakdown } from '@/components/risk/RiskFactorBreakdown';
import { RiskTimeline } from '@/components/risk/RiskTimeline';
import { AIRecommendations } from '@/components/risk/AIRecommendations';
import { Card, CardContent } from '@/components/ui/Card';
import { Filter } from 'lucide-react';

import { useSearchParams } from 'next/navigation';

export default function RiskScoringPage() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('user_id');
    const [selectedUser, setSelectedUser] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Determine URL based on search param
        const url = userId
            ? `http://localhost:8000/api/v1/user/${userId}/risk-score`
            : 'http://localhost:8000/api/v1/risk/top-users?limit=1';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                let user;
                // Handle different response structures
                if (Array.isArray(data)) {
                    user = data.length > 0 ? data[0] : null;
                } else {
                    user = data; // Single user object
                }

                if (user) {
                    // Map backend data to frontend model
                    setSelectedUser({
                        name: user.username || user.user_id,
                        id: user.user_id,
                        role: user.job_title || 'Unknown Role',
                        department: user.department || 'Unknown Dept',
                        location: user.location || 'Unknown Location',
                        email: `${user.username || user.user_id}@company.com`,
                        riskScore: Math.round(user.risk_score),
                        riskLevel: user.risk_level,
                        factors: user.factor_scores,
                        recommendations: user.recommendations,
                        riskTrend: user.risk_trend
                    });
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [userId]);

    // Fallback if no data or loading
    const displayUser = selectedUser || {
        name: 'Loading...',
        role: '...',
        department: '...',
        location: '...',
        email: '...',
        riskScore: 0,
        riskLevel: 'LOW' as const,
        factors: {},
        recommendations: [],
        riskTrend: []
    };

    return (
        <DashboardLayout>
            {/* Filters */}
            <div className="flex justify-end mb-6">
                <div className="flex space-x-2 bg-slate-gray/30 p-1 rounded-lg border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center px-3 text-silver/70 text-sm border-r border-white/10">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filters</span>
                    </div>
                    <select className="bg-transparent text-white text-sm px-3 py-1.5 focus:outline-none cursor-pointer hover:text-cyber-cyan transition-colors">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Sales</option>
                    </select>
                    <select className="bg-transparent text-white text-sm px-3 py-1.5 focus:outline-none cursor-pointer hover:text-cyber-cyan transition-colors">
                        <option>Risk Level: All</option>
                        <option>Critical</option>
                        <option>High</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: User Profile */}
                <div className="lg:col-span-1">
                    <UserProfileCard user={displayUser} />
                </div>

                {/* Right Column: Analytics & Actions */}
                <div className="lg:col-span-2 flex flex-col space-y-6">
                    {/* Top Row: Factors & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[350px]">
                        <RiskFactorBreakdown factors={displayUser.factors} />
                        <RiskTimeline data={displayUser.riskTrend} />
                    </div>

                    {/* Bottom Row: Recommendations */}
                    <div className="flex-1">
                        <AIRecommendations recommendations={displayUser.recommendations} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
