type PrayerItem = {
  title: string;
  time: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

export default function PrayerScheduleCard({ prayer }: { prayer: PrayerItem }) {
  const Icon = prayer.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div
        className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${prayer.color} rounded-full flex items-center justify-center shadow-lg`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{prayer.title}</h3>
      <p className="text-center text-lg font-semibold text-blue-600 mb-3">{prayer.time}</p>
      <p className="text-gray-600 text-center text-sm">{prayer.description}</p>
    </div>
  );
}