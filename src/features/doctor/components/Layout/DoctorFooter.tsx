const DoctorFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-4">
            <div className="px-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        © 2024 MEDVIET Platform. Dành cho bác sĩ.
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <a href="#" className="hover:text-primary transition-colors">
                            Hỗ trợ kỹ thuật
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Hướng dẫn sử dụng
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Liên hệ IT
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DoctorFooter;