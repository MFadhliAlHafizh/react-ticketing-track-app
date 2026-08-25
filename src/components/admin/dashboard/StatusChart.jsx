import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export const StatusChart = ({ statistic }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Buat / update chart tiap kali statistic berubah
  useEffect(() => {
    if (!statistic || !canvasRef.current) return;

    const chartData = [
      statistic.status_distribution?.open,
      statistic.status_distribution?.onprogress,
      statistic.status_distribution?.resolved,
      statistic.status_distribution?.rejected,
    ];

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = chartData;
      chartInstanceRef.current.update();
      return;
    }

    chartInstanceRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["open", "onprogress", "resolved", "rejected"],
        datasets: [
          {
            data: chartData,
            backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
        cutout: "70%",
      },
    });
  }, [statistic]);

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} height="300"></canvas>;
};
