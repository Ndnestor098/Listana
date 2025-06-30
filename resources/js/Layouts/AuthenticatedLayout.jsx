import BottomNavigation from '@/Components/BottomNavigation';
import SideBar from '@/Components/SideBar';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="lg:pl-64">
                <main className="p-4 pb-20 lg:p-8 lg:pb-8">{children}</main>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNavigation />
        </div>
    );
}
