import { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function DashboardOverview() {
  // --- Render PieChart ---
  useEffect(() => {
    const options = {
      chart: {
        type: "donut",
        height: 250,
        toolbar: { show: false },
      },
      series: [30, 25, 35, 55],
      labels: ["Shoes", "Grocery", "Other", "Other"],
      colors: ["#00BFFF", "#FF7F50", "#DA70D6", "#8A2BE2"],
      dataLabels: { enabled: false },
      legend: { show: false },
      plotOptions: {
        pie: {
          donut: {
            size: "85%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "haha",
                formatter: function () {
                  return "$34,098";
                },
              },
            },
          },
        },
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#donut-static"),
      options
    );
    chart.render();
    return () => chart.destroy();
  }, []);

  // --- Data StatisticCards ---
  const stats = [
    {
      title: "Lượng truy cập",
      value: "1,736",
      change: "+3,7%",
      changeClass: "tw-text-green-600",
    },
    {
      title: "Revenue",
      value: "$9,247",
      change: "-0,10%",
      changeClass: "tw-text-red-600",
    },
    {
      title: "Profit",
      value: "80%",
      change: "+11,6%",
      changeClass: "tw-text-green-600",
    },
  ];

  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-w-full">
      {/* Cột trái: StatisticCards */}
      <div className="tw-space-y-4">
        <h2 className="tw-text-lg tw-font-bold tw-mb-2 tw-text-gray-700">
          Biểu đồ thống kê
        </h2>
        {stats.map((item, index) => (
          <div
            key={index}
            className="tw-flex tw-items-center tw-justify-between tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-sm tw-transition-all tw-duration-300 hover:tw-shadow-md hover:tw-scale-[1.01]"
          >
            {/* Value */}
            <div>
              <span className="tw-text-sm tw-text-gray-500">{item.title}</span>
              <h5 className="tw-text-lg tw-font-semibold">{item.value}</h5>
            </div>

            {/* Change */}
            <div className="tw-text-right">
              <div
                className={`tw-text-sm tw-font-semibold ${item.changeClass}`}
              >
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cột phải: PieChart */}
      <div className="tw-flex tw-justify-center">
        <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6 tw-w-full tw-transition-all tw-duration-300 hover:tw-shadow-md hover:tw-scale-[1.01]">
          <h2 className="tw-text-lg tw-font-bold tw-mb-4 tw-text-gray-700">
            Biểu đồ tròn
          </h2>
          <div id="donut-static" className="tw-h-[220px]" />
        </div>
      </div>
    </div>
  );
}
