
import { getMyCourseReviews } from './getMyCourseReviews';

type Props = {
  searchParams: {
    userId?: string; // รับ userId จาก query หรือ session ในภายหลัง
  };
};
const MyReviewsPage = async ({ searchParams }: Props) => {
const userId = Number(searchParams.userId);
if (isNaN(userId) || userId <= 0) {
  return <p className="p-4 text-red-500">ไม่พบผู้ใช้</p>;
}


  const review = await getMyCourseReviews(userId);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">รีวิวของฉัน</h1>
      <div className="space-y-4">
        {review.map((review) => (
          <div key={review.id} className="border p-4 rounded-lg bg-white shadow">
            <h2 className="text-lg font-semibold">{review.course.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-yellow-500">คะแนน: {review.rating} ดาว</p>
              <span className="text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyReviewsPage;
