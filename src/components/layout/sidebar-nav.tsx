import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            passHref
          >
            <motion.div
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent-50"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
              {isActive && (
                <motion.div
                  className="ml-auto h-2 w-2 rounded-full bg-foreground"
                  layoutId="activeNavIndicator"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
} 