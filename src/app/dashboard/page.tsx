'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/sidebar';
import { StatCard } from '@/components/features/stat-card';
import { VibeCard } from '@/components/ui/vibe-card';
import { VibeButton } from '@/components/ui/vibe-button';
import { animations } from '@/theme/animations';

// Iconos de ejemplo
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RevenueIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20h20" />
    <path d="M5.5 20C4.952 20 4.5 19.548 4.5 19V8.992h-3l6.5-7 6.5 7h-3V19a1 1 0 0 1-1 1h-9Z" />
    <path d="M4.5 8.992h-3l6.5-7 6.5 7h-3" />
    <path d="M16 20h2a2 2 0 0 0 2-2V8.992h3l-7-7" />
  </svg>
);

const SessionsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 5H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4" />
    <path d="M18 1h4v4" />
    <path d="M10 9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8Z" />
    <path d="m22 5-8.97 8.97" />
    <path d="M14 9h4v4" />
  </svg>
);

export default function DashboardPage() {
  // Datos ficticios del usuario
  const user = {
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
  };

  // Datos ficticios para las estadísticas
  const stats = [
    {
      title: 'Usuarios Activos',
      value: 2540,
      previousValue: 2100,
      icon: <UsersIcon />,
      trend: 'up' as const,
    },
    {
      title: 'Ingresos Mensuales',
      value: 8745,
      previousValue: 7500,
      icon: <RevenueIcon />,
      trend: 'up' as const,
    },
    {
      title: 'Sesiones Totales',
      value: 12350,
      previousValue: 13000,
      icon: <SessionsIcon />,
      trend: 'down' as const,
    },
  ];

  // Actividades recientes (datos ficticios)
  const activities = [
    { id: 1, user: 'Carlos Pérez', action: 'inició sesión', time: 'hace 5 minutos' },
    { id: 2, user: 'María López', action: 'actualizó su perfil', time: 'hace 1 hora' },
    { id: 3, user: 'Juan García', action: 'completó una tarea', time: 'hace 3 horas' },
    { id: 4, user: 'Laura Martínez', action: 'creó un nuevo proyecto', time: 'hace 1 día' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      
      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <VibeButton variant="default">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Proyecto
          </VibeButton>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              previousValue={stat.previousValue}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <motion.div
            initial={animations.slideUp.initial}
            animate={animations.slideUp.animate}
            transition={{ delay: 0.1, ...animations.slideUp.transition }}
          >
            <VibeCard className="h-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {activity.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </VibeCard>
          </motion.div>

          <motion.div
            initial={animations.slideUp.initial}
            animate={animations.slideUp.animate}
            transition={{ delay: 0.2, ...animations.slideUp.transition }}
          >
            <VibeCard className="h-full">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Rendimiento General</h2>
                <div className="space-y-4">
                  {['Crecimiento de usuarios', 'Retención', 'Engagement'].map((metric, i) => (
                    <div key={metric} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric}</span>
                        <span className="text-sm font-bold">
                          {['+22%', '+15%', '+8%'][i]}
                        </span>
                      </div>
                      <div className="h-2 bg-accent/10 rounded-full w-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: ['65%', '45%', '30%'][i] }}
                          transition={{ delay: 0.5, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </VibeCard>
          </motion.div>
        </div>

        <motion.div
          initial={animations.slideUp.initial}
          animate={animations.slideUp.animate}
          transition={{ delay: 0.3, ...animations.slideUp.transition }}
        >
          <VibeCard className="p-6">
            <h2 className="text-xl font-semibold mb-4">Objetivos del Mes</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Nuevos Usuarios', target: '1,500', current: '950', percentage: 63 },
                { title: 'Ingresos', target: '$12,000', current: '$8,200', percentage: 68 },
                { title: 'Retención', target: '85%', current: '78%', percentage: 92 },
              ].map((goal) => (
                <div key={goal.title} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{goal.title}</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target}
                    </span>
                    <span className="text-sm font-medium">{goal.percentage}%</span>
                  </div>
                  <div className="h-2 bg-primary/10 rounded-full w-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.percentage}%` }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </VibeCard>
        </motion.div>
      </main>
    </div>
  );
} 