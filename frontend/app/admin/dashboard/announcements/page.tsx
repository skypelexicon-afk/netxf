"use client"
import { useDashboardStore } from '@/store/useAdminDataStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore';

export default function AnnouncementPage() {
    const { enrollmentData, dashboardData, error, fetchDashboardData } = useDashboardStore();
    const { user, isAuthenticated, isLoading } = useAuthStore();
    const router = useRouter();

    // Auth guard
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/');
            } else if (user?.role !== 'super_admin') {
                router.push('/');
            }
        }
    }, [isLoading, isAuthenticated, user, router]);



      // Fetch dashboard data
    useEffect(() => {
        if (isAuthenticated && user?.role === 'super_admin' && !enrollmentData && !dashboardData) {
            try {
                fetchDashboardData();
            } catch {
                console.log(error);
            }
        }
    }, [enrollmentData, dashboardData, fetchDashboardData, isAuthenticated, user]);

    useEffect(() => {
        console.log("Enrollment data: ", enrollmentData);
    }, [enrollmentData]);

    if (isLoading) {
        return <div className="p-6 text-center">Checking authentication...</div>;
    }

    if (!isAuthenticated || user?.role !== 'super_admin') {
        return <div className="p-6 text-center">Unauthorized</div>;
    }

    return (
        // render all courses here and use a dropdown to add announcement to a particular course
        <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
            <table className="border-separate border-spacing-0 rounded-lg overflow-hidden shadow-lg h-fit">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="p-2 text-left">Course Name</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollmentData?.enrollments.map(course => (
                        <tr key={course.course_id} className="hover:bg-gray-100">
                            <td className="p-2 border-b">{course.course_title}</td>
                            <td className="p-2 border-b">
                                <button className="text-blue-500 hover:underline text-sm" onClick={() => {
                                    router.push(`/admin/dashboard/announcements/${course.course_id}`); // Use next/navigation's
                                }}>
                                    View / Add Announcements
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
