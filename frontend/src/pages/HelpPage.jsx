const faqs = [
  {
    q: 'Làm thế nào để thêm task mới?',
    a: 'Trên Dashboard, nhấn nút "+ Add task" ở góc phải panel To-Do, hoặc gõ trực tiếp vào ô "Add task" và nhấn Enter. Để điền đầy đủ thông tin (mô tả, priority, ngày), dùng nút "Add task" để mở modal.',
  },
  {
    q: 'Làm thế nào để chỉnh sửa task?',
    a: 'Vào trang My Task hoặc Vital Task, chọn một task từ danh sách bên trái để xem chi tiết. Nhấn nút Edit (biểu tượng bút) ở góc dưới phải panel chi tiết để mở modal chỉnh sửa.',
  },
  {
    q: 'Upload ảnh cho task như thế nào?',
    a: 'Khi mở modal Edit Task, phần "Upload Image" ở bên phải cho phép kéo thả ảnh vào hoặc nhấn Browse để chọn file. Ảnh tối đa 5MB. Sau khi nhấn Done, ảnh sẽ được lưu và hiển thị trong panel chi tiết.',
  },
  {
    q: 'Vital Task khác My Task như thế nào?',
    a: 'Vital Task chỉ hiển thị các task chưa hoàn thành — những task cần chú ý ngay. My Task hiển thị tất cả task (cả hoàn thành lẫn chưa hoàn thành).',
  },
  {
    q: 'Task Categories dùng để làm gì?',
    a: 'Trang Task Categories phân loại task theo priority: Extreme, Moderate, Low. Giúp bạn tổng quan nhanh mức độ ưu tiên của các công việc.',
  },
  {
    q: 'Tìm kiếm task như thế nào?',
    a: 'Gõ từ khóa vào thanh search trên Navbar. Kết quả lọc theo tiêu đề và mô tả của task theo thời gian thực.',
  },
  {
    q: 'Làm thế nào để đánh dấu task hoàn thành?',
    a: 'Nhấn vào vòng tròn nhỏ bên trái tên task trong bất kỳ danh sách nào. Task sẽ chuyển sang trạng thái Completed và xuất hiện trong panel Completed Task trên Dashboard.',
  },
  {
    q: 'Thông tin profile lưu ở đâu?',
    a: 'Tên và email hiển thị trong Sidebar được lưu tại localStorage của trình duyệt. Vào trang Settings để thay đổi thông tin này.',
  },
];

const features = [
  { icon: '📋', title: 'Dashboard', desc: 'Tổng quan task pending, completed và status chart theo %.' },
  { icon: '⚡', title: 'Vital Task', desc: 'Danh sách task chưa hoàn thành cần xử lý gấp, kèm panel chi tiết.' },
  { icon: '✅', title: 'My Task', desc: 'Toàn bộ task với panel chi tiết, edit, xóa.' },
  { icon: '🗂️', title: 'Task Categories', desc: 'Phân nhóm task theo mức độ ưu tiên.' },
  { icon: '🔍', title: 'Search', desc: 'Tìm kiếm task theo tên và mô tả ngay trên Navbar.' },
  { icon: '🔔', title: 'Notifications', desc: 'Thông báo task đã quá hạn hoặc đến hạn hôm nay.' },
];

export default function HelpPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto py-6 space-y-6">

        {/* Features overview */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-1">Tính năng của ứng dụng</h2>
          <div className="w-10 h-0.5 bg-[#ff6767] rounded-full mb-5" />
          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div key={f.title} className="flex gap-3 p-3 bg-[#f5f8ff] rounded-xl">
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-1">Câu hỏi thường gặp</h2>
          <div className="w-8 h-0.5 bg-[#ff6767] rounded-full mb-5" />
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-sm text-gray-800 mb-1.5">❓ {item.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-lg text-gray-800 mb-1">Liên hệ & Góp ý</h2>
          <div className="w-8 h-0.5 bg-[#ff6767] rounded-full mb-4" />
          <p className="text-sm text-gray-500 leading-relaxed">
            Nếu bạn gặp lỗi hoặc muốn đề xuất tính năng mới, vui lòng mở issue tại{' '}
            <a
              href="https://github.com/ZITzzzz/TODOLIST_CLAUDEAI"
              target="_blank"
              rel="noreferrer"
              className="text-[#ff6767] font-medium underline hover:text-red-500"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>

      </div>
    </div>
  );
}
