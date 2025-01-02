import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <SidebarTrigger className='bg-slate-800 text-white h-4 w-4 p-3 m-3' />
         {children}
      </SidebarProvider>
   );
}
