import React from 'react';
import { motion } from 'framer-motion';
import { VibeCard } from '@/components/ui/vibe-card';
import { formatNumber } from '@/lib/utils';
import { animations } from '@/theme/animations';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  color?: 'default' | 'success' | 'warning' | 'danger';
}

export function StatCard({
  title,
  value,
  previousValue,
  icon,
  trend,
  color = 'default',
}: StatCardProps) {
  const percentage = Math.round(((value - previousValue) / previousValue) * 100);
  
  const getTrendColor = () => {
    if (color !== 'default') {
      return color === 'success' 
        ? 'text-green-500' 
        : color === 'warning' 
          ? 'text-amber-500' 
          : 'text-red-500';
    }
    
    return trend === 'up' 
      ? 'text-green-500' 
      : trend === 'down' 
        ? 'text-red-500' 
        : 'text-gray-500';
  };

  const getIconClass = () => {
    return color === 'default' 
      ? 'text-primary'
      : color === 'success'
        ? 'text-green-500'
        : color === 'warning'
          ? 'text-amber-500'
          : 'text-red-500';
  };

  return (
    <motion.div
      initial={animations.scale.initial}
      animate={animations.scale.animate}
      transition={animations.scale.transition}
      className="w-full"
    >
      <VibeCard className="p-6" hover="lift">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="mt-2 text-3xl font-bold text-foreground">{formatNumber(value)}</p>
            <div className="mt-1 flex items-center">
              <motion.span 
                className={cn("flex items-center text-sm", getTrendColor())}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {Math.abs(percentage)}%
              </motion.span>
              <span className="ml-1.5 text-xs text-muted-foreground">vs last period</span>
            </div>
          </div>
          <div className={cn("p-2 rounded-full bg-primary-10", getIconClass())}>
            {icon}
          </div>
        </div>
      </VibeCard>
    </motion.div>
  );
} 