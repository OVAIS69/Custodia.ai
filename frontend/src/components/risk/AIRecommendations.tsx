'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Lock, UserMinus, Clock } from 'lucide-react';

interface AIRecommendationsProps {
    recommendations?: string[];
}

export function AIRecommendations({ recommendations = [] }: AIRecommendationsProps) {
    const formattedRecs = recommendations.map((rec, index) => ({
        id: index,
        action: rec,
        reason: 'Detected by AI Risk Engine',
        priority: rec.includes('CRITICAL') ? 'CRITICAL' : rec.includes('HIGH') ? 'HIGH' : 'MEDIUM',
        icon: ShieldCheck
    }));

    return (
        <Card variant="glass" className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <span className="mr-2">🤖</span> AI Recommendations
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {formattedRecs.length > 0 ? formattedRecs.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-electric-cyan/30 transition-all group">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-lg bg-slate-gray text-electric-cyan group-hover:bg-electric-cyan group-hover:text-deep-navy transition-colors">
                                <rec.icon size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">{rec.action}</h4>
                                <p className="text-sm text-silver">{rec.reason}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <Badge variant={rec.priority === 'CRITICAL' ? 'danger' : rec.priority === 'HIGH' ? 'warning' : 'info'}>
                                {rec.priority}
                            </Badge>
                            <Button size="sm" variant="outline" className="h-7 text-xs">
                                Apply
                            </Button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-gray-500 py-8">No specific AI recommendations found.</div>
                )}
            </CardContent>
        </Card>
    );
}
