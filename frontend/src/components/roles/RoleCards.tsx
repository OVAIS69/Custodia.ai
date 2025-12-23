'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Users, Database, Server, ShieldAlert } from 'lucide-react';

interface RoleCardsProps {
    roles?: any[];
}

export function RoleCards({ roles = [] }: RoleCardsProps) {
    if (!roles || roles.length === 0) {
        return <div className="text-silver">No role candidates discovered yet. Run discovery to find roles.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, idx) => (
                <Card key={role.role_id || idx} variant="glass-hover" className="cursor-pointer group">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-lg bg-electric-cyan/10 text-electric-cyan">
                                <Database size={24} />
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {role.user_count} Users
                            </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors">{role.role_name}</h3>
                        <p className="text-sm text-silver mb-4">{role.department || 'Unknown Dept'}</p>

                        <div className="space-y-2 mb-4">
                            <p className="text-xs text-silver uppercase tracking-wider font-semibold">Common Access</p>
                            <div className="flex flex-wrap gap-2">
                                {/* Handle if top_resources is list or single string */}
                                {Array.isArray(role.top_resources) ? role.top_resources.map((res: string) => (
                                    <span key={res} className="px-2 py-1 rounded bg-white/5 text-xs text-silver border border-white/5">
                                        {res}
                                    </span>
                                )) : role.top_resource ? (
                                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-silver border border-white/5">
                                        {role.top_resource}
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2 border-t border-white/10">
                            <Button size="sm" className="flex-1 bg-electric-cyan/20 text-electric-cyan hover:bg-electric-cyan/30 border-none">
                                Approve
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 border-white/10 text-silver hover:text-white">
                                Ignore
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
