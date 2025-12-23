'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Code, Palette, Shield, Terminal, Film, Users, Sparkles } from 'lucide-react';

const TeamMemberCard = ({ name, role, tags, icon: Icon, delay }: { name: string, role: string, tags: string[], icon: any, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="glass-card p-8 rounded-2xl border border-white/5 hover:border-cyber-cyan/50 transition-all duration-300 group relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-cyber-cyan/10" />

        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-cyber-cyan/50 shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300">
                <Icon size={40} className="text-gray-400 group-hover:text-cyber-cyan transition-colors duration-300" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{name}</h3>
            <p className="text-cyber-cyan font-medium mb-6 uppercase tracking-wider text-sm">{role}</p>

            <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/5 group-hover:border-cyber-cyan/30 transition-all"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

export default function AboutPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-12 py-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center p-3 rounded-full bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20 mb-4"
                    >
                        <Users size={24} className="mr-2" />
                        <span className="font-orbitron tracking-wider font-bold">TEAM CUSTODIAN</span>
                    </motion.div>

                    <h1 className="text-5xl font-bold text-white tracking-tight">
                        Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">Creators</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        The brilliant minds behind Custodia.AI, combining expertise in development, design, and security to build the future of UEBA.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <TeamMemberCard
                        name="Ayaan Qureshi"
                        role="Team Leader"
                        tags={['Python Developer', 'Project Management', 'Architecture']}
                        icon={Shield}
                        delay={0.1}
                    />

                    <TeamMemberCard
                        name="Ovais Shaikh"
                        role="Fullstack DevOps"
                        tags={['UI/UX Designer', 'Frontend', 'Infrastructure', 'DevOps']}
                        icon={Terminal}
                        delay={0.2}
                    />

                    <TeamMemberCard
                        name="Ayush Gadakh"
                        role="Visual Artist"
                        tags={['2D Animator', 'VFX Artist', 'Motion Graphics', 'Design']}
                        icon={Film}
                        delay={0.3}
                    />
                </div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="glass-panel p-10 rounded-3xl mt-16 text-center relaitve overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" />
                    <Sparkles className="w-10 h-10 text-cyber-purple mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        To revolutionize user behavior analytics by combining cutting-edge machine learning with intuitive,
                        beautiful design. We believe security tools shouldn't just be powerful—they should be a joy to use.
                    </p>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
