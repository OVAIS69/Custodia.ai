'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RoleGraph } from '@/components/roles/RoleGraph';
import { RoleCards } from '@/components/roles/RoleCards';
import { RoleExplosionWarning } from '@/components/roles/RoleExplosionWarning';
import { PermissionOverlapMatrix } from '@/components/roles/PermissionOverlapMatrix';
import { Button } from '@/components/ui/Button';
import { Play } from 'lucide-react';

export default function RoleMiningPage() {
    const [roleData, setRoleData] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('http://localhost:8000/api/v1/roles')
            .then(res => res.json())
            .then(data => {
                setRoleData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch roles:", err);
                setIsLoading(false);
            });
    }, []);

    const handleRunDiscovery = () => {
        setIsLoading(true);
        // Simulate re-discovery or call an endpoint if one existed
        setTimeout(() => {
            fetch('http://localhost:8000/api/v1/roles')
                .then(res => res.json())
                .then(data => {
                    setRoleData(data);
                    setIsLoading(false);
                });
        }, 1000);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white">Role Discovery</h1>
                    <p className="text-silver">Uncover hidden access patterns and optimize role definitions</p>
                </div>
                <Button onClick={handleRunDiscovery} disabled={isLoading}>
                    <Play size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Discovering...' : 'Run Discovery'}
                </Button>
            </div>

            <RoleExplosionWarning health={roleData?.role_health} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Graph */}
                <div className="lg:col-span-2 h-[500px]">
                    <RoleGraph />
                </div>

                {/* Right Column: Matrix */}
                <div className="lg:col-span-1 h-[500px]">
                    <PermissionOverlapMatrix />
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold text-white mb-4">Discovered Role Candidates</h2>
                <RoleCards roles={roleData?.roles} />
            </div>
        </DashboardLayout>
    );
}
