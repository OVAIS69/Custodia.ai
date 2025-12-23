'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ThreatFeed } from '@/components/dashboard/ThreatFeed';
import { AccessHeatmap } from '@/components/dashboard/AccessHeatmap';
import { DepartmentBreakdown } from '@/components/dashboard/DepartmentBreakdown';

export default function Dashboard() {
  const [stats, setStats] = React.useState({
    total_events: 0,
    anomalies: 0,
    active_users: 0,
    system_risk: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      {/* Hero Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Events"
          value={stats.total_events.toLocaleString()}
          trend={0}
          data={[{ value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }, { value: 60 }, { value: 55 }, { value: 70 }]}
          color="#00D9FF"
        />
        <MetricCard
          title="Anomalies"
          value={stats.anomalies.toLocaleString()}
          trend={0}
          data={[{ value: 20 }, { value: 25 }, { value: 15 }, { value: 30 }, { value: 22 }, { value: 18 }, { value: 15 }]}
          color="#FF4757"
        />
        <MetricCard
          title="Active Users"
          value={stats.active_users.toLocaleString()}
          trend={0}
          data={[{ value: 1000 }, { value: 1100 }, { value: 1050 }, { value: 1150 }, { value: 1200 }, { value: 1220 }, { value: 1247 }]}
          color="#00D68F"
        />
        <MetricCard
          title="System Risk"
          value={`${stats.system_risk}/100`}
          trend={0}
          data={[{ value: 25 }, { value: 28 }, { value: 30 }, { value: 32 }, { value: 35 }, { value: 33 }, { value: 34 }]}
          color="#FFB800"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Threat Feed - Takes up 1 column */}
        <div className="lg:col-span-1 h-full">
          <ThreatFeed />
        </div>

        {/* Visualizations - Takes up 2 columns */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          <div className="flex-1">
            <AccessHeatmap />
          </div>
          <div className="flex-1">
            <DepartmentBreakdown />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
