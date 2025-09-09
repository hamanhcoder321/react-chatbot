// src/Admin/ThongKe/DashboardOverview.jsx
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
      series: [30, 25, 35, 55], // dữ liệu cố định
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
                label: "Total Overview",
                formatter: function () {
                  return "$34,098"; // fix cứng giá trị tổng
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
      title: "Customers",
      value: "1,736",
      img: "../assets/images/dashboard/icon/customers.png",
      change: "+3,7%",
      changeClass: "tw-text-green-600",
    },
    {
      title: "Revenue",
      value: "$9,247",
      img: "../assets/images/dashboard/icon/revenue.png",
      change: "-0,10%",
      changeClass: "tw-text-red-600",
    },
    {
      title: "Profit",
      value: "80%",
      img: "../assets/images/dashboard/icon/profit.png",
      change: "+11,6%",
      changeClass: "tw-text-green-600",
    },
  ];

  return (
    <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-6">
      {/* Grid 2 cột */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        {/* Cột trái: StatisticCards */}
        <div className="tw-space-y-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="tw-flex tw-items-center tw-justify-between tw-bg-gray-50 tw-rounded-lg tw-p-4 tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-bg-gray-100 hover:tw-scale-[1.02]"
            >
              {/* Icon + Value */}
              <div className="tw-flex tw-items-center tw-gap-3">
                <img
                  src={item.img}
                  alt={item.title}
                  className="tw-w-10 tw-h-10 tw-transition-transform tw-duration-500 group-hover:tw-animate-bounce"
                />
                <div>
                  <span className="tw-text-sm tw-text-gray-500">
                    {item.title}
                  </span>
                  <h5 className="tw-text-lg tw-font-semibold">{item.value}</h5>
                </div>
              </div>

              {/* Dropdown + Change */}
              <div className="tw-text-right">
                <button className="tw-text-gray-500 hover:tw-text-gray-700">
                  <i className="icon-more-alt" />
                </button>
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
          <div className="tw-bg-white tw-rounded-xl tw-shadow-md tw-p-4 tw-w-[280px]">
            <h2 className="tw-text-base tw-font-semibold tw-mb-2">
              Biểu đồ tròn
            </h2>
            <div id="donut-static" className="tw-h-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
