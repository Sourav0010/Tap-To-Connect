import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from './storeProvider';
import { Hydrator } from './Hydrator';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
	title: 'Tap To Connect',
	description:
		'An interactive application to connect with people in the meta-verse',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<AuthProvider>
				<StoreProvider>
					<body>
						<Hydrator />
						<NavBar />
						{children}
						<SpeedInsights />
						<Analytics />
						<Toaster />
					</body>
				</StoreProvider>
			</AuthProvider>
		</html>
	);
}
