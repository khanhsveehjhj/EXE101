import { useState, useEffect } from 'react';
import {
    ClockIcon,
    UserIcon,
    PhoneIcon,
    ExclamationTriangleIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';
import { QueueItem } from '@/services/Types';
import Button from '@/components/UI/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface RealTimeQueueProps {
    queueItems: QueueItem[];
    onUpdateStatus: (id: string, status: QueueItem['status']) => void;
    onMoveUp: (id: string) => void;
    onMoveDown: (id: string) => void;
    onEstimateTime: (id: string, minutes: number) => void;
    showActions?: boolean;
}

const RealTimeQueue: React.FC<RealTimeQueueProps> = ({
    queueItems,
    onUpdateStatus,
    onMoveUp,
    onMoveDown,
    showActions = true
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const isDesktop = useMediaQuery('(min-width: 768px)');
    // DEBUG: Hiển thị trạng thái responsive
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getStatusColor = (status: QueueItem['status']) => {
        switch (status) {
            case 'scheduled': return 'bg-gray-100 text-gray-800';
            case 'arrived': return 'bg-blue-100 text-blue-800';
            case 'waiting': return 'bg-yellow-100 text-yellow-800';
            case 'in-consultation': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-purple-100 text-purple-800';
            case 'no-show': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: QueueItem['status']) => {
        switch (status) {
            case 'scheduled': return 'Đã lên lịch';
            case 'arrived': return 'Đã đến';
            case 'waiting': return 'Đang chờ';
            case 'in-consultation': return 'Đang khám';
            case 'completed': return 'Hoàn thành';
            case 'no-show': return 'Không đến';
            default: return status;
        }
    };

    const getPriorityColor = (priority: QueueItem['priority']) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const calculateWaitTime = (checkInTime?: string) => {
        if (!checkInTime) return 0;

        const checkIn = new Date();
        const [hours, minutes] = checkInTime.split(':');
        checkIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return Math.floor((currentTime.getTime() - checkIn.getTime()) / (1000 * 60));
    };

    const formatEstimatedCallTime = (estimatedCallTime?: string) => {
        if (!estimatedCallTime) return 'Chưa xác định';
        return `Dự kiến: ${estimatedCallTime}`;
    };

    // Sort queue items by priority and position
    const sortedQueue = [...queueItems].sort((a, b) => {
        // First by status priority
        const statusPriority = {
            'in-consultation': 0,
            'waiting': 1,
            'arrived': 2,
            'scheduled': 3,
            'completed': 4,
            'no-show': 5
        };

        const statusDiff = statusPriority[a.status] - statusPriority[b.status];
        if (statusDiff !== 0) return statusDiff;

        // Then by queue position
        if (a.queuePosition && b.queuePosition) {
            return a.queuePosition - b.queuePosition;
        }

        // Finally by priority
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <>
            {/* DEBUG responsive info */}
            <div className="fixed top-0 left-0 z-50 bg-yellow-200 text-xs px-2 py-1">isDesktop: {String(isDesktop)} | width: {windowWidth}</div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Hàng đợi thời gian thực</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Cập nhật lúc: {currentTime.toLocaleTimeString('vi-VN')}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-600">
                                Tổng: {queueItems.length} |
                                Chờ: {queueItems.filter(q => q.status === 'waiting' || q.status === 'arrived').length} |
                                Đang khám: {queueItems.filter(q => q.status === 'in-consultation').length}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {sortedQueue.map((item, index) => {
                        const waitTime = calculateWaitTime(item.checkInTime);
                        const isOverdue = waitTime > 30;

                        return (
                            <div key={item.id} className={`p-2 md:p-4 hover:bg-gray-50 ${isOverdue ? 'bg-red-50' : ''}`}>
                                <div className="flex items-center justify-between gap-1 md:gap-4">
                                    {/* Patient Info + Priority */}
                                    <div className="flex items-center space-x-2 md:space-x-4">
                                        {/* Priority & Position Indicator */}
                                        <div className="flex flex-col items-center space-y-0.5 md:space-y-1">
                                            <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${getPriorityColor(item.priority)}`}></div>
                                            {item.queuePosition && (
                                                <span className="text-[10px] md:text-xs font-medium text-gray-600">#{item.queuePosition}</span>
                                            )}
                                        </div>
                                        {/* Patient Info */}
                                        <div className="flex items-center space-x-2 md:space-x-3">
                                            <div className="w-7 h-7 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium text-xs md:text-sm">
                                                    {item.patientName.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-1 md:space-x-2">
                                                    <h3 className="font-medium text-gray-900 text-xs md:text-base">{item.patientName}</h3>
                                                    {isOverdue && (
                                                        <ExclamationTriangleIcon className="w-3 h-3 md:w-4 md:h-4 text-red-500" title="Chờ quá lâu" />
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-1 md:space-x-3 text-[11px] md:text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <PhoneIcon className="w-3 h-3 mr-0.5 md:mr-1" />
                                                        {item.patientPhone}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <ClockIcon className="w-3 h-3 mr-0.5 md:mr-1" />
                                                        {item.appointmentTime}
                                                    </span>
                                                    <span>{item.doctorName}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 md:space-x-3 text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                                                    <span>{item.type}</span>
                                                    <span>{item.estimatedDuration} phút</span>
                                                    {item.checkInTime && (
                                                        <span>Check-in: {item.checkInTime}</span>
                                                    )}
                                                    {waitTime > 0 && (
                                                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`}>Chờ: {waitTime} phút</span>
                                                    )}
                                                    <span className="text-blue-600">
                                                        {formatEstimatedCallTime(item.estimatedCallTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Status + Actions */}
                                    <div className="flex items-center space-x-1 md:space-x-3">
                                        {/* Status */}
                                        <span className={`inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium ${getStatusColor(item.status)}`}>
                                            {getStatusLabel(item.status)}
                                        </span>
                                        {/* Actions (nút) */}
                                        {showActions && (
                                            <div className="flex space-x-2">
                                                {/* Queue Management chỉ hiện trên desktop */}
                                                {isDesktop && (
                                                    <div className="flex">
                                                        {(item.status === 'waiting' || item.status === 'arrived') && (
                                                            <>
                                                                <button
                                                                    onClick={() => onMoveUp(item.id)}
                                                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                                    title="Di chuyển lên"
                                                                    disabled={index === 0}
                                                                >
                                                                    <ArrowUpIcon className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => onMoveDown(item.id)}
                                                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                                    title="Di chuyển xuống"
                                                                    disabled={index === sortedQueue.length - 1}
                                                                >
                                                                    <ArrowDownIcon className="w-4 h-4" />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                                {/* Status Actions: chỉ hiện dropdown trên mobile, chỉ hiện nút trên desktop */}
                                                {!isDesktop && (
                                                    <MobileActionDropdown
                                                        item={item}
                                                        onUpdateStatus={onUpdateStatus}
                                                    />
                                                )}
                                                {isDesktop && (
                                                    <div className="flex space-x-2">
                                                        {item.status === 'waiting' && (
                                                            <Button className="bg-blue-600 text-white text-base px-4 py-2 rounded-xl shadow font-medium min-w-[120px] whitespace-nowrap">
                                                                Bắt đầu khám
                                                            </Button>
                                                        )}
                                                        {item.status === 'waiting' && (
                                                            <Button className="bg-red-600 text-white text-base px-4 py-2 rounded-xl shadow font-medium min-w-[120px] whitespace-nowrap">
                                                                Không đến
                                                            </Button>
                                                        )}
                                                        {item.status === 'arrived' && (
                                                            <Button className="bg-blue-600 text-white text-base px-4 py-2 rounded-xl shadow font-medium min-w-[120px] whitespace-nowrap">
                                                                Check-in
                                                            </Button>
                                                        )}
                                                        {item.status === 'arrived' && (
                                                            <Button className="bg-red-600 text-white text-base px-4 py-2 rounded-xl shadow font-medium min-w-[120px] whitespace-nowrap">
                                                                Không đến
                                                            </Button>
                                                        )}
                                                        {item.status === 'in-consultation' && (
                                                            <Button className="bg-purple-600 text-white text-base px-4 py-2 rounded-xl shadow font-medium min-w-[120px] whitespace-nowrap">
                                                                Check-out
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {queueItems.length === 0 && (
                    <div className="p-12 text-center">
                        <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Hàng đợi trống</h3>
                        <p className="text-gray-600">Hiện tại không có bệnh nhân nào trong hàng đợi.</p>
                    </div>
                )}
            </div>
        </>
    );
};

interface MobileActionDropdownProps {
    item: QueueItem;
    onUpdateStatus: (id: string, status: QueueItem['status']) => void;
}

const MobileActionDropdown = ({ item, onUpdateStatus }: MobileActionDropdownProps) => {
    const [open, setOpen] = useState(false);
    const actions = [];
    if (item.status === 'waiting') {
        actions.push({ label: 'Bắt đầu khám', color: 'bg-blue-600', onClick: () => onUpdateStatus(item.id, 'in-consultation') });
        actions.push({ label: 'Không đến', color: 'bg-red-600', onClick: () => onUpdateStatus(item.id, 'no-show') });
    }
    if (item.status === 'arrived') {
        actions.push({ label: 'Check-in', color: 'bg-blue-600', onClick: () => onUpdateStatus(item.id, 'waiting') });
        actions.push({ label: 'Không đến', color: 'bg-red-600', onClick: () => onUpdateStatus(item.id, 'no-show') });
    }
    if (item.status === 'in-consultation') {
        actions.push({ label: 'Check-out', color: 'bg-purple-600', onClick: () => onUpdateStatus(item.id, 'completed') });
    }
    return (
        <div className="relative">
            <button
                className="bg-gray-100 text-gray-700 text-[10px] px-2 py-1 rounded border border-gray-300"
                onClick={() => setOpen(o => !o)}
            >
                Thao tác
            </button>
            {open && (
                <div className="absolute z-10 left-0 mt-1 w-28 bg-white border border-gray-200 rounded shadow-lg flex flex-col">
                    {actions.map((action, idx) => (
                        <button
                            key={idx}
                            className={`text-[10px] px-2 py-1 text-left ${action.color} text-white rounded m-1`}
                            onClick={() => { action.onClick(); setOpen(false); }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RealTimeQueue;
