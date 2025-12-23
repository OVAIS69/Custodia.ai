'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface RoleExplosionWarningProps {
    health?: {
        is_role_explosion: boolean;
        small_roles_count: number;
        total_roles: number;
    } | null;
}

export function RoleExplosionWarning({ health }: RoleExplosionWarningProps) {
    if (!health || !health.is_role_explosion) return null;

    return (
        <div className="bg-amber-gold/10 border border-amber-gold/20 rounded-lg p-4 flex items-start justify-between animate-in slide-in-from-top-2 mb-6">
            <div className="flex items-start space-x-3">
                <AlertTriangle className="text-amber-gold mt-0.5" size={20} />
                <div>
                    <h4 className="font-bold text-white text-sm">Role Explosion Detected</h4>
                    <p className="text-sm text-silver mt-1">
                        We've detected {health.small_roles_count} fragmented roles out of {health.total_roles} total roles. This indicates permission fragmentation.
                        <button className="text-electric-cyan hover:underline ml-2">Review Analysis</button>
                    </p>
                </div>
            </div>
            <button className="text-silver hover:text-white">
                <X size={16} />
            </button>
        </div>
    );
}
