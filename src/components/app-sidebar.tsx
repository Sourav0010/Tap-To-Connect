import {
   ChartColumnBig,
   Home,
   HomeIcon,
   LayoutPanelLeft,
   Search,
   Settings,
   StoreIcon,
} from 'lucide-react';

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const items = [
   {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
   },
   {
      title: 'Shop',
      url: '/dashboard/shop',
      icon: StoreIcon,
   },

   {
      title: 'Appearance',
      url: '/dashboard/appearance',
      icon: LayoutPanelLeft,
   },
   {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: ChartColumnBig,
   },

   {
      title: 'Settings',
      url: '/dashboard/settings',
      icon: Settings,
   },
];

export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Tap To Connect</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                              <Link href={item.url}>
                                 <item.icon />
                                 <span>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter>
            <div>
               <p className='text-center text-gray-400 text-sm'>
                  &copy; 2025 Tap To Connect
               </p>
               <p className='text-center text-gray-400 text-xs'>
                  All rights reserved
               </p>
            </div>
         </SidebarFooter>
      </Sidebar>
   );
}
