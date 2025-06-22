import { useState, useEffect, useCallback } from 'react';
import { QueueItem, NotificationItem } from '@/services/Types';

interface UseQueueReturn {
    queueItems: QueueItem[];
    notifications: NotificationItem[];
    loading: boolean;
    error: string | null;

    // Queue management
    addToQueue: (item: Omit<QueueItem, 'id' | 'queuePosition'>) => void;
    removeFromQueue: (id: string) => void;
    updateQueueStatus: (id: string, status: QueueItem['status']) => void;
    moveQueueItem: (id: string, direction: 'up' | 'down') => void;
    reorderQueue: (items: QueueItem[]) => void;

    // Time estimation
    estimateWaitTime: (position: number, averageConsultationTime?: number) => number;
    updateEstimatedCallTime: (id: string, minutes: number) => void;

    // Statistics
    getQueueStats: () => {
        total: number;
        waiting: number;
        inConsultation: number;
        averageWaitTime: number;
        longestWait: number;
    };

    // Notifications
    addNotification: (message: string, type?: NotificationItem['type']) => void;
    clearNotifications: () => void;
    markNotificationRead: (id: string) => void;

    // Real-time updates
    refreshQueue: () => void;
}

const useQueue = (): UseQueueReturn => {
    const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error] = useState<string | null>(null);

    // Initialize with mock data
    useEffect(() => {
        const mockQueue: QueueItem[] = [
            {
                id: 'queue-001',
                appointmentId: 'apt-001',
                patientName: 'Nguyễn Văn A',
                patientPhone: '0123456789',
                doctorId: 'doc-001',
                doctorName: 'BS. Trần Thị B',
                appointmentTime: '09:00',
                checkInTime: '08:45',
                status: 'waiting',
                priority: 'medium',
                type: 'consultation',
                estimatedDuration: 30,
                queuePosition: 1,
                estimatedCallTime: '09:15',
                waitTime: 0 // Added the missing required property
            },
            {
                id: 'queue-002',
                appointmentId: 'apt-002',
                patientName: 'Trần Thị C',
                patientPhone: '0987654321',
                doctorId: 'doc-002',
                doctorName: 'BS. Nguyễn Văn D',
                appointmentTime: '09:30',
                checkInTime: '09:25',
                status: 'in-consultation',
                priority: 'high',
                type: 'follow-up',
                estimatedDuration: 45,
                queuePosition: 2,
                estimatedCallTime: '10:15',
                waitTime: 0 // Added the missing required property
            },
            {
                id: 'queue-003',
                appointmentId: 'apt-003',
                patientName: 'Lê Văn E',
                patientPhone: '0369852147',
                doctorId: 'doc-003',
                doctorName: 'BS. Phạm Thị F',
                appointmentTime: '10:00',
                status: 'scheduled',
                priority: 'low',
                type: 'specialist',
                estimatedDuration: 30,
                queuePosition: 3,
                estimatedCallTime: '10:30',
                waitTime: 0 // Added the missing required property
            },
            {
                id: 'queue-004',
                appointmentId: 'apt-004',
                patientName: 'Hoàng Thị G',
                patientPhone: '0741852963',
                doctorId: 'doc-001',
                doctorName: 'BS. Trần Thị B',
                appointmentTime: '10:30',
                checkInTime: '10:05',
                status: 'waiting',
                priority: 'urgent',
                type: 'emergency',
                estimatedDuration: 60,
                queuePosition: 2,
                estimatedCallTime: '10:45',
                waitTime: 0 // Added the missing required property    
            }
        ];

        setQueueItems(mockQueue);
    }, []);

    const addToQueue = useCallback((item: Omit<QueueItem, 'id' | 'queuePosition'>) => {
        const newItem: QueueItem = {
            ...item,
            id: `queue-${Date.now()}`,
            queuePosition: queueItems.filter(q => q.status === 'waiting' || q.status === 'arrived').length + 1
        };

        setQueueItems(prev => [...prev, newItem]);
        addNotification(`${item.patientName} added to queue`, 'queue_update');
    }, [queueItems]);

    const removeFromQueue = useCallback((id: string) => {
        const item = queueItems.find(q => q.id === id);
        setQueueItems(prev => prev.filter(q => q.id !== id));

        if (item) {
            addNotification(`${item.patientName} đã được xóa khỏi hàng đợi`, 'queue_update');
        }
    }, [queueItems]);

    const updateQueueStatus = useCallback((id: string, status: QueueItem['status']) => {
        setQueueItems(prev => prev.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, status };

                // Update timestamps based on status
                if (status === 'arrived' && !item.checkInTime) {
                    updatedItem.checkInTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                }

                if (status === 'waiting' && !item.queuePosition) {
                    const waitingCount = prev.filter(q => q.status === 'waiting' || q.status === 'arrived').length;
                    updatedItem.queuePosition = waitingCount + 1;
                }

                if (status === 'completed') {
                    updatedItem.checkOutTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                }

                return updatedItem;
            }
            return item;
        }));

        const item = queueItems.find(q => q.id === id);
        if (item) {
            const statusMessages: Record<QueueItem['status'], string> = {
                'arrived': 'đã check-in',
                'waiting': 'đã vào hàng chờ',
                'in-consultation': 'đã bắt đầu khám',
                'completed': 'đã hoàn thành khám',
                'no-show': 'đã được đánh dấu không đến',
                'scheduled': 'đã được lên lịch'
            };

            addNotification(`${item.patientName} ${statusMessages[status]}`, 'queue_update');
        }
    }, [queueItems]);

    const moveQueueItem = useCallback((id: string, direction: 'up' | 'down') => {
        setQueueItems(prev => {
            const items = [...prev];
            const index = items.findIndex(item => item.id === id);

            if (index === -1) return prev;

            const newIndex = direction === 'up' ? index - 1 : index + 1;

            if (newIndex < 0 || newIndex >= items.length) return prev;

            // Swap positions
            [items[index], items[newIndex]] = [items[newIndex], items[index]];

            // Update queue positions for waiting items
            const waitingItems = items.filter(item => item.status === 'waiting' || item.status === 'arrived');
            waitingItems.forEach((item, idx) => {
                item.queuePosition = idx + 1;
            });

            return items;
        });

        const item = queueItems.find(q => q.id === id);
        if (item) {
            addNotification(`Đã di chuyển ${item.patientName} ${direction === 'up' ? 'lên' : 'xuống'} trong hàng đợi`, 'queue_update');
        }
    }, [queueItems]);

    const reorderQueue = useCallback((items: QueueItem[]) => {
        setQueueItems(items);
        addNotification('Đã cập nhật thứ tự hàng đợi', 'queue_update');
    }, []);

    const estimateWaitTime = useCallback((position: number, averageConsultationTime = 30) => {
        return position * averageConsultationTime;
    }, []);

    const updateEstimatedCallTime = useCallback((id: string, minutes: number) => {
        const now = new Date();
        const estimatedTime = new Date(now.getTime() + minutes * 60000);
        const timeString = estimatedTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        setQueueItems(prev => prev.map(item =>
            item.id === id ? { ...item, estimatedCallTime: timeString } : item
        ));

        const item = queueItems.find(q => q.id === id);
        if (item) {
            addNotification(`Đã cập nhật thời gian dự kiến cho ${item.patientName}: ${timeString}`, 'system_alert');
        }
    }, [queueItems]);

    const getQueueStats = useCallback(() => {
        const waiting = queueItems.filter(item => item.status === 'waiting' || item.status === 'arrived');
        const inConsultation = queueItems.filter(item => item.status === 'in-consultation');

        // Calculate average wait time
        const waitTimes = waiting.map(item => {
            if (!item.checkInTime) return 0;
            const now = new Date();
            const checkIn = new Date();
            const [hours, minutes] = item.checkInTime.split(':');
            checkIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            return Math.floor((now.getTime() - checkIn.getTime()) / (1000 * 60));
        });

        const averageWaitTime = waitTimes.length > 0 ?
            Math.round(waitTimes.reduce((sum, time) => sum + time, 0) / waitTimes.length) : 0;

        const longestWait = waitTimes.length > 0 ? Math.max(...waitTimes) : 0;

        return {
            total: queueItems.length,
            waiting: waiting.length,
            inConsultation: inConsultation.length,
            averageWaitTime,
            longestWait
        };
    }, [queueItems]);

    const addNotification = useCallback((message: string, type: NotificationItem['type'] = 'system_alert') => {
        const notification: NotificationItem = {
            id: `notif-${Date.now()}`,
            message,
            type,
            title: message.substring(0, 50), // Create a title from the message
            timestamp: new Date().toISOString(),
            read: false,
            priority: 'medium' // Default priority
        };

        setNotifications(prev => [notification, ...prev.slice(0, 49)]); // Keep last 50 notifications
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const markNotificationRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    }, []);

    const refreshQueue = useCallback(() => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            addNotification('Đã làm mới dữ liệu hàng đợi', 'system_alert');
        }, 1000);
    }, []);

    return {
        queueItems,
        notifications,
        loading,
        error,
        addToQueue,
        removeFromQueue,
        updateQueueStatus,
        moveQueueItem,
        reorderQueue,
        estimateWaitTime,
        updateEstimatedCallTime,
        getQueueStats,
        addNotification,
        clearNotifications,
        markNotificationRead,
        refreshQueue
    };
};

export default useQueue;
